const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'haluk@ihaksoy.com',
        subject: 'Thanks for joining the app!',
        text: `Welcome to the appp, ${name}.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'haluk@ihaksoy.com',
        subject: 'We\'re sorry to see you go...',
        text: `Hello, ${name}. Your cancellation is processed. Goodbye.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}