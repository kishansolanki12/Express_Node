const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host : 'smtp.ethereal.email',
    port : 587,
    auth : {
        user : 'fern.oreilly@ethereal.email',
        pass : 'EE6hbBBECuTKSkemxA'
    }
});

var mailOptions={
    from : "Kishan Solanki <kishansolnki26@gmail.com>",
    to : "fern.oreilly@ethereal.email",
    subject : "Testing email....",
    text : "HEllo this is kishan solanki"
}

transporter.sendMail(mailOptions,(error,info)=>
{
    if (error) {
        console.log(error);
    } else {
        console.log("Email has been sent ",info.response)
    }
});