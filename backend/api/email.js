const mongoose = require('mongoose');
const EmailData = require('../models/Email');
const express = require('express');
const router = express.Router();
const {emailOfCategory} = require('./functions/emailFunction');

//IMPORTING AND CONFIURING NODEMAILER----------------------------------
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
//-----------------------------------------------------------------


//GET ALL THE EMAILS STORED INSIDE THE LIST
router.get('/all', async(req, res) => {
    EmailData.find({}, async(err, ans) => {
        if(err)
        {   
            console.log(err);
            return res.status(500).send("Error = " + err);
        }
        let emails = [];
        await ans.forEach(async(email) => {
            emails.push(email.email);
        });
        return res.status(200).send(emails);
    });
});

//STORE A NEW EMAIL IN THE LIST
router.post('/new', async(req, res) => {
    const {email, category} = req.body;
    EmailData.findOne({email:email}, async(err, found)=>{
        if(found)   
            return res.send("This email already exists.");
        else
        {
            if(category.length == 0)
                category = null;
            const newEmail = await new EmailData({
                email:email,
                category:category
            });
            await newEmail.save();

            
                // NODEMAILER OPTIONS START-----------------------------------------------------------------------
                var mailOptions = {
                  from: 'SkillUnga Official <skillunga.official@gmail.com>',
                  to: email,
                  subject: "Your Welcome Gift from SkillUnga!",
                  html : { path: __dirname + '/functions/finalemail/index.html' },
                  attachments: [
                    {
                        filename: 'pablita-delivery.png',
                        path: __dirname + '/functions/finalemail/images/pablita-delivery.png',
                        cid: 'delivery' //same cid value as in the html img src
                    },
                    {
                        filename: 'logo-home.png',
                        path: __dirname + '/functions/finalemail/images/logo-home.png',
                        cid: 'logo' //same cid value as in the html img src
                    },
                    {
                        filename: 'icon_feature1.png',
                        path: __dirname + '/functions/finalemail/images/icon_feature1.png',
                        cid: 'feature1' //same cid value as in the html img src
                    },
                    {
                        filename: 'icon_feature2.png',
                        path: __dirname + '/functions/finalemail/images/icon_feature2.png',
                        cid: 'feature2' //same cid value as in the html img src
                    },
                    {
                        filename: 'icon_feature3.png',
                        path: __dirname + '/functions/finalemail/images/icon_feature3.png',
                        cid: 'feature3' //same cid value as in the html img src
                    },
                    {
                        filename: 'icon_feature4.png',
                        path: __dirname + '/functions/finalemail/images/icon_feature4.png',
                        cid: 'feature4' //same cid value as in the html img src
                    },
                    {
                        filename: 'jobs.a2611c9d.png',
                        path: __dirname + '/functions/finalemail/images/jobs.a2611c9d.png',
                        cid: 'jobs' //same cid value as in the html img src
                    },
                    {
                        filename: 'logo-homef.png',
                        path: __dirname + '/functions/finalemail/images/logo-homef.png',
                        cid: 'logof' //same cid value as in the html img src
                    },
                    {
                        filename: 'instagram2x.png',
                        path: __dirname + '/functions/finalemail/images/instagram2x.png',
                        cid: 'instagram' //same cid value as in the html img src
                    },
                    {
                        filename: 'linkedin2x.png',
                        path: __dirname + '/functions/finalemail/images/linkedin2x.png',
                        cid: 'linkedin' //same cid value as in the html img src
                    },
                    
            ]

                };
                await transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });
                //NODEMAILER OPTIONS END--------------------------------------------------------------------------

            return res.status(200).json({
                status:200,
                message:"Email has been added to the list."
            });
        }
    });
    
});

//GET ALL DETAILS OF A PARTICULAR EMAIL
router.post('/details', async(req, res)=> {
    const {email} = req.body;
    EmailData.findOne({email:email}, async(err,found) => {
        if(err)
        {
            return res.status(500).send(err);
        }
        else
        {
            if(found){
                return res.status(200).send(found);
            }
            else{
                return res.status(404).send("No such email found in the list.");
            }
        }
    });
});

//GET ALL EMAILS OF A PARTICULAR CATEGORY - BUSINESS, ENGINEERING, ETC.
router.post('/category/all', async(req, res, next) => {
    const {category} = req.body;
    emailOfCategory(category, function(result) {
        return res.send(result);
      });
});


router.get('/unsubscribe', async(req, res)=>{

});

module.exports = router;