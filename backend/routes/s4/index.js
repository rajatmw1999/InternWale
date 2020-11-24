const scraper= require("../scrappers/BCG/scrapperBCG.js");
const app= require("express")();
const job=require("../models/jobs");


app.get("/s4",(req,res)=>{
    scraper().then(fullData=>{
        let dataArray = [];
        let itr=0;
        for(d in fullData)
        {
            itr++;
            let newJob = {
            Title:d.nameOfJob,
            Category:null,
            DatePosted: d.datePosted,
            Company: d.company,
            LinktoJobPost: d.link,
            Description: d.desc,
            JobId:null,
            Location:d.location
            };
            dataArray.push(newJob);
            if(itr==20){
            break;
            }
        }

        const newData = new job({
        CompanyName:"BCG",
        DateScrap:Date.now(),
        UID:"BCG_4",
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