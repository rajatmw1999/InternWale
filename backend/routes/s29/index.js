const router = require("express").Router();
const scrapper = require("../../scrappers/intel scraper/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s29", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].category || null,
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
      CompanyName: "Intel",
      DateScrap: Date.now(),
      UID: "intel_29",
      Data: data,
    });
    await newData.save();

    console.log(newData)
    
  });
});

module.exports = router;
