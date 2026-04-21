'use client'

import WelcomeEmail from '@/email/templates/WelcomeEmail'

export default function Page() {
  const template = WelcomeEmail('John')

  console.log(template)

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  )
}
