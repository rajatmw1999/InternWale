const { Number } = require("mongoose");
const mongoose = require("mongoose");

const FreeResourcesSchema = new mongoose.Schema({
    NameofField:{
        type:String,
        required:true
    },
    DateScrap:{
        type: String,
        default: Date.now(),
    },
    Data:[
        {
            NameofField:{
                type:String,
                required:true
            },
            NameofSubField:{
                type:String,
                required:true
            },
            Articles:[
                {
                    Title:String,
                    Desc:String,
                    Link:String,
                    PlatformName:String,
                    Author:String
                }
            ],
            Videos:[
                {
                    Title:String,
                    Desc:String,
                    Link:String,
                    PlatformName:String,
                    Author:String,
                    Views:Number,
                    Likes:Number
                }
            ]
        }
    ]
});

module.exports = FreeResources = mongoose.model("FreeResources", FreeResourcesSchema);
