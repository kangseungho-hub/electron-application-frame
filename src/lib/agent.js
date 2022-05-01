"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");
class Agent {
    constructor(protocol, hostname) {
        this.protocol = protocol;
        this.hostname = hostname;
        this.driver = this.initialDriver();
        let outputPath = path.join(__dirname, "../../output");
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
    }
    initialDriver() {
        let browserSize = { width: 1080, height: 720 };
        let service = new chrome.ServiceBuilder(path.join(__dirname, "../../drivers/chromedriver.exe")).build();
        chrome.setDefaultService(service);
        let chromeOption = new chrome.Options().windowSize(browserSize);
        return new selenium_webdriver_1.Builder()
            .setChromeOptions(chromeOption)
            .forBrowser("chrome")
            .build();
    }
    get baseURL() {
        return `${this.protocol}://${this.hostname}`;
    }
    deleteCookies() {
        this.driver.manage().deleteAllCookies();
    }
    async openPage(_path, params) {
        await this.deleteCookies();
        let url = path.join(this.baseURL, _path);
        if (params) {
            url += `?`;
        }
        for (const [key, value] of Object.entries(params)) {
            url += `&${key}=${value}`;
        }
        await this.driver.get(url);
    }
    getHTML(_path, params) {
        return new Promise((resolve, reject) => {
            this.openPage(_path, params)
                .then(() => {
                const html = this.driver.findElement(selenium_webdriver_1.By.tagName("html")).getAttribute("innerHTML");
                resolve(html);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    quit() {
        return this.driver.quit();
    }
}
exports.Agent = Agent;
