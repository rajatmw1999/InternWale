const router = require("express").Router();
const scrapper = require("../../scrappers/icici/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s15", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].sector || null,
        DatePosted: jobs[i].publishedDate || null,
        Company: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].description || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "ICICI",
      DateScrap: Date.now(),
      UID: "icici_15",
      Data: data,
    });
    console.log(newData)
    
  });
});

module.exports = router;
