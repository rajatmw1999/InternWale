const router = require("express").Router();
const scrapper = require("../../scrappers/Genpact/scrapperGenpact");
const Job = require("../../models/Job");
const data = [];

router.get("/s11", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].nameOfJob || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].posted || null,
        Company: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "Genpact",
      DateScrap: Date.now(),
      UID: "genpact_11",
      Data: data,
    });
    console.log(newData)
    
  });
});

module.exports = router;
