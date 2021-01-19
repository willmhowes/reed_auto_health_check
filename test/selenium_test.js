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

async function page1() {
  await driver.get(`${process.env.URL}`);
  let title = await driver.getTitle();
  console.log(title);
  await driver.sleep(1000);

  let text = await driver.findElement(webdriver.By.className('Selection reg'));
  await text.click();
  console.log(await text.getText());
  const data = await driver.takeScreenshot();
  await promisify(writeFile)('screenshot.png', data, 'base64');
  await driver.quit();
}

page1();
