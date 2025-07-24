#!/bin/bash
# infra/scripts/deploy.sh
# Manual deployment script

set -e

# Environment variables
AWS_REGION="ap-southeast-2"
AWS_ACCOUNT_ID="YOUR_ACCOUNT_ID"  # Replace with your actual account ID
CLUSTER_NAME="sp-01-cluster"

# ECR repository URIs
BACKEND_ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sp-01-backend"
PROCESSOR_ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sp-01-processor"
FRONTEND_ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sp-01-frontend"

# Image tag (git commit hash or latest)
IMAGE_TAG="latest"

echo "Logging in to AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Building Docker images..."
docker-compose build --no-cache

echo "Tagging images..."
docker tag sp-01-backend:latest $BACKEND_ECR_REPO_URI:$IMAGE_TAG
docker tag sp-01-processor:latest $PROCESSOR_ECR_REPO_URI:$IMAGE_TAG
docker tag sp-01-frontend:latest $FRONTEND_ECR_REPO_URI:$IMAGE_TAG

echo "Pushing images to ECR..."
docker push $BACKEND_ECR_REPO_URI:$IMAGE_TAG
docker push $PROCESSOR_ECR_REPO_URI:$IMAGE_TAG
docker push $FRONTEND_ECR_REPO_URI:$IMAGE_TAG

echo "Updating ECS services..."
aws ecs update-service --cluster $CLUSTER_NAME --service sp-01-backend-service --force-new-deployment
aws ecs update-service --cluster $CLUSTER_NAME --service sp-01-processor-service --force-new-deployment
aws ecs update-service --cluster $CLUSTER_NAME --service sp-01-frontend-service --force-new-deployment

echo "Deployment completed!"