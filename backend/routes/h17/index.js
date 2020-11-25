const scrapper = require("../../scrappers/Vistara Engg/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h17", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: null,
          DatePosted: jobs[i].date || null,
          Company: jobs[i].CompanyName,
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
        CompanyName: "VistaraEngg",
        DateScrap: Date.now(),
        UID: "VistaraEngg_1",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h18");
      console.log("Scrapped 17");
    });
});
module.exports = router;
