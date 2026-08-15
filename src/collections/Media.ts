import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTIONS } from '@/constants/collections'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.ENVIRONMENT === 'production'

export const Media: CollectionConfig = {
  slug: COLLECTIONS.MEDIA,
  folders: true,
  access: {
    ...createCollectionAccess(COLLECTIONS.MEDIA, false),
    create: authenticated,
    delete: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: isProduction ? '/tmp/media' : path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'text/plain'],
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
