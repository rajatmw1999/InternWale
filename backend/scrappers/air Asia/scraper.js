const puppeteer = require('puppeteer');

async function scraper () {
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('div.card.position-card.pointer');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                jobJson.name = job.querySelector('h5').innerText;
                jobJson.location = job.querySelector('p').innerText.trim();
                jobJson.type=job.querySelector('div.position-priority-container.line-clamp').innerText.trim();
                
                jobJson.link="https://airasia.eightfold.ai/careers?pid=1516857&location=Bengaluru%20-%20Alpha%203%2C%20India&domain=airasia.com"
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
      
      const url="https://airasia.eightfold.ai/careers?pid=1516857&location=Bengaluru%20-%20Alpha%203%2C%20India&domain=airasia.com"
    
      const jobData= await extractJobs(url)
      if(jobData.length==0){
          console.log("No jobs available");
      }
      else{
          console.log(jobData)
      }
        

      await browser.close();
}

module.exports=scraper;