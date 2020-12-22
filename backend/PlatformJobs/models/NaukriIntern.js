const { Number } = require("mongoose");
const mongoose = require("mongoose");

const NaukriInternSchema = new mongoose.Schema({
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
  TotalField:{
    type:Number,
    required:true
  },
  TotalSubfield:{
    type:Number,
    required:true
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
            Stipend:{
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

module.exports = NaukriIntern = mongoose.model("NaukriIntern", NaukriInternSchema);
