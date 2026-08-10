export const DURIANPY_WEBSITE_GLOBALS = {
  DURIANPY_WEBSITE_HOMEPAGE_CONFIG: 'durianpy-website-homepage-config',
  DURIANPY_WEBSITE_STATISTICS_CONFIG: 'durianpy-website-statistics-config',
  DURIANPY_WEBSITE_CTA_SECTION: 'durianpy-website-cta-section',
  DURIANPY_WEBSITE_CAROUSEL: 'durianpy-website-carousel',
  DURIANPY_WEBSITE_CODE_OF_CONDUCT: 'durianpy-website-code-of-conduct',
} as const

export type DurianpyWebsiteGlobalSlug =
  (typeof DURIANPY_WEBSITE_GLOBALS)[keyof typeof DURIANPY_WEBSITE_GLOBALS]

export const DURIANPY_WEBSITE_GLOBALS_LABELS: Record<DurianpyWebsiteGlobalSlug, string> = {
  [DURIANPY_WEBSITE_GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG]: 'Homepage Config',
  [DURIANPY_WEBSITE_GLOBALS.DURIANPY_WEBSITE_STATISTICS_CONFIG]: 'Statistics Config',
  [DURIANPY_WEBSITE_GLOBALS.DURIANPY_WEBSITE_CTA_SECTION]: 'CTA Section',
  [DURIANPY_WEBSITE_GLOBALS.DURIANPY_WEBSITE_CAROUSEL]: 'Carousel',
  [DURIANPY_WEBSITE_GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT]: 'Code of Conduct',
}

export const DURIANPY_WEBSITE_COLLECTIONS = {
  DURIANPY_WEBSITE_EVENTS: 'durianpy-website-events',
  DURIANPY_WEBSITE_SPONSORS: 'durianpy-website-sponsors',
  DURIANPY_WEBSITE_SIGS: 'durianpy-website-sigs',
} as const

export type DurianpyWebsiteCollectionSlug =
  (typeof DURIANPY_WEBSITE_COLLECTIONS)[keyof typeof DURIANPY_WEBSITE_COLLECTIONS]

export const DURIANPY_WEBSITE_COLLECTIONS_LABELS: Record<
  DurianpyWebsiteCollectionSlug,
  { singular: string; plural: string }
> = {
  [DURIANPY_WEBSITE_COLLECTIONS.DURIANPY_WEBSITE_EVENTS]: {
    singular: 'Event',
    plural: 'Events',
  },
  [DURIANPY_WEBSITE_COLLECTIONS.DURIANPY_WEBSITE_SPONSORS]: {
    singular: 'Sponsor',
    plural: 'Sponsors',
  },
  [DURIANPY_WEBSITE_COLLECTIONS.DURIANPY_WEBSITE_SIGS]: {
    singular: 'SIG',
    plural: 'SIGs',
  },
}

export const DURIANPY_WEBSITE_ITEMS: (DurianpyWebsiteGlobalSlug | DurianpyWebsiteCollectionSlug)[] =
  [
    ...Object.values(DURIANPY_WEBSITE_GLOBALS),
    ...Object.values(DURIANPY_WEBSITE_COLLECTIONS),
  ] as const
