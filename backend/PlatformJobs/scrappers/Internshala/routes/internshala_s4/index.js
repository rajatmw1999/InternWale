const router = require("express").Router();
const scrapper = require("../../scrappers/HR/scraper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/s4", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 200) jobs.length = 200;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_HumanResources_HumanResources",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Human Resources",
          NameOfSubfield: "Human Resources",
          JobsArr: data,
        },
      });
      Job.collection.deleteMany({"UID": "internshala_HumanResources_HumanResources"});

      await newData.save();

    //   console.log(newData);
    //   console.log(newData.Data);

      res.redirect("/scrap/data/internshala/s5");
      console.log("Internshala Scrapped 4");
    });
});

module.exports = router;
