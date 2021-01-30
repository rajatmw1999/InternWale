const express = require("express");
const router = express.Router();
const getJobs = require("./Helper");
const ShineIntern = require("../../models/ShineIntern");
const NaukriIntern = require("../../models/NaukriIntern");
const HiristJob = require("../../models/HiristJob");
const HiristIntern = require("../../models/HiristIntern");
const InternshalaIntern = require("../../models/InternshalaIntern");
const jobs = [];
router.post("/all/keyword", async (req, res) => {
  const keyword = req.body.keyword.toLowerCase();

  await getJobs(ShineIntern, null, keyword, jobs);
  await getJobs(NaukriIntern, null, keyword, jobs);

  await getJobs(HiristJob, "hirist_engineering_Backend", keyword, jobs);
  await getJobs(HiristJob, "hirist_engineering_DataScience", keyword, jobs);
  await getJobs(HiristJob, "hirist_engineering_DevOps", keyword, jobs);
  await getJobs(HiristJob, "hirist_engineering_Frontend", keyword, jobs);
  await getJobs(HiristIntern, "hirist_engineering_Internship", keyword, jobs);
  await getJobs(
    HiristJob,
    "hirist_engineering_MobileDevelopment",
    keyword,
    jobs
  );
  await getJobs(
    HiristJob,
    "hirist_engineering_ProjectManagement",
    keyword,
    jobs
  );

  await getJobs(
    InternshalaIntern,
    "internshala_accounts_AccountsAndFinance",
    keyword,
    jobs
  );

  await getJobs(
    InternshalaIntern,
    "internshala_content_contentWriting",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_dataandmachinelearning",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_graphicsandanimation",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_hardwareandindustry",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_HumanResources_HumanResources",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_Law_LawAndLegal",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_marketing_marketing",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_MechanicalEngineering",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_mobiledevelopment",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_others",
    keyword,
    jobs
  );
  await getJobs(
    InternshalaIntern,
    "internshala_engineering_webdevelopment",
    keyword,
    jobs
  );

  return res.status(200).json({
    jobs,
  });
});

module.exports = router;
