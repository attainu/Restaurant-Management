const nodemailer = require('nodemailer')
const activationToken = require('../controllers/adminController')
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
})

transport.verify().then((res) => console.log(res))

function sendMailToUser(user,email,activationToken) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: 'Please verify first to avail servies',
        html: `Go through this to activate your account http://localhost:1234/admin/:activationToken`
    }).then((res) => {
        console.log(`response: ${res}`);
    }).catch((err) => console.log(`error : ${err}`))
}

 function sendMailToAdmin(user,email,activationToken) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: 'Email verification, for authenticate your Registration',
        html: `Here is your accessToken: ${activationToken}`,
    }).then((res) => {
        res.send
        console.log('there is some error'+ err);
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
        subject: `use this mail and make your registration successful`,
        html: `<h1>make use of this make registration<h1>Password: ${password}`
    }).then((res) => {
        console.log(res);
    }).catch((err) => console.log(err.message))
}

module.exports={sendMailToAdmin,forgotPasswordmailToAdmin, forgotPasswordmailToUser,
    sendMailToUser};
    