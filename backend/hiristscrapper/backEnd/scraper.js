const puppeteer = require('puppeteer');

async function scraper() {

            async function autoScroll(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = 100;
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
                
                            if(totalHeight >= scrollHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, 100);
                    });
                });
            }
        
            const extractJobs= async()=>{
        
                let jobData = await page.evaluate(() => {
        
                    let jobs = [];
                      
                      let jobElms = document.querySelectorAll('div.job-description.col-sm-9.col-xl-9');
                
                      jobElms.forEach((job) => {
                        let jobJson = {};
                        try {
                            jobJson.name = job.querySelector('div.job-title a').innerText;
                            jobJson.location = job.querySelector('div.job-fields span.show-tooltip.dark_grey').innerText;
                            jobJson.company = job.querySelector('div.job-fields span.dark_grey.align-title').innerText;
                            jobJson.experience = job.querySelector('div.job-fields span.dark_grey.col-year').innerText;
                            jobJson.posted = job.querySelector('div.job-fields span.original.dark_grey').innerText;
                            jobJson.category="Backend Developer";
        
                            jobJson.link="https://www.hirist.com".concat(job.querySelector('div.job-title a').getAttribute('href'));
                
                        }
                        catch (exception){
                
                        }
                        jobs.push(jobJson);
                      });
                    return jobs;
                    
                  });
                  return jobData
        
            }
        
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
        
          await page.goto('https://www.hirist.com/c/filter/backend-developer-jobs-in-any%20location-1-0-1-0-1.html?ref=topnavigation',{waitUntil:"networkidle2"});
        
        
            // await autoScroll(page);
        
          let jobs=await extractJobs()
        
        //   console.log(jobs)
        //   console.log(jobs.length);
          await browser.close();
        
           return jobs;
}

module.exports= scraper;
