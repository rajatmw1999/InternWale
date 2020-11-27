const router = require("express").Router();
const scrapper = require("../../scrappers/air Asia/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s28", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].type || null,
        DatePosted: jobs[i].publishedDate || null,
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
      CompanyName: "Air Asia",
      DateScrap: Date.now(),
      UID: "airAsia_28",
      Data: data,
    });
    await newData.save();
    res.redirect('/scrap/data/s29');
    console.log("Scrapped 28");
    // console.log(newData)
    
  });
});

module.exports = router;
