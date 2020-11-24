const puppeteer = require('puppeteer');
async function scrapperBDO(){
    let fullData = [];
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  let i = 1;
  while(i <= 5){
    await page.goto(`https://www.bdo.in/en-gb/careers/jobs?level=1&page=${i}`,{timeout:0});
  
      const data = await page.evaluate(() => {
        const temp = [];
          const tbodies =  document.getElementsByClassName("SearchResult padded-content border-bottom");
          for(const tbody of tbodies){
            const nameOfJob = tbody.children[0].children[0].children[0].children[0].textContent
            const link = tbody.children[0].children[0].href;
            const locationAndDate = tbody.children[1].children[0].textContent;
            const location = locationAndDate.substr(locationAndDate.indexOf("-")+1);
            const company="BDO"
            temp.push({nameOfJob,link,location,company});
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
module.exports = scrapperBDO;
// scrapper().then((res) => console.log(res));
