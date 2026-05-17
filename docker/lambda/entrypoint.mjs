import { spawn } from 'child_process'

const ENV_VARIABLES = [
  'DATABASE_URL',
  'PAYLOAD_SECRET',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM_ADDRESS',
  'S3_BUCKET',
  'CLOUDFRONT_DISTRIBUTION_DOMAIN',
]

async function fetchSingleParameter(env_variable) {
  const PORT = process.env.PARAMETERS_SECRETS_EXTENSION_HTTP_PORT || '2773'
  const SESSION_TOKEN = process.env.AWS_SESSION_TOKEN
  const PARAMETER_STORE_PREFIX = process.env.PARAMETER_STORE_PREFIX || '/durianpy/cms/prod'

  const parameterPath = `${PARAMETER_STORE_PREFIX}/${env_variable}`
  const url = `http://localhost:${PORT}/systemsmanager/parameters/get?name=${encodeURIComponent(parameterPath)}`

  const headers = {
    'X-Aws-Parameters-Secrets-Token': SESSION_TOKEN,
  }

  const maxRetries = 5

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, { headers })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      const parameterValue = data.Parameter.Value

      process.env[env_variable] = parameterValue
      console.log(`Variable [${env_variable}] successfully injected into environment.`)
      return
    } catch (error) {
      console.warn(
        `Attempt ${i + 1} to fetch variable [${env_variable}] failed: ${error.message}. Retrying...`,
      )

      if (i === maxRetries - 1) {
        // If this is the last attempt, throw the error to fail the Promise
        throw new Error(
          `Failed to fetch [${env_variable}] after ${maxRetries} attempts. Last error: ${error.message}`,
        )
      }

      // Exponential backoff: 100ms, 200ms, 400ms, 800ms...
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 100))
    }
  }
}

async function fetchSecrets() {
  try {
    const fetchPromises = ENV_VARIABLES.map((env_variable) => fetchSingleParameter(env_variable))

    // Promise.all waits for all concurrent fetches to complete.
    // If ANY single promise throws an error (fails all retries), Promise.all rejects immediately.
    await Promise.all(fetchPromises)

    console.log('All secrets successfully fetched and injected.')
  } catch (criticalError) {
    console.error('Critical Error fetching secrets:', criticalError)
    process.exit(1)
  }
}

async function startApp() {
  await fetchSecrets()

  await import('./server.js')
}

startApp()
