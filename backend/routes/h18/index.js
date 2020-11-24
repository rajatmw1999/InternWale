const scrapper = require("../../scrappers/Vistara Finance/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h18", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].CompanyName,
        LinkToJobPost: jobs[i].link,
        JobId: null,
        Description: null,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  }).then((ans) => {
  const newData = new Job({
    CompanyName: "VistaraFinance",
    DateScrap: Date.now(),
    UID: "VistaraFinance_1",
    Data: data,
  });

  newData.save();
  res.redirect('/scrap/data/h19');
      console.log("Scrapped 18");
});
});
module.exports = router;