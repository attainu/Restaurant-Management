const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS
    }
})

transport.verify().then((res) => console.log(res))

function sendMailToUser(email,activationToken) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: 'Please verify first to avail servies',
        html: `Go through this to activate your account http://localhost:1234/user/${activationToken}`
    }).then((res) => {
        console.log(`nodemailer error line no 26 : ${res}`);
    }).catch((err) => console.log(`nodemailer error line no 27 : ${err}`))
}

function forgotPasswordmailToUser(email,password) {
    transporter.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: `use this mail and make your registration successful`,
        html: `<h1>make use of this make registration
        <h1>Password: ${password}`
    }).then((res) => {
        console.log(res);
    }).catch((err) => console.log(err.message))
}
//-----------------------------------------------------------------------------------

 function sendMailToAdmin(email,activationToken) {
    transporter.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: 'Email verification, for authenticating your Registration',
        html: `Here is your accessToken: ${activationToken}`,
    }).then((res) => {
        res.send
        console.log('there is some error' + activationToken +err);
    }).catch((err) => console.log(err.message))
 }

function forgotPasswordmailToAdmin(email,password) {
    transporter.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: `use this mail and make your registration successful`,
        html: `<h1>make use of this make registration
        <h1>Password: ${password}`
    }).then((res) => {
        console.log(res);
    }).catch((err) => console.log(err.message))
}

module.exports={sendMailToAdmin,forgotPasswordmailToAdmin, forgotPasswordmailToUser,
    sendMailToUser};
    