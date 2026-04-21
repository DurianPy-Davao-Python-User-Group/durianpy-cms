import { FC } from 'react'
const { renderToStaticMarkup } = await import('react-dom/server')

// TODO: Update email template to include link of CMS
const WelcomeEmail: FC<{ firstName: string }> = ({ firstName }) => {
  return (
    <div className="container">
      <h3>Hello, {firstName}!</h3>
      <p>
        Welcome to <strong>DurianPy CMS</strong>!
      </p>
      <p>
        An account has been created for you using this email address. This will grant you access to
        our content management system (CMS), where you can manage and collaborate on projects
        seamlessly.
      </p>
      <p>
        To get started, please contact the DurianPy CMS support team to receive your password and
        complete your account setup.
      </p>
      <p>If you have any questions, feel free to reach out to us. We're here to help!</p>
      <p>
        Best regards,
        <br />
        <strong>The DurianPy Engineering Team</strong>
      </p>
      <div className="footer">
        <br />
        <p>
          <i>
            If you didn’t expect this email, please disregard it or contact{' '}
            <a href="mailto:support@durianpy.com">support@durianpy.com</a> for assistance.
          </i>
        </p>
      </div>
    </div>
  )
}

export default (firstName: string) => renderToStaticMarkup(<WelcomeEmail firstName={firstName} />)
