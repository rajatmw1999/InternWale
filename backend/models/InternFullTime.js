const mongoose = require("mongoose");

const intern_Data = new mongoose.Schema({
    Type:{
        type:String
    },
  CompanyName: {
    type: String,
  },
  DateScrap:{
    type:String,
    default:Date.now()
  },
  UID: {
    type: String,
  },
  Data:
  [
    {
  Title: {
	type:String
  },
  Category: {
    type: String,
  },
  DatePosted: {
    type: Date,
  },
  Company: {
    type: String,
  },
  LinktoJobPost: {
    type: String,
  },
  JobId: {
    type: String,
  },
  Description: {
    type: String,
  },
Location:{
type:String
}
}
]
});

module.exports = Intern = mongoose.model("Intern", intern_Data);
