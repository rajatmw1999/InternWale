const router = require("express").Router();
const scrapper = require("../../hiristscrapper/dataScience/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s5", async (req, res)=> {
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
      CompanyName: "Hirist Data Science",
      DateScrap: Date.now(),
      UID: "hiristDataScience_5",
      Data: data,
    });
    await newData.save();

    // console.log(newData)
    res.redirect('/scrap/data/hirist/s6');
    console.log("Hirist Scrapped 5");
  });
});

module.exports = router;
