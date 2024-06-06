import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
    }
});

const sendVerificationMail = async ({ to, verificationToken }) => {
    return transport.sendMail({
        to,
        from: process.env.MAILTRAP_OWNER_EMAIL,
        subject: "Please, verify your email",
        html:
            `<h1>Please, verify your email</h1>
            <p>Click this link for verify your email adress</p>
            <a href="${process.env.BASE_URL}/users/verify/${verificationToken}">Verify</a>`,
        text: `Please, verify your email ${process.env.BASE_URL}/users/verify/${verificationToken}`,
    })
}

export { sendVerificationMail }
