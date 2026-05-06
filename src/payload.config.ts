import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import nodemailer from 'nodemailer'

import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from '@payloadcms/storage-s3'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const sesClient = new SESv2Client({
  region: process.env.AWS_REGION || 'ap-southeast-1',
})

const isProduction = process.env.NODE_ENV === 'production' || process.env.ENVIRONMENT === 'production'

const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
)

export default buildConfig({
  serverURL: getServerSideURL(),
  routes: {
    admin: isProduction ? '/prod/admin' : '/admin',
    api: isProduction ? '/prod/api' : '/api',
  },
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
        transport: nodemailer.createTransport({
          SES: {
            sesClient,
            SendEmailCommand
          },
        }),
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
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()]
    .filter(Boolean)
    .map((url) => {
      try {
        const { origin } = new URL(url!)
        return origin
      } catch (e) {
        return url!
      }
    }),
  csrf: [getServerSideURL()]
    .filter(Boolean)
    .map((url) => {
      try {
        const { origin } = new URL(url!)
        return origin
      } catch (e) {
        return url!
      }
    }),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                generateFileURL: ({ filename, prefix }) => {
                  return `${process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN}/${prefix}/${filename}`
                },
                prefix: 'media',
              },
            },
            bucket: process.env.S3_BUCKET,
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
})
