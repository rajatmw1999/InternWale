const router = require("express").Router();
const scrapper = require("../../scrappers/MechEngineering/scraper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/s6", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 20) jobs.length = 20;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_engineering_MechanicalEngineering",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Engineering",
          NameOfSubfield: "Mechanical Engineering",
          JobsArr: data,
        },
      });
      await newData.save();

    //   console.log(newData);
    //   console.log(newData.Data);

    //   res.redirect("/scrap/data/internshala/s6");
      console.log("Internshala Scrapped 6");
      console.log(`Internshala Scrapping Completed !`);

    });
});

module.exports = router;
