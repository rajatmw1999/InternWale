const { Number } = require("mongoose");
const mongoose = require("mongoose");

const AngelJobSchema = new mongoose.Schema({
   UID: {
    type: String,
    required:true
  },
  PlatformName: {
    type: String,
    required:true
  },
  DateScrap: {
    type: String,
    default: Date.now(),
  },
  TotalJobs:{
    type:Number,
    required:true
  },
  Data: 
    {
        NameOfField:{
            type:String,
            required:true
        },
        NameOfSubfield:{
            type:String,
            required:true
        },
        JobsArr:[{
            JobId: {
                type: String,
                default:null
            },
            Title: {
                type: String,
                required:true
            },
            DatePosted: {
                type: String,
                default:null
            },
            CompanyName: {
                type: String,
                required:true
            },
            LinktoJobPost: {
                type: String,
                required:true
            },        
            Description: {
                type: String,
                required:true
            },
            Location: {
                type: String,
                required:true
            },
            ExpReq:{
                type:String,
                required:true
            },
            Salary:{
                type:String,
                default:null
            },
            Skills:{
                type:String,
                default:null
            }
        }]
    },
});

module.exports = AngelJob = mongoose.model("AngelJob", AngelJobSchema);
