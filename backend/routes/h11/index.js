const scrapper = require("../../scrappers/pwc Scraper/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h11", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: null,
          DatePosted: null,
          Company: jobs[i].CompanyName,
          LinktoJobPost: jobs[i].link,
          JobId: null,
          Description: null,
          Location: jobs[i].location,
        };
        data.push(new_job);
      }
    })
    .then((ans) => {
      const newData = new Job({
        CompanyName: "PWC",
        DateScrap: Date.now(),
        UID: "PWC_1",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h12");
      console.log("Scrapped 11");
    });
});
module.exports = router;
