import { Resend } from 'resend';
import { Handler } from '@netlify/functions';

const resend = new Resend(import.meta.env.RESEND_API_KEY as string);

interface EmailRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const handler: Handler = async (event) => {
    try {
        const {name, email, subject, message}: EmailRequest = JSON.parse(event.body as string);

        const emailBody = `
        You have a new message from your portfolio website:

        Name: ${name}
        Email: ${email}

        Message:
        ${message}
        `
        await resend.emails.send({
            from: `Portfolio Website <${import.meta.env.SENDER_EMAIL}>`,
            to: "aaronfllr.work@gmail.com",
            subject: subject,
            text: emailBody,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" }),
        }; 
    } 
    catch (error) {
        console.error('Error sending email', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending email" }),
        }
    }
}
