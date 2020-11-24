const scraper= require("../scrappers/HSBC/scrapperHSBC.js");
const app= require("express")();
const mongoose= require('mongoose');
const job=require("../models/jobs");

app.get("/s13",function (req,res){
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
            itr++;
            let newJob = {
            Title:data.nameOfJob,
            Category:data.type,
            DatePosted: data.datePosted,
            Company: data.company,
            LinktoJobPost: data.link,
            Description: null,
            JobId:null,
            Location:data.location
            };
            dataArray.push(newJob);
            if(itr==20){
            break;
            }
        }

        const newData = new job({
        CompanyName:"HSBC",
        DateScrap:Date.now(),
        UID:"hsbc_13",
        Data:dataArray
        });

        newData.save();
        console.log("data saved in database")
        })
});

// app.listen(3000,(req,res)=>{
//     console.log("app listening at http://localhost:3000")
// })

module.exports=app;