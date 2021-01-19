require('dotenv').config()
const { writeFile } = require('fs');
const { promisify } = require('util');

var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var firefox = require('selenium-webdriver/firefox');

var options = new firefox.Options();
options.addArguments("-headless");

var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();

// CONSTANTS
const PAGE1_PERCENT = 0;
const PAGE2_PERCENT = 50;
const PAGE3_PERCENT = 83;

function findPercentComplete(source) {
  let re = /<div class="ProgressBarFill" style="width: (\d{1,3})%">/;
  let result = re.exec(source);
  return result[1];
}

async function takeScreenshot() {
  const data = await driver.takeScreenshot();
  await promisify(writeFile)('screenshot.png', data, 'base64');
}

async function nextPage() {
  await driver.findElement(webdriver.By.name("NextButton")).click();
  await driver.sleep(1000);
}

async function page1() {
  // print page title
  let title = await driver.getTitle();
  console.log(title);

  // TODO: abstract "li" element search from page2 and page3 into
  // a function and deploy said function in page1
  let text = await driver.findElement(webdriver.By.className('Selection reg'));
  await text.click();
  console.log(`Consent: "${await text.getText()}"`);
  await nextPage();
  page2();
}

async function page2() {
  let arr = await driver.findElements(webdriver.By.css("li"));
  /* for (let item of arr) {
    console.log(`"${await item.getText()}"`);
  }; */
  let selection = arr[arr.length - 1];
  console.log(`Circumstances: "${await selection.getText()}"`);
  await selection.click();
  await nextPage();
  page3();
}

async function page3() {
  let arr = await driver.findElements(webdriver.By.css("li"));
  /* for (let item of arr) {
    console.log(`"${await item.getText()}"`);
  }; */
  let selection = arr[arr.length-1];
  console.log(`Symptoms: "${await selection.getText()}"`);
  await selection.click();
  await nextPage();
  await driver.quit();
}

async function main() {
  // load page
  await driver.get(`${process.env.URL}`);
  await driver.sleep(1000);

  // verify survey is incomplete
  // TODO: in order to avoid throwing an error, consider investigating
  // children of "id=Questions" which I suspect loads on every page
  let end = await driver.findElement(webdriver.By.id("EndOfSurvey"));
  if (end) {
    console.log("Survey is already complete!");
    await driver.quit();
  } else {
    // determine progress
    let progress = 0;
    let source = await driver.getPageSource();
    progress = findPercentComplete(source);
    console.log(`Survey Completeness: ${progress}%`);

    // activate form completion
    if (progress == PAGE1_PERCENT) {
      page1();
    } else if (progress == PAGE2_PERCENT) {
      page2();
    } else if (progress == PAGE3_PERCENT) {
      page3();
    } else {
      console.log("Percent Complete Unrecognized! Contact Developer");
      await driver.quit();
    }
  }
}

main();
