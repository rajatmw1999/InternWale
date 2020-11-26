const puppeteer = require('puppeteer');

async function scraper (){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('article.jobTuple.bgWhite.br4.mb-8');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                jobJson.name = job.querySelector('a.title.fw500.ellipsis').innerText;
                jobJson.location = job.querySelector('li.location span').innerText;
                jobJson.description=job.querySelector('div.job-description').innerText;
                
                var link=job.querySelector('a.title.fw500.ellipsis')
                jobJson.link= link.getAttribute('href')
                jobJson.company="ICICI"
                }
              catch (exception){
      
              }
              jobs.push(jobJson);
            });
          return jobs;
        });

        let lastChar=url.charAt(url.length-1)
        if(lastChar=='s'){
            let nexturl= "https://www.naukri.com/icici-prudential-jobs-2"
            return jobData.concat(await extractJobs(nexturl));
        }else{
            let num= parseInt(url.substring(url.lastIndexOf('-')+1));
            if(num==10){
                return jobData;
            }
            let nexturl='https://www.naukri.com/icici-prudential-jobs-'.concat(num+1);
            return jobData.concat(await extractJobs(nexturl))
        }
        
        
      }
    
    
      const browser = await puppeteer.launch();
      
      const url="https://www.naukri.com/icici-prudential-jobs"
    
      const jobData= await extractJobs(url)
      // console.log(jobData)
      await browser.close();
      return jobData;
}

module.exports=scraper;
