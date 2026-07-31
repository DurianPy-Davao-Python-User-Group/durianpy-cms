export const GLOBALS = {
  DURIANPY_WEBSITE_HOMEPAGE_CONFIG: 'durianpy-website-homepage-config',
} as const

export type GlobalSlug = (typeof GLOBALS)[keyof typeof GLOBALS]

export const GLOBAL_LABELS: Record<GlobalSlug, { singular: string; plural: string }> = {
  [GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG]: {
    singular: 'Homepage Config',
    plural: 'Homepage Configs',
  },
}
