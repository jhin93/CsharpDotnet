import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Project } from 'aws-cdk-lib/aws-codebuild';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Existing VPC ID
    const vpc = Vpc.fromLookup(this, 'ExistingVpc', {
      vpcId: 'vpc-068d821394d4a13d9', // SP-01
    });

    // Existing ECS Cluster
    const ecsCluster = Cluster.fromClusterAttributes(this, 'ImportedCluster', {
      clusterName: 'SP-01-ECS',
      vpc: vpc, // Use the existing VPC
    });
    // Importing an existing S3 bucket
    const s3Bucket = Bucket.fromBucketAttributes(this, 'ImportedBucket', {
      bucketName: 'sp01-logjack',
    });
    // CodePipeline - CodeBuild integration
    const codeBuildProject = Project.fromProjectName(this, 'ImportedBuildProject', 'SP-01');
    // CodePipline - CodePipeline integration
    const codePipeline = Pipeline.fromPipelineArn(
        this,
        'ImportedPipeline',
        'arn:aws:codepipeline:ap-southeast-2:221196769151:SP-01'
    );
    
  };
};