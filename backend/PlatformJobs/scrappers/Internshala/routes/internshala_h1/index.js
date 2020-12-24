const router = require("express").Router();
const scrapper = require("../../scrappers/webDevelopment/scrapper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/h1", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      //   console.log(jobs);
      //   for (let i = 0; i < jobs.length && i < 20; i++) {
      //     const new_job = jobs[i];
      //     data.push(new_job);
      //   }
      if (jobs.length > 20) jobs.length = 20;
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
      await newData.save();

      // console.log(newData);
      // console.log(newData.Data);

      // res.redirect("/scrap/data/hirist/s2");
      console.log("Internshala Scrapper 1");
    });
});

module.exports = router;
