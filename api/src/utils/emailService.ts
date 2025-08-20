import nodemailer from "nodemailer";

interface TicketEmailData {
    to: string;
    name: string;
    role: string;
    eventTitle: string;
    eventVenue: string;
    eventDate: string;
    eventTime: string;
    qrCodeUrl: string;
}

export async function sendTicketEmail(data: TicketEmailData) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const html = `
        <h2>Hello ${data.name},</h2>
        <p>You have been added as <b>${data.role}</b> for the event <b>${data.eventTitle}</b>.</p>
        <p><b>Venue:</b> ${data.eventVenue}</p>
        <p><b>Date:</b> ${data.eventDate}</p>
        <p><b>Time:</b> ${data.eventTime}</p>
        <p>Please present this QR code at the venue:</p>
        <img src="${data.qrCodeUrl}" alt="Ticket QR Code" />
        <p>Enjoy the event! 🎉</p>
    `;

    await transporter.sendMail({
        from: `"Event Management" <${process.env.EMAIL_USER}>`,
        to: data.to,
        subject: `🎟 Your Ticket for ${data.eventTitle}`,
        html,
    });
}
