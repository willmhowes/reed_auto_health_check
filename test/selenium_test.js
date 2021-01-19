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
}

async function page1() {
  // print page title
  let title = await driver.getTitle();
  console.log(title);

  let text = await driver.findElement(webdriver.By.className('Selection reg'));
  await text.click();
  console.log(`"${await text.getText()}"`);
  nextPage();
}

async function main() {
  // load page
  await driver.get(`${process.env.URL}`);
  await driver.sleep(1000);

  // determine progress
  let progress = 0;
  let source = await driver.getPageSource();
  progress = findPercentComplete(source);
  console.log("Complete:", progress);

  // activate form completion
  if (progress == 0) {
    page1();
  } else if (progress == 50) {
    // page2();
  } else if (progress == 100) {
    // page3();
  }

  await driver.quit();
}

main();
