const router = require("express").Router();
const scrapper = require("../../scrappers/kpmg scraper/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/h1", async (req, res) => {
  let data = [];
  await scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title || null,
          Category: jobs[i].category || null,
          DatePosted: jobs[i].date || null,
          Company: jobs[i].companyName,
          LinktoJobPost: jobs[i].link || null,
          JobId: null,
          Description: jobs[i].desc || null,
          Location: jobs[i].location || null,
        };
        data.push(new_job);
      }
    })
    .then(async (ans) => {
      const newData = await new Job({
        CompanyName: "KPMG",
        DateScrap: Date.now(),
        UID: "kpmg_1",
        Data: data,
      });

      await newData.save().then((err) => {
        res.redirect("/scrap/data/h2");
        console.log("Scrapped 1");
      });
    });
});

module.exports = router;
