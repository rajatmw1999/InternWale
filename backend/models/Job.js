const mongoose = require("mongoose");

const job_Data = new mongoose.Schema({
  Title: {
    type: String,
  },
  Location: {
    type: String,
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
});

module.exports = JobData = mongoose.model("JobData", job_Data);
