import React from 'react'
import Image from 'next/image'
import { getGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

export async function OrganizationStatusComponent() {
  const data = await getGlobal('organization-status', 1)

  if (!data?.isPSFPartner) {
    return null
  }

  const logoObj = typeof data.psfPartnerLogo === 'object' ? (data.psfPartnerLogo as Media) : null
  const logoUrl = getMediaUrl(logoObj?.url)
  const altText = logoObj?.alt || 'PSF Partner Logo'

  if (!logoUrl) {
    return null
  }

  return (
    <div className="psf-partner-status flex items-center gap-2">
      <Image
        src={logoUrl}
        alt={altText}
        width={logoObj?.width || 120}
        height={logoObj?.height || 40}
        className="h-auto max-h-12 w-auto object-contain"
      />
    </div>
  )
}
