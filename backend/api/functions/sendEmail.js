const router = require("express").Router();
let nodemailer = require("nodemailer");
const email = "chachav821@gmail.com";

const emailArray = [
  "krish988kr@tapi.re",
  "salim739khan@magim.be",
  "lana797rose@sika3.com",
];
// NODEMAILER CONFIG
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: "incampus_temp",
  },
});
router.get("/email/sendemail", (req, res) => {
  for (let i = 0; i < emailArray.length; i++) {
    // NODEMAILER OPTIONS
    var mailOptions = {
      from: email,
      to: emailArray[i],
      subject: "test",
      text: " TEST TO CHECK IF EMAIL IS BEING SENT",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
});
module.exports = router;
