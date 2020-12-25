const router = require("express").Router();
const scrapper = require("../../scrappers/dataScience/scraper");
const Job = require("../../../../models/HiristJob");

router.get("/s5", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].posted || null,
        CompanyName: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].description || null,
        Location: jobs[i].location || null,
        ExpReq: jobs[i].experience || null
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      UID: "hirist_engineering_DataScience",
      PlatformName: "Hirist",
      DateScrap: Date.now(),
      TotalJobs: data.length,
      Data: {
        "NameOfField":"Engineering",
        "NameOfSubfield":"Data Science",
        "JobsArr":data
      },
    });
    await newData.save();

    // console.log(newData);
    // console.log(newData.Data);

    res.redirect('/scrap/data/hirist/s6');
    console.log("Hirist Scrapper 5");
  });
});

module.exports = router;
