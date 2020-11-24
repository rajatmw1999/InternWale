const mongoose = require("mongoose");

const email_Data = new mongoose.Schema({
  email:{
      type:String,
      required:true
  },
  category:{
      type:String,
      default:null
  }
});

module.exports = EmailData = mongoose.model("EmailData", email_Data);
