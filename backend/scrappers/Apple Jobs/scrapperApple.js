const puppeteer = require('puppeteer');
async function scrapper(){
    let fullData = [];
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  let i = 1;
  while(i <= 3){
    await page.goto(`https://jobs.apple.com/en-in/search?location=india-INDC&page=${i}`,{timeout:0});
  
    await page.waitForSelector("tbody");
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
            temp.push({nameOfJob,link,sector,publishedDate,location,desc});
          }
          return temp;
      },{timeout:0});
      
      for(let j=0; j<data.length; j++){
          fullData.push(data[j]);
      }
      if(data !== undefined) i++;
  }
  await browser.close();
  return fullData;
}
module.exports = scrapper;