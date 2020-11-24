const scraper= require("../scrappers/cognizant Chennai scraper/scraper.js");
const app= require("express")();
const mongoose= require('mongoose');
const job=require("../models/jobs");

app.get("/s23",function (req,res){
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
            itr++;
            let newJob = {
            Title:data.name,
            Category:null,
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
        CompanyName:"Cognizant",
        DateScrap:Date.now(),
        UID:"cognizant_23",
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