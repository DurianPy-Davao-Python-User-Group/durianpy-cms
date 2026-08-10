import { DURIANPY_WEBSITE_GLOBALS, DURIANPY_WEBSITE_GLOBALS_LABELS } from './durianpy'

export const GLOBALS = {
  ...DURIANPY_WEBSITE_GLOBALS,
} as const

export type GlobalSlug = (typeof GLOBALS)[keyof typeof GLOBALS]

export const GLOBAL_LABELS: Record<GlobalSlug, string> = {
  ...DURIANPY_WEBSITE_GLOBALS_LABELS,
}
