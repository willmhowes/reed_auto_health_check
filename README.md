# Reed Daily Health Check Automator

This project is a **VERY** work-in-progress attempt to automate the submission of the Reed College Daily Health Check using Selenium WebDriver to automote the process.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project is written in Javascript and requires the [Node.js](https://nodejs.org/en/) runtime.

Firefox's [geckodriver](https://github.com/mozilla/geckodriver) must be installed and accessible in `PATH`. On Mac OS, I find the easiest way to do this is with [Homebrew](https://brew.sh/) because it handles the installation to `PATH` by default:

```
brew install geckodriver
```

For instructions regarding other operating systems or to avoid the use of Homebrew, see [here](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment#setting_up_selenium_in_node).

### Installing

This project is in **very** early in development and there is not much to replicate. That being said, here are some basic instructions:

1. Clone the project repo to your local machine

```
git clone https://github.com/willmhowes/crdv.git
```

2. Install dependencies

```
npm install
```

3. Create file called `.env` and add the url of the current day's health check so that the file looks as follows:

```
URL=https://example.com
```

4. Run script

```
npm run form
```

### Completed Features

- [x] User can run script that will complete the health check

### Next Steps

- [ ] Build a web interface
- [ ] Integrate Selenium API into web interface
- [ ] Place logic into an express backend (?)
- [ ] Scrape email for new health check link

## Built With

* [Node.js](https://nodejs.org/en/docs/) - Backend
* [NPM](https://docs.npmjs.com/) - Package manager
* [Selenium](https://www.selenium.dev/documentation/en/) - Browser automation API


## Authors

* **Will Howes** - [willmhowes](https://github.com/willmhowes)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [MDN Web Docs](https://developer.mozilla.org/en-US/)
* [Selenium devs](https://www.selenium.dev/)
