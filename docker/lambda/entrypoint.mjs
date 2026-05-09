import { spawn } from 'child_process'

async function fetchSecrets() {
  const SECRET_NAME = process.env.SECRET_NAME || 'durianpy-cms-app-secrets-prod'

  const PORT = process.env.PARAMETERS_SECRETS_EXTENSION_HTTP_PORT || '2773'
  const SESSION_TOKEN = process.env.AWS_SESSION_TOKEN

  const URL = `http://localhost:${PORT}/secretsmanager/get?secretId=${encodeURIComponent(SECRET_NAME)}`

  const headers = {
    'X-Aws-Parameters-Secrets-Token': SESSION_TOKEN,
  }

  const maxRetries = 5
  let lastError

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(URL, { headers })

      if (!response.ok) {
        throw new Error(`Failed to fetch secrets: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const secrets = JSON.parse(data.SecretString)

      process.env.NEXT_PUBLIC_SERVER_URL = secrets.NEXT_PUBLIC_SERVER_URL
      process.env.DATABASE_URL = secrets.DATABASE_URL
      process.env.PAYLOAD_SECRET = secrets.PAYLOAD_SECRET
      process.env.SMTP_HOST = secrets.SMTP_HOST
      process.env.SMTP_USER = secrets.SMTP_USER
      process.env.SMTP_PASS = secrets.SMTP_PASS
      process.env.SMTP_FROM_ADDRESS = secrets.SMTP_FROM_ADDRESS
      process.env.S3_BUCKET = secrets.S3_BUCKET
      process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN = secrets.CLOUDFRONT_DISTRIBUTION_DOMAIN

      console.log('Secrets successfully injected into environment.')
      return
    } catch (error) {
      lastError = error
      console.warn(`Attempt ${i + 1} to fetch secrets failed: ${error.message}. Retrying...`)
      // Exponential backoff: 100ms, 200ms, 400ms, 800ms...
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 100))
    }
  }

  console.error('Critical Error fetching secrets after all attempts:', lastError)
  process.exit(1)
}

async function startApp() {
  await fetchSecrets()

  import('./server.js')
}

startApp()
