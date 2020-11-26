const puppeteer = require('puppeteer');

async function scraper(){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('div.information');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {

                  jobJson.name=job.querySelector('a > div.job-title > span').innerText;
                  jobJson.location = job.querySelector('p.job-info span.job-location').innerText;
      
                  jobJson.description = job.querySelector('p.job-description.au-target').innerText;

                  jobJson.link= job.querySelector('a').getAttribute('href')
                  jobJson.company="Cognizant"
              }
              catch (exception){
      
              }
              jobs.push(jobJson);
            });
          return jobs;
        });
    
        
        if(jobData.length<1){
            return jobData
          }
          //next url to call
          else{
            let str= url.substring(url.indexOf('?')+1);
            let nextUrl;
            if(str.charAt(0)=='m'){
              nextUrl= "https://careers.cognizant.com/global/en/search-results?".concat("from=50&s=1&").concat("m=3&location=Chennai%2C%20Tamil%20Nadu%2C%20India")
            }else{
              let sub= parseInt(str.substring(str.indexOf('=')+1,str.indexOf('&')));
              nextUrl="https://careers.cognizant.com/global/en/search-results?from=".concat(sub+50).concat("&s=1&m=3&location=Chennai%2C%20Tamil%20Nadu%2C%20India");
            }
            return jobData.concat(await extractJobs(nextUrl))
          }
      
      }
    
    
      const browser = await puppeteer.launch(); 
      const url="https://careers.cognizant.com/global/en/search-results?m=3&location=Chennai%2C%20Tamil%20Nadu%2C%20India"
      
    
      const jobData= await extractJobs(url)
      // console.log(jobData)
      await browser.close();
       return jobData;
}
module.exports=scraper
