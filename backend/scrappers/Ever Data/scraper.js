const puppeteer = require('puppeteer');

async function scraper(){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('div.views-row.col-md-6');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                jobJson.name = job.querySelector('div.jobs-title').innerText;
                jobJson.experiance = job.querySelector('div.exp').innerText.trim();
                jobJson.vacancies=job.querySelector('div.nov').innerText.trim();
                
                let link=job.querySelector('div.offer-btn-vps');
                jobJson.link="https://www.everdata.com".concat(link.getAttribute('href'))
                 jobJson.company="Ever Data"
                }
              catch (exception){
      
              }
              jobs.push(jobJson);
            });
          return jobs;
        });
        return jobData;        
        
      }
    
    
      const browser = await puppeteer.launch();
      
      const url="https://www.everdata.com/jobs"
    
      const jobData= await extractJobs(url)
      // if(jobData.length==0){
      //     console.log("No jobs available");
      // }
      // else{
      //     console.log(jobData)
      // }
      await browser.close();
      return jobData
}
module.exports=scraper;
