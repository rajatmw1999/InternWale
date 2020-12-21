const router = require("express").Router();
const scrapper = require("../../hiristscrapper/mobile/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s1", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].category || null,
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
      CompanyName: "Hirist Mobile Development",
      DateScrap: Date.now(),
      UID: "hiristMobileDevelopment_1",
      Data: data,
    });
    await newData.save();

    // console.log(newData)
    res.redirect('/scrap/data/hirist/s2');
    console.log("Hirist Scrapped 1");
  });
});

module.exports = router;
