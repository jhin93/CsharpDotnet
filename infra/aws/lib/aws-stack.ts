import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Existing VPC ID
    const vpc = Vpc.fromLookup(this, 'ExistingVpc', {
      vpcId: 'vpc-0033224febff18d42', // SP-01
    });

    // Create an ECS Cluster in the existing VPC
    const cluster = new Cluster(this, 'MainCluster', {
      vpc: vpc,
      clusterName: 'SP-01-Cluster',
    });
  }
}