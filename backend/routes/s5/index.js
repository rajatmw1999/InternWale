const scraper= require("../scrappers/BDO/scrapperBDO.js");
const app= require("express")();
const job=require("../models/jobs");

app.get("/s5",(req,res)=>{
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
        CompanyName:"BDO",
        DateScrap:Date.now(),
        UID:"BDO_5",
        Data:dataArray
        });
      
        newData.save();
        console.log("saved data to database");
    })
});

// app.listen(3000,(req,res)=>{
//     console.log("app listening at http://localhost:3000")
// })

module.exports=app;
