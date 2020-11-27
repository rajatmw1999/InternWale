const router = require("express").Router();
const scrapper = require("../../scrappers/Credit Suisse/scrapperCreditSuisse");
const Job = require("../../models/Job");
const data = [];

router.get("/s7", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].field || null,
        DatePosted: jobs[i].posted || null,
        Company: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "Credit Suisse",
      DateScrap: Date.now(),
      UID: "creditSuisse_7",
      Data: data,
    });
    // console.log(newData)
    await newData.save();
    res.redirect('/scrap/data/s8');
    console.log("Scrapped 7");
    
  });
});

module.exports = router;
