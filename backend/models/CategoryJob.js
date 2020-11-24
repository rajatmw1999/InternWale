const mongoose = require("mongoose");

const category_Data = new mongoose.Schema({
Category:{
    type:String
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

module.exports = CategoryData = mongoose.model("CategoryData", category_Data);
