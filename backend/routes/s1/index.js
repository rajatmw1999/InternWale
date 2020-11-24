const scraper= require("../../scrappers/Accenture/scrapperAccenture.js");
const router= require("express").Router();
const mongoose= require('mongoose');
const job=require("../../models/Job");

router.get("/s1",function(req,res){
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
            itr++;
            let newJob = {
            Title:data.nameOfJob,
            Category:null,
            DatePosted: null,
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
        CompanyName:"Accenture",
        DateScrap:Date.now(),
        UID:"accenture_1",
        Data:dataArray
        });

        newData.save();
        console.log(newData);
    })
});

module.exports=router;