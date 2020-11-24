const EmailData = require('../../models/Email');
const mongoose = require('mongoose');

//GET ALL EMAILS OF A SUBSCRIBED TO A PARTICULAR CATEGORY
async function emailOfCategory(category, callback){
    EmailData.find({}, async(err, found) => {
        if(err)
        {
            return err;
        }
        else
        {
            if(found){
                let res = [];
                await found.forEach(async(email) => {
                    if(email.category.includes(category))
                        res.push(email.email);
                });
                console.log(res);
                if(res.length)
                    callback(res);
                else
                    callback("No email found in the list.");
            }
            else{
                callback("No email found in the list.");
            }
        }
    });
}

module.exports = {
    emailOfCategory:emailOfCategory
}