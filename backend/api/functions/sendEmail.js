const router = require("express").Router();
let nodemailer = require("nodemailer");
const email = "skillunga.official@gmail.com";

const emailArray = [
  "rajatis1999@gmail.com",
];
// NODEMAILER CONFIG
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: "Skillunga2020",
  },
});
router.get("/sendemail/:email", async(req, res) => {
  for (let i = 0; i < emailArray.length; i++) {
    // NODEMAILER OPTIONS
    var mailOptions = {
      from: 'SkillUnga Official <skillunga.official@gmail.com>',
      to: emailArray[i],
      subject: "Our Welcome Gift!",
      html : { path: 'backend/api/functions/email.html' },
      attachments: [{
        filename: 'logo.png',
        path: 'backend/api/functions/images/logo.png',
        cid: 'logo' //same cid value as in the html img src
}]
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  res.send("Email sent.");
});
module.exports = router;
