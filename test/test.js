'use strict'
require('dotenv').config()
const Browser = require('zombie');

/* describe('Request google.com', function () {
    const browser = new Browser();

    before(function () {
        return browser.visit('http://www.google.com');
    });

    it('Should have correct links', function (done) {
        const links = browser.queryAll('a');
        for (var link of links) {
            console.log("\n");
            console.dir(browser.text(link));
            console.dir(link.href);
        }
        done();
    });

}); */

describe('Request reed testing site', function () {
    const browser = new Browser();

    before(function () {
        return browser.visit(`${process.env.URL}`);
    });

    it('should load title', function(done) {
        browser.assert.text('title', 'Reed College COVID-19 Daily Health Check');
        done();
    });

    it('list items', function(done) {
        const list = browser.queryAll('li');
        console.log(list);
        for (var item of list) {
            console.log("\n");
            console.dir(browser.text(item));
        }
        done();
        // browser.selectOption
    });

    it('list browser.source', function(done) {
        console.log(browser.source);
        done();
    });

    it('list user.agent', function(done) {
        // console.log(browser.resources.request[0]);
        console.log(browser.resources.response.status);
        done();
    });

});
