import { Resend } from 'resend'

export const sendContactEmail = async (req, res) => {
  const resend = new Resend(`${process.env.RESEND_API_KEY}`)

  try {
    const { name, email, company, service, message } = req.body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.',
      })
    }

    const { data, error } = await resend.emails.send({
      from: 'StartupLift Website <onboarding@resend.dev>',
      to: `${process.env.CONTACT_EMAIL}`,
      replyTo: email,
      subject: `New StartupLift Project Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 30px;">

          <h1 style="margin-bottom: 5px;">
            New Project Inquiry
          </h1>

          <p style="color: #666;">
            Someone submitted the contact form on StartupLift Dev.
          </p>

          <hr style="margin: 25px 0;" />

          <h2>Contact Information</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Company:</strong> ${company || 'Not provided'}
          </p>

          <p>
            <strong>Service:</strong> ${service}
          </p>

          <h2>Project Details</h2>

          <p style="white-space: pre-line;">
            ${message}
          </p>

          <hr style="margin: 25px 0;" />

          <p style="color: #888; font-size: 13px;">
            Sent from the StartupLift Dev contact form.
          </p>

        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)

      return res.status(500).json({
        success: false,
        message: 'Failed to send email.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      data,
    })
  } catch (error) {
    console.error('Contact email error:', error)

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message.',
    })
  }
}
