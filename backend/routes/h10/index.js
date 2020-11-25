const scrapper = require("../../scrappers/Pinstorm/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h10", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: jobs[i].category || null,
          DatePosted: jobs[i].date || null,
          Company: jobs[i].CompanyName,
          LinktoJobPost: jobs[i].link,
          JobId: null,
          Description: jobs[i].desc || null,
          Location: jobs[i].location || null,
        };
        data.push(new_job);
      }
    })
    .then((ans) => {
      const newData = new Job({
        CompanyName: "Pinstorm",
        DateScrap: Date.now(),
        UID: "Pinstorm_1",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h11");
      console.log("Scrapped 10");
    });
});
module.exports = router;
