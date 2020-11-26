const puppeteer = require("puppeteer");
async function scrapperHCL() {
  let fullData = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.hcltech.com/careers/Careers-in-india`, {
    timeout: 0,
  });

  const data = await page.evaluate(
    () => {
      const temp = [];
      const tbodies = document.getElementsByTagName("tbody")[0].children;
      for (const tbody of tbodies) {
        const nameOfJob = tbody.children[0].children[0].text;
        const link = tbody.children[0].children[0].href;
        const location = tbody.children[2].innerText;
        const dateAdded = tbody.children[1].innerText;
        const expReq = tbody.children[3].innerText;
        const company= "HCL"
        temp.push({ nameOfJob, link, location, dateAdded, expReq, company});
      }
      return temp;
    },
    { timeout: 0 }
  );

  for (let j = 0; j < data.length; j++) {
    fullData.push(data[j]);
  }
  await browser.close();
  return fullData;
}
module.exports = scrapperHCL;
