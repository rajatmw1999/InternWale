const scraper= require("../scrappers/Deutsche Bank/scrapperDeutscheBank.js");
const app= require("express")();
const job=require("../models/jobs");

app.get("/s8",(req,res)=>{
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(d in data)
        {
          itr++;
          let newJob = {
            Title:d.nameOfJob,
            Category:null,
            DatePosted: null,
            Company: d.company,
            LinktoJobPost: d.link,
            Description: null,
            JobId:d.id,
            Location:d.location
          };
          dataArray.push(newJob);
          if(itr==20){
            break;
          }
        }
      
        const newData = new job({
        CompanyName:"Deutsche Bank",
        DateScrap:Date.now(),
        UID:"deutscheBank_8",
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