//IMPORTING AND CONFIURING NODEMAILER----------------------------------
let nodemailer = require("nodemailer");
const email = "chachav821@gmail.com";
const emailArray = ["rajatis1999@gmail.com"];

function emailNewJobs(data) {
  // NODEMAILER CONFIG
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: "incampus_temp",
    },
  });
  //-----------------------------------------------------------------
  var mailOptions = {
    from: "SkillUnga Official <skillunga.official@gmail.com>",
    to: emailArray.map((email) => email),
    subject: "Job Alert for you!",
    text: JSON.stringify(data),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = emailNewJobs;
