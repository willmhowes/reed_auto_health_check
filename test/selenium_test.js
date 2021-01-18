require('dotenv').config()

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

driver.get(`${process.env.URL}`).then(function () {
  driver.sleep(1000).then(function () {
    driver.getTitle().then(function (title) {
      console.log(title)
    });
    driver.findElement(webdriver.By.className('Selection reg'))
        .getText().then(function (text) {
      console.log(text);
      driver.quit();
    });
  });
});
