const scrapper = require("../../scrappers/morgan Stanley/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h6", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
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
    .then((ans) => {
      const newData = new Job({
        CompanyName: "Morgan Stanley",
        DateScrap: Date.now(),
        UID: "MorganStanley_1",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h7");
      console.log("Scrapped 6");
    });
});

module.exports = router;
