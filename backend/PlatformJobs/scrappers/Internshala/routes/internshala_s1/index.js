const router = require("express").Router();
const scrapper = require("../../scrappers/Marketing/scraper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/s1", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 20) jobs.length = 20;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_marketing_marketing",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Marketing",
          NameOfSubfield: "Marketing",
          JobsArr: data,
        },
      });
      await newData.save();

    //   console.log(newData);
    //   console.log(newData.Data);

      res.redirect("/scrap/data/internshala/s2");
      console.log("Internshala Scrapped 1");
    });
});

module.exports = router;
