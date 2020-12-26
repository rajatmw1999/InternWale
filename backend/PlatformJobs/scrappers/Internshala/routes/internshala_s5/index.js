const router = require("express").Router();
const scrapper = require("../../scrappers/LawAndLegal/scraper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/s5", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 20) jobs.length = 20;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_Law_LawAndLegal",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Law",
          NameOfSubfield: "Law And Legal",
          JobsArr: data,
        },
      });
      await newData.save();

    //   console.log(newData);
    //   console.log(newData.Data);

      res.redirect("/scrap/data/internshala/s6");
      console.log("Internshala Scrapped 5");
    });
});

module.exports = router;
