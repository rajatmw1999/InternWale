const scraper= require("../scrappers/Genpact/scrapperGenpact.js");
const app= require("express")();
const mongoose= require('mongoose');
const job=require("../models/jobs");

app.get("/s11",function (req,res){
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
            itr++;
            let newJob = {
            Title:data.nameOfJob,
            Category:data.category,
            DatePosted: data.posted,
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
        CompanyName:"Genpact",
        DateScrap:Date.now(),
        UID:"genpact_11",
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