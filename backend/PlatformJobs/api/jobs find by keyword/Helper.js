module.exports = async (company, UID, keyword, jobs) => {
  await company.find({ UID }, (err, found) => {
    if (err) return [];
    else {
      //   console.log(found[0].Data.JobsArr);
      const temp = found[0].Data.JobsArr.filter((job) =>
        job.Title.toLowerCase().includes(keyword)
      );
      temp.forEach((element) => {
        jobs.push(element);
      });
    }
  });
};
