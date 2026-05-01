# Step 1: Lambda Layer Builder
FROM alpine AS layer-builder
RUN apk add --no-cache curl unzip aws-cli

RUN --mount=type=secret,id=AWS_ACCESS_KEY_ID \
    --mount=type=secret,id=AWS_SECRET_ACCESS_KEY \
    --mount=type=secret,id=AWS_SESSION_TOKEN \
    export AWS_ACCESS_KEY_ID=$(cat /run/secrets/AWS_ACCESS_KEY_ID) && \
    export AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/AWS_SECRET_ACCESS_KEY) && \
    export AWS_SESSION_TOKEN=$(cat /run/secrets/AWS_SESSION_TOKEN) && \
    export AWS_DEFAULT_REGION=ap-southeast-1 && \
    curl $(aws lambda get-layer-version-by-arn \
    --arn arn:aws:lambda:ap-southeast-1:044395824272:layer:AWS-Parameters-and-Secrets-Lambda-Extension:61 \
    --query 'Content.Location' --output text) \
    --output layer.zip && \
    unzip layer.zip -d /opt-layer && \
    rm layer.zip

# Step 2: Base Image
FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS base
RUN apk add --no-cache libc6-compat

# Step 3: Install dependencies and build the application
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN --mount=type=secret,id=payload_secret \
    --mount=type=secret,id=database_url \
    PAYLOAD_SECRET=$(cat /run/secrets/payload_secret) \
    DATABASE_URL=$(cat /run/secrets/database_url) \
    npm run build

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
