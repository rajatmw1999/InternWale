const router = require("express").Router();
const scrapper = require("../../scrappers/Wipro/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h22", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: null,
          DatePosted: jobs[i].date || null,
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
        CompanyName: "Wipro",
        DateScrap: Date.now(),
        UID: "Wipro_1",
        Data: data,
      });
      newData.save();

      console.log(
        "Scrapped 22 ----------------DONE--------------------------."
      );
      res.send("Done");
    });
});
module.exports = router;
