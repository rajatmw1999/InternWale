const scraper= require("../scrappers/Credit Suisse/scrapperCreditSuisse.js");
const app= require("express")();
const job=require("../models/jobs");

app.get("/s7",(req,res)=>{
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(data in fullData)
        {
          itr++;
          let newJob = {
            Title:data.name,
            Category:data.field,
            DatePosted: data.posted,
            Company: data.company,
            LinktoJobPost: null,
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
        CompanyName:"Credit Suisse",
        DateScrap:Date.now(),
        UID:"creditSuisse_7",
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