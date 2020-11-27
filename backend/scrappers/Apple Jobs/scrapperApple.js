const puppeteer = require('puppeteer');

async function scraper (){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        const data = await page.evaluate(() => {
          const temp = [];
            const tbodies = document.getElementsByTagName("tbody");
            for(const tbody of tbodies){
              const nameOfJob = tbody.children[0].children[0].children[0].text;
              const link = tbody.children[0].children[0].children[0].href;
              const sector = tbody.children[0].children[0].children[1].textContent
              const publishedDate = tbody.children[0].children[0].children[2].textContent;
              const location = tbody.children[0].children[1].children[0].textContent;
              const id = (tbody.id).split("_")[1];
              document.querySelector(`button[data-section-id='${id}']`).click();
              const desc = document.querySelector(`p[id='role_description_${id}']`).children[0].textContent;
                const company="Apple";
              temp.push({nameOfJob,link,sector,publishedDate,location,desc,company});
            }
            return temp;
        });
      return data;
      }
    
    
      const browser = await puppeteer.launch({headless: false});
      
      const url="https://jobs.apple.com/en-in/search?location=india-INDC&page=1"
    
      const jobData= await extractJobs(url)
      await browser.close();
        return jobData;
}
scraper();
module.exports=scraper;
