import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from '@payloadcms/storage-s3'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL, getServerSideOrigin } from './utilities/getURL'
import { Sample } from './collections/durianpy-website/sample-website-collection.index'
import { OrganizationStatus } from './globals/durianpy-website/OrganizationStatus'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.ENVIRONMENT === 'production'

const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
)

export default buildConfig({
  serverURL: getServerSideURL(),
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  ...(isProduction &&
    hasSmtpConfig && {
      email: nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'durianpy.davao@gmail.com',
        defaultFromName: 'DurianPy CMS',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      }),
    }),
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    ...(isProduction && {
      connectOptions: {
        tls: true,
        authMechanism: 'SCRAM-SHA-256',
        serverSelectionTimeoutMS: 60000,
        connectTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        family: 4,
      },
    }),
  }),
  collections: [Media, Categories, Users, Sample],
  globals: [OrganizationStatus],
  cors: [getServerSideOrigin()].filter(Boolean).map((url) => {
    try {
      const { origin } = new URL(url!)
      return origin
    } catch (_) {
      return url!
    }
  }),
  csrf: [getServerSideOrigin()].filter(Boolean).map((url) => {
    try {
      const { origin } = new URL(url!)
      return origin
    } catch (_) {
      return url!
    }
  }),
  plugins: [
    ...plugins,
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                disableLocalStorage: true,
                generateFileURL: ({ filename, prefix }) => {
                  const domain = process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN
                  if (!domain) return filename
                  const normalizedDomain = domain.replace(/\/$/, '')
                  const protocol = normalizedDomain.startsWith('http') ? '' : 'https://'
                  return `${protocol}${normalizedDomain}/${prefix}/${filename}`
                },
                prefix: 'media',
              },
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
              region: process.env.AWS_REGION || 'ap-southeast-1',
            },
            enabled: isProduction,
          }),
        ]
      : []),
  ],
  upload: {
    limits: {
      fileSize: 50000000, // 50MB
    },
    useTempFiles: false,
    tempFileDir: '/tmp',
    debug: true,
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
  folders: {
    browseByFolder: false,
  },
})
