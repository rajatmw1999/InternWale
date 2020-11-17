const puppeteer = require('puppeteer');

async function scraper(){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url,{waitUntil:"networkidle2"});
        
        // console.log(url)
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('div.coveo-result-cell.content-wrap');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {

                  jobJson.name=job.querySelector('div.coveo-result-cell > h3').innerText;
                  jobJson.location = job.querySelector('div.coveo-result-row:nth-child(4) div.coveo-result-cell span.CoveoFieldValue > span').innerText;
                  jobJson.category = job.querySelector('div.coveo-result-row:nth-child(5) div.coveo-result-cell span.CoveoFieldValue > span').innerText;
      
                  jobJson.description = job.querySelector('div.coveo-result-row:nth-child(3) div.coveo-result-cell span.CoveoFieldValue > span').innerText;
                  jobJson.link= job.querySelector('div.coveo-result-cell > h3 > a').getAttribute('href')
              }
              catch (exception){
      
              }
              jobs.push(jobJson);
            });
          return jobs;
        });
    
        
        
      let str= url.substring(url.indexOf('#')+1);
        if(str.charAt(0)=='t'){
            let nextUrl= "https://jobs.intel.com/page/show/search-results#".concat("first=10&").concat("t=Jobs&sort=relevancy&layout=table&f:@countryfullname=[India]&f:@careerstage=[Entry%20Level,Experienced%20Hire]")
            return jobData.concat(await extractJobs(nextUrl))
          }else{
            let sub= parseInt(str.substring(str.indexOf('=')+1,str.indexOf('&')))+10;
            if(sub>310){
                return jobData
            }else{
                let nextUrl="https://jobs.intel.com/page/show/search-results#first=".concat(sub).concat("t=Jobs&sort=relevancy&layout=table&f:@countryfullname=[India]&f:@careerstage=[Entry%20Level,Experienced%20Hire]")
                return jobData.concat(await extractJobs(nextUrl))
            }
          }
        
      
      }
    
    
      const browser = await puppeteer.launch();
      
      
      const url="https://jobs.intel.com/page/show/search-results#t=Jobs&sort=relevancy&layout=table&f:@countryfullname=%5BIndia%5D&f:@careerstage=%5BEntry%20Level,Experienced%20Hire%5D"
      
    
      const jobData= await extractJobs(url)
      console.log(jobData)
      await browser.close();
}

module.exports=scraper;

