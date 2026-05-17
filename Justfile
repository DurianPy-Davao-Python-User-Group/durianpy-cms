set dotenv-load

aws-profile := "default"
environment := "development"
aws-region  := "ap-southeast-1"
GIT_SHA     := `git rev-parse HEAD`

default:
    @just --list

check-session:
    @aws sts get-caller-identity --profile {{aws-profile}} > /dev/null || (echo "❌ SSO session expired or invalid. Run: aws sso login --profile {{aws-profile}}"; exit 1)

build-lambda-image-ecr: check-session
    @echo "🔑 Fetching secrets and layer URL..."
    @SECRETS_JSON=$(aws secretsmanager get-secret-value --secret-id arn:aws:secretsmanager:ap-southeast-1:193672753403:secret:durianpy-cms-app-secrets-prod-bPi7wt --query SecretString --output text --profile {{aws-profile}} --region {{aws-region}}); \
    export PAYLOAD_SECRET=$(echo $SECRETS_JSON | jq -r .PAYLOAD_SECRET); \
    export DATABASE_URL=$(echo $SECRETS_JSON | jq -r .DATABASE_URL); \
    export CLOUDFRONT_DISTRIBUTION_DOMAIN=$(echo $SECRETS_JSON | jq -r .CLOUDFRONT_DISTRIBUTION_DOMAIN); \
    export S3_BUCKET=$(echo $SECRETS_JSON | jq -r .S3_BUCKET); \
    export NEXT_PUBLIC_SERVER_URL=$(echo $SECRETS_JSON | jq -r .NEXT_PUBLIC_SERVER_URL); \
    export LAYER_URL=$(aws lambda get-layer-version-by-arn --arn arn:aws:lambda:ap-southeast-1:044395824272:layer:AWS-Parameters-and-Secrets-Lambda-Extension:61 --query 'Content.Location' --output text --profile {{aws-profile}} --region {{aws-region}}); \
    echo "🏗️ Building Docker image (Production Mode)..."; \
    docker build \
        --provenance=false \
        --sbom=false \
        --secret id=payload_secret,env=PAYLOAD_SECRET \
        --secret id=database_url,env=DATABASE_URL \
        --secret id=cloudfront_domain,env=CLOUDFRONT_DISTRIBUTION_DOMAIN \
        --secret id=s3_bucket,env=S3_BUCKET \
        --secret id=next_public_server_url,env=NEXT_PUBLIC_SERVER_URL \
        --build-arg LAYER_URL=$LAYER_URL \
        --build-arg AWS_DEFAULT_REGION={{aws-region}} \
        --build-arg ENVIRONMENT=production \
        -t durianpy-cms-prod:latest -f docker/lambda/Dockerfile . ; \
    echo "📦 Extracting & Syncing static assets from built image..."; \
    docker create --name temp-cms durianpy-cms-prod:latest; \
    mkdir -p ./.next/static ./public; \
    docker cp temp-cms:/app/.next/static/. ./.next/static; \
    docker cp temp-cms:/app/public/. ./public; \
    docker rm temp-cms; \
    aws s3 sync .next/static s3://$S3_BUCKET/_next/static --delete --region {{aws-region}} --profile {{aws-profile}}; \
    aws s3 sync public s3://$S3_BUCKET/public --delete --region {{aws-region}} --profile {{aws-profile}}; \
    echo "🔐 Pushing to ECR..."; \
    REPO_URI=$(aws ecr describe-repositories --region {{aws-region}} --profile {{aws-profile}} --query "repositories[?repositoryName=='durianpy-cms-prod'].repositoryUri" --output text); \
    aws ecr get-login-password --region {{aws-region}} --profile {{aws-profile}} | docker login --username AWS --password-stdin $REPO_URI; \
    docker tag durianpy-cms-prod:latest $REPO_URI:{{GIT_SHA}}; \
    docker push $REPO_URI:{{GIT_SHA}}; \
    echo "✅ Success! Assets in S3 and Image in ECR ({{GIT_SHA}})"

get-secrets: check-session
    @echo "🔑 Fetching secrets..."
    @aws ssm get-parameters-by-path --path /durianpy/cms/prod/ --with-decryption --region {{aws-region}} --profile {{aws-profile}} --query "Parameters[].[Name, Value]" --output text | sed 's/\/durianpy\/cms\/prod\///g' | tr '\t' '=' > .env
    echo "✅ Secrets saved to .env file"

up-dev:
  docker compose -f compose.dev.yml up --watch


