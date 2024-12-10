const mailgun = require("mailgun-js");

async function sendMail(reciver, subject, msg){
    const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAINE,  host: process.env.MAILGUN_HOST});
    console.log(reciver)
    const mail = {
        from: 'TAHDDA ASSESMENT <mailgun@sandbox8d26550d8f8a4ad09b316cbddeae2ef6.mailgun.org>',
        to: [reciver],
        subject: subject,
        text: msg,
        html: "<h1>" + msg + "</h1>"
    };
  
    await mg.messages().send(mail, function (error, body) {
        console.log(error )
        console.log(body)
    });
}


module.exports = {   
    sendMail,
}