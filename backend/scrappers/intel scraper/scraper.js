const puppeteer = require('puppeteer');

async function scraper(){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url,{waitUntil:"load"});
        
        // console.log(url)
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('#search > div.row.row-no-padding > div.col-md-8 > div.coveo-main-section > section > div > div.CoveoResultList > div > div > div > div > div');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {

                  jobJson.name=job.querySelector('div:nth-child(1) > div > h3').innerText;
                  jobJson.location = job.querySelector('div:nth-child(4) > div > span > span').innerText;
      
                  jobJson.description = job.querySelector('div:nth-child(3) > div > span > span').innerText;
                  jobJson.link= job.querySelector('div:nth-child(1) > div > h3 > a').getAttribute('href');
                  jobJson.company="Intel"
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
      
      
      const url="https://jobs.intel.com/page/show/search-results#t=Jobs&sort=relevancy&layout=table&f:@countryfullname=%5BIndia%5D&f:@careerstage=%5BEntry%20Level,Experienced%20Hire%5D"
    
      const jobData= await extractJobs(url)
      await browser.close();
      return jobData;
}

module.exports=scraper;

