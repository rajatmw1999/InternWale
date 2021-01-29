const router = require("express").Router();
const scrapper = require("../../scrappers/webDevelopment/scrapper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/h1", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 200) jobs.length = 200;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_engineering_webdevelopment",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Engineering",
          NameOfSubfield: "Web Development",
          JobsArr: data,
        },
      });
      Job.collection.deleteMany({"UID": "internshala_engineering_webdevelopment"});
      await newData.save();

      // console.log(newData);
      // console.log(newData.Data);

      res.redirect("/scrap/data/internshala/h2");
      console.log("Internshala Scrapped 1");
    });
});

module.exports = router;
