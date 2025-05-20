import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;

export default async function handler(req, res) {
    // Check if we are working with a POST request.
    if (req.method === 'POST') {
        const { name, email: senderEmail, message } = req.body;


        // Some basic validation.
        if (!name || !senderEmail || !message) {
            return res.status(400).json({ error: 'A name, email address and message are required.' });
        }

        try {
            const { data, error: sendError } = await resend.emails.send({
                from: `Contact From <${fromEmail}>`, // Example: "Portfolio Contact <notifications@yourverifieddomain.com>"
                to: [toEmail],
                subject: `New message from: ${name}`,
                reply_to: senderEmail, // So when I hit "reply" in your email client, it goes to the form sender
                html: `
          <h2>New Portfolio Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
            });

            if (sendError) {
                console.error('Resend API Error: ', sendError);
                return res.status(500).json({ error: 'Failed to send email.', details: sendError.message });
            }

            return res.status(200).json({ success: true, message: 'Email sent successfully!', messageId: data.id });
        } catch (exception) {
            console.error('Server Exception:', exception);
            return res.status(500).json({ error: 'An unexpected error occurred.', details: exception.message });
        }
    } else {
        // handle any other HTTP methods.
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}