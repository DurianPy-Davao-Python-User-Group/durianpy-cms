import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import { COLLECTION_LABELS, COLLECTIONS, getCollectionGroupLabel } from '@/constants/collections'
import type { AccessArgs, CollectionConfig } from 'payload'
import type { CollectionBeforeChangeHook } from 'payload'

const checkEventsAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, COLLECTIONS.DURIANPY_WEBSITE_EVENTS, accessType)

const ensureSingleFeatured: CollectionBeforeChangeHook = async ({ data, req, originalDoc }) => {
  if (data.isFeatured && data._status === 'published') {
    const { docs } = await req.payload.find({
      collection: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
      where: {
        isFeatured: { equals: true },
        id: { not_equals: originalDoc?.id },
      },
      limit: 0,
    })

    await Promise.all(
      docs.map((doc) =>
        req.payload.update({
          collection: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
          id: doc.id,
          data: { isFeatured: false },
        }),
      ),
    )
  }
  return data
}

export const Events: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_EVENTS],
  access: {
    admin: checkEventsAccess('admin'),
    create: checkEventsAccess('create'),
    delete: checkEventsAccess('delete'),
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
    update: checkEventsAccess('update'),
  },
  admin: {
    defaultColumns: ['title', 'date', 'location', 'isFeatured'],
    group: getCollectionGroupLabel('durianpy-website'),
  },
  versions: {
    drafts: {
      autosave: {
        showSaveDraftButton: true,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  hooks: {
    beforeChange: [ensureSingleFeatured],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'registrationLink',
      type: 'text',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Feature',
      defaultValue: false,
      admin: {
        description: 'Show on the homepage countdown timer',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
