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

driver.get('http://www.google.com').then(function () {
  driver.findElement(webdriver.By.name('q'))
      .sendKeys('webdriver', webdriver.Key.ENTER).then(function () {
    driver.sleep(1000).then(function () {
      driver.getTitle().then(function (title) {
        console.log(title)
        if (title === 'webdriver - Google Search') {
          console.log('Test passed');
        } else {
          console.log('Test failed');
        }
        driver.quit();
      });
    });
  });
});
