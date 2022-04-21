"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const path = require("path");
const driver = new selenium_webdriver_1.Builder().forBrowser("firefox").build();
class Agent {
    constructor(protocol, hostname) {
        this.protocol = protocol;
        this.hostname = hostname;
        this.driver = new selenium_webdriver_1.Builder().forBrowser("firefox").build();
    }
    get baseURL() {
        return `${this.protocol}://${this.hostname}`;
    }
    async openPage(_path, params) {
        let url = path.join(this.baseURL, _path);
        if (params) {
            url += `?`;
        }
        for (const [key, value] of Object.entries(params)) {
            url += `${key}=${value}`;
        }
        await driver.get(url);
    }
    getHTML(_path, params) {
        return new Promise((resolve, reject) => {
            this.openPage(_path, params)
                .then(() => {
                const html = driver.findElement(selenium_webdriver_1.By.tagName("html")).getAttribute("innerHTML");
                resolve(html);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
exports.Agent = Agent;
//# sourceMappingURL=agent.js.map