const scraper= require("../scrappers/Ever Data/scraper.js");
const app= require("express")();
const job=require("../models/jobs");

app.get("/s9",(req,res)=>{
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in jobData)
        {
          itr++;
          let newJob = {
            Title:data.name,
            Category:null,
            DatePosted: null,
            Company: data.company,
            LinktoJobPost: data.link,
            Description: null,
            JobId:null,
            Location:null
          };
          dataArray.push(newJob);
          if(itr==20){
            break;
          }
        }
  
        const newData = new job({
        CompanyName:"Ever Data",
        DateScrap:Date.now(),
        UID:"everData_9",
        Data:dataArray
        });
  
        newData.save();
        console.log("data stored in database")
    })
});

// app.listen(3000,(req,res)=>{
//     console.log("app listening at http://localhost:3000")
// })

module.exports=app;