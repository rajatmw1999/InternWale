const router = require("express").Router();
const scrapper = require("../../scrappers/McKinsey/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h3", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: jobs[i].category,
          DatePosted: jobs[i].date,
          Company: jobs[i].companyName,
          LinktoJobPost: jobs[i].link,
          JobId: null,
          Description: jobs[i].desc,
          Location: jobs[i].location,
        };
        data.push(new_job);
      }
    })
    .then((ans) => {
      const newData = new Job({
        CompanyName: "McKinsey",
        DateScrap: Date.now(),
        UID: "McKinsey_1",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h4");
      console.log("Scrapped 3");
    });
});

module.exports = router;
