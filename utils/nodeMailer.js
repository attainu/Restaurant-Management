const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        admin: 'sequelizeck01@gmail.com',
        pass: '9110130860rt'
    }
})

transport.verify().then((res) => {
    console.log(res)
})
.catch((err) => console.log(err.message));

function sendMailToAdmin(email,activationToken) {
    transport.sendMail({
        from: 'sequelizeck01@gmail.com',
        to: email,
        subject: 'Email verification, for authenticating your Registration',
        html: `Here is your accessToken: ${activationToken}`,
    }).then((res) => {
        console.log(email,activationToken)
        console.log(res);
    }).catch((err) => console.log(err.message))
}

function forgotPasswordmailToAdmin(email,password) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: `use this mail and make your registration successful`,
        html: `<h1>make use of this make registration
        <h1>Password: ${password}`
    }).then((res) => {
        console.log(res);
    }).catch((err) => console.log(err.message))
}

function forgotPasswordmailToUser(email,password) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: `Activate your account by this. thank you.`,
        html: `<p>make use of this mail and activate your account.</p>
        <h3>Password: ${password}`
    }).then((response) => {
        console.log(email,password)
        console.log(response);
    }).catch((err) => console.log(err.message))
}


module.exports={sendMailToAdmin,forgotPasswordmailToAdmin, forgotPasswordmailToUser};