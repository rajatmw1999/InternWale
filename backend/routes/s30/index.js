const scraper= require("../scrappers/jp Morgan/scraper.js");
const app= require("express")();
const mongoose= require('mongoose');
const job=require("../models/jobs");

app.get("/s30",function (req,res){
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
            itr++;
            let newJob = {
            Title:data.name,
            Category:data.type,
            DatePosted: null,
            Company: data.company,
            LinktoJobPost: data.link,
            Description: data.description,
            JobId:null,
            Location:data.location
            };
            dataArray.push(newJob);
            if(itr==20){
            break;
            }
        }

        const newData = new job({
        CompanyName:"JP Morgan",
        DateScrap:Date.now(),
        UID:"jpMOrgan_30",
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