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
  await driver.sleep(1000);
}

async function page1() {
  // print page title
  let title = await driver.getTitle();
  console.log(title);

  let text = await driver.findElement(webdriver.By.className('Selection reg'));
  await text.click();
  console.log(`"${await text.getText()}"`);
  await nextPage();
  page2();
}

async function page2() {
  let arr = await driver.findElements(webdriver.By.css("li"));
  /* for (let item of arr) {
    console.log(`"${await item.getText()}"`);
  }; */
  let selection = arr[arr.length - 1];
  console.log(`"${await selection.getText()}"`);
  await selection.click();
  await nextPage();
  page3();
}

async function page3() {
  await takeScreenshot();
  // let arr = await driver.findElements(webdriver.By.css("li"));
  /* for (let item of arr) {
    console.log(`"${await item.getText()}"`);
  }; */
  // let selection = arr[arr.length-1];
  // console.log(`"${await selection.getText()}"`);
  // await selection.click();
  // nextPage();
  // page3();
  await driver.quit();
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
    page2();
  } else if (progress == 83) {
    page3();
  } else {
    await driver.quit();
  }
}

main();
