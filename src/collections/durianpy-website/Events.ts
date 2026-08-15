import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTION_LABELS, COLLECTIONS } from '@/constants/collections'
import { SIDEBAR_GROUPS, getSidebarGroupLabel } from '@/constants/sidebarGroup'
import type { CollectionConfig } from 'payload'
import type { CollectionBeforeChangeHook } from 'payload'

const ensureSingleFeatured: CollectionBeforeChangeHook = async ({ data, req, originalDoc }) => {
  if (data.isFeatured && data._status === 'published') {
    const { docs } = await req.payload.find({
      collection: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
      where: {
        isFeatured: { equals: true },
        id: { not_equals: originalDoc?.id },
      },
      limit: 0,
      req,
    })

    await Promise.all(
      docs.map((doc) =>
        req.payload.update({
          collection: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
          id: doc.id,
          data: { isFeatured: false },
          req,
        }),
      ),
    )
  }
  return data
}

export const Events: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_EVENTS],
  access: createCollectionAccess(COLLECTIONS.DURIANPY_WEBSITE_EVENTS, true),
  admin: {
    defaultColumns: ['title', 'date', 'location', 'isFeatured'],
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
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
