const router = require("express").Router();
const scrapper = require("../../scrappers/HCL/scrapperHCL");
const Job = require("../../models/Job");
const data = [];

router.get("/s12", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].nameOfJob || null,
        Category: jobs[i].sector || null,
        DatePosted: jobs[i].dateAdded || null,
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
      CompanyName: "HCL",
      DateScrap: Date.now(),
      UID: "hcl_12",
      Data: data,
    });
    console.log(newData)
    
  });
});

module.exports = router;
