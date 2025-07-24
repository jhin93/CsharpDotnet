// infra/aws/lib/pipeline-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Existing ECR Repositories
    const backendRepo = ecr.Repository.fromRepositoryName(this, 'BackendRepo', 'sp-01-backend');
    const processorRepo = ecr.Repository.fromRepositoryName(this, 'ProcessorRepo', 'sp-01-processor');
    const frontendRepo = ecr.Repository.fromRepositoryName(this, 'FrontendRepo', 'sp-01-frontend');

    // Source Repository
    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.CodeStarConnectionsSourceAction({
      actionName: 'GitHub',
      owner: 'jhin93', // GitHub account owner
      repo: 'SP-01',   // Repository name
      branch: 'master',  // Branch name
      output: sourceOutput,
      connectionArn: 'arn:aws:codestar-connections:ap-southeast-2:221196769151:connection/your-actual-connection-id'
    });

    // Build Step
    const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
      environment: {
        privileged: true, // Docker builds require privileged mode
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
      environmentVariables: {
        BACKEND_ECR_REPO_URI: { value: backendRepo.repositoryUri },
        PROCESSOR_ECR_REPO_URI: { value: processorRepo.repositoryUri },
        FRONTEND_ECR_REPO_URI: { value: frontendRepo.repositoryUri },
        AWS_ACCOUNT_ID: { value: this.account },
        AWS_REGION: { value: this.region }
      }
    });

    // ECR authentication and permissions
    backendRepo.grantPullPush(buildProject.grantPrincipal);
    processorRepo.grantPullPush(buildProject.grantPrincipal);
    frontendRepo.grantPullPush(buildProject.grantPrincipal);

    // Build Project Permissions
    buildProject.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'ecr:GetAuthorizationToken',
        'ecr:BatchCheckLayerAvailability',
        'ecr:GetDownloadUrlForLayer',
        'ecr:BatchGetImage'
      ],
      resources: ['*']
    }));

    const buildOutput = new codepipeline.Artifact();
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'BuildAndPush',
      project: buildProject,
      input: sourceOutput,
      outputs: [buildOutput]
    });

    // Deployment Step
    const deployProject = new codebuild.PipelineProject(this, 'DeployProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0
      },
      environmentVariables: {
        CLUSTER_NAME: { value: 'sp-01-cluster' },
        BACKEND_SERVICE: { value: 'sp-01-backend-service' },
        PROCESSOR_SERVICE: { value: 'sp-01-processor-service' },
        FRONTEND_SERVICE: { value: 'sp-01-frontend-service' }
      }
    });

    // ECS Deployment Permissions
    deployProject.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'ecs:UpdateService',
        'ecs:DescribeServices',
        'ecs:DescribeTaskDefinition',
        'ecs:RegisterTaskDefinition',
        'iam:PassRole'
      ],
      resources: ['*']
    }));

    const deployAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'Deploy',
      project: deployProject,
      input: buildOutput
    });

    // Create Pipeline (only once during CDK deployment)
    new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'SP-01-Pipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction]
        },
        {
          stageName: 'Build',
          actions: [buildAction]
        },
        {
          stageName: 'Deploy',
          actions: [deployAction]
        }
      ]
    });
  }
}