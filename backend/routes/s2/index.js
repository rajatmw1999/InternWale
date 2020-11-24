const scraper= require("../scrappers/Apple Jobs/scrapperApple.js");
const app= require("express")();
const mongoose= require('mongoose');
const job=require("../models/jobs");

app.get("/s2",(req,res)=>{
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
          itr++;
          let newJob = {
            Title:data.nameOfJob,
            Category:data.sector,
            DatePosted: data.publishedDate,
            Company: data.company,
            LinktoJobPost: data.link,
            Description: data.desc,
            JobId:null,
            Location:data.location
          };
          dataArray.push(newJob);
          if(itr==20){
            break;
          }
        }
      
        const newData = new job({
        CompanyName:"Apple",
        DateScrap:Date.now(),
        UID:"apple_2",
        Data:dataArray
        });
      
        newData.save();
        console.log("data saved in database");
    })
});

// app.listen(3000,(req,res)=>{
//     console.log("app listening at http://localhost:3000")
// })
module.exports=app;