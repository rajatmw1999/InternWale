const router = require("express").Router();
const scrapper = require("../../scrappers/Accenture/scrapperAccenture");
const Job = require("../../models/Job");
const data = [];

router.get("/s1", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].nameOfJob || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].description || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "Accenture",
      DateScrap: Date.now(),
      UID: "accenture_1",
      Data: data,
    });
    await newData.save();
    console.log(newData)
    
  });
});

module.exports = router;
