# Step 1: Lambda Layer Builder
FROM alpine AS layer-builder
RUN apk add --no-cache curl unzip

ARG LAYER_URL
RUN if [ -z "$LAYER_URL" ]; then echo "LAYER_URL build-arg is required" && exit 1; fi && \
    curl "$LAYER_URL" --output layer.zip && \
    unzip layer.zip -d /opt-layer && \
    rm layer.zip

# Step 2: Base Image
FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS base
RUN apk add --no-cache libc6-compat python3 make g++

# Step 3: Install dependencies and build the application
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json .npmrc* ./
RUN npm install --legacy-peer-deps --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV ENVIRONMENT=production

RUN --mount=type=secret,id=payload_secret \
    --mount=type=secret,id=database_url \
    --mount=type=secret,id=cloudfront_domain \
    --mount=type=secret,id=s3_bucket \
    --mount=type=secret,id=next_public_server_url \
    export PAYLOAD_SECRET=$(cat /run/secrets/payload_secret) && \
    export DATABASE_URL=$(cat /run/secrets/database_url) && \
    export CLOUDFRONT_DISTRIBUTION_DOMAIN=$(cat /run/secrets/cloudfront_domain) && \
    export S3_BUCKET=$(cat /run/secrets/s3_bucket) && \
    export NEXT_PUBLIC_SERVER_URL=$(cat /run/secrets/next_public_server_url) && \
    NEXT_PUBLIC_SERVER_URL="" npm run generate:importmap && npm run build

# Step 4: Final image for Lambda
FROM base AS runner
WORKDIR /app

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.0.0-x86_64 /lambda-adapter /opt/extensions/lambda-adapter

COPY --from=layer-builder /opt-layer/extensions /opt/extensions
RUN chmod +x /opt/extensions/*

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
ENV AWS_LAMBDA_WEB_ADAPTER_PORT=3000
ENV PARAMETERS_SECRETS_EXTENSION_HTTP_PORT=2773
ENV SECRETS_MANAGER_TTL=300
ENV NEXT_CACHE_HANDLER_PATH="/app/cache-handler.mjs"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY docker/lambda/entrypoint.mjs .
COPY docker/lambda/cache-handler.mjs .
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

CMD ["node", "entrypoint.mjs"]
