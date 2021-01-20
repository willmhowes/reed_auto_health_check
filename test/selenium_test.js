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

function findPercentComplete(html) {
  let re = /<div class="ProgressBarFill" style="width: (\d{1,3})%">/;
  let result = re.exec(html);
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

async function loadListItems() {
  let arr = await driver.findElements(webdriver.By.css("li"));
  /* for (let item of arr) {
    console.log(`"${await item.getText()}"`);
  }; */
  return arr;
}

async function page1() {
  let arr = await loadListItems();
  let selection = arr[0];
  console.log(`Consent: "${await text.getText()}"`);
  await selection.click();
  await nextPage();
  page2();
}

async function page2() {
  let arr = await loadListItems();
  let selection = arr[arr.length - 1];
  console.log(`Circumstances: "${await selection.getText()}"`);
  await selection.click();
  await nextPage();
  page3();
}

async function page3() {
  let arr = await loadListItems();
  let selection = arr[arr.length-1];
  console.log(`Symptoms: "${await selection.getText()}"`);
  await selection.click();
  await nextPage();
  await takeScreenshot();
  await driver.quit();
}

async function main() {
  // load page
  await driver.get(`${process.env.URL}`);
  await driver.sleep(1000);
  // print page title
  console.log(await driver.getTitle());
  // load html source
  let html_source = await driver.getPageSource();
  // test if survey is already complete
  let re = /id="EndOfSurvey"[\w\s-="]+class="END_OF_SURVEY[\w\s-="]+"/;
  let form_completed = re.test(html_source);

  if (form_completed) {
    console.log("Survey is already complete!");
    await driver.quit();
  } else {
    // determine form progression
    let progress = findPercentComplete(html_source);
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
