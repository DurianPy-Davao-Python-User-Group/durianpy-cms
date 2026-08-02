export const GLOBALS = {
  DURIANPY_WEBSITE_HOMEPAGE_CONFIG: 'durianpy-website-homepage-config',
  DURIANPY_WEBSITE_STATISTICS_CONFIG: 'durianpy-website-statistics-config',
  DURIANPY_WEBSITE_CTA_SECTION: 'durianpy-website-cta-section',
  DURIANPY_WEBSITE_CAROUSEL: 'durianpy-website-carousel',
  DURIANPY_WEBSITE_CODE_OF_CONDUCT: 'durianpy-website-code-of-conduct',
} as const

export type GlobalSlug = (typeof GLOBALS)[keyof typeof GLOBALS]

export const GLOBAL_LABELS: Record<GlobalSlug, { singular: string; plural: string }> = {
  [GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG]: {
    singular: 'Homepage Config',
    plural: 'Homepage Configs',
  },
  [GLOBALS.DURIANPY_WEBSITE_STATISTICS_CONFIG]: {
    singular: 'Statistics Config',
    plural: 'Statistics Configs',
  },
  [GLOBALS.DURIANPY_WEBSITE_CTA_SECTION]: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  [GLOBALS.DURIANPY_WEBSITE_CAROUSEL]: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  [GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT]: {
    singular: 'Code of Conduct',
    plural: 'Codes of Conduct',
  },
}
