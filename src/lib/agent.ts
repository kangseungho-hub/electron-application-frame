import {Builder, By, Key, until, ThenableWebDriver, Options} from "selenium-webdriver"
import chrome = require("selenium-webdriver/chrome")
import firefox = require("selenium-webdriver/firefox")
import path = require("path")


export class Agent {
    driver: ThenableWebDriver
    protocol : "http" | "https"
    hostname : string

    constructor(protocol:"http" | "https", hostname : string) {
        this.protocol = protocol
        this.hostname = hostname


        this.driver = this.initialDriver()
    }

    initialDriver():ThenableWebDriver{
        let browserSize = {width : 1080, height : 720}

        let chromeOption = new chrome.Options().windowSize(browserSize)
        let firefoxOption = new firefox.Options().windowSize(browserSize)

        return new Builder()
        .setChromeOptions(chromeOption)
        .setFirefoxOptions(firefoxOption)
        .forBrowser("chrome")
        .build()
    }

    get baseURL():string{
        return `${this.protocol}://${this.hostname}`
    }

    deleteCookies(){
        this.driver.manage().deleteAllCookies()
    }

    async openPage(_path:string, params:Object) {
        await this.deleteCookies()
        let url = path.join(this.baseURL, _path)

        if (params) {
            url += `?`
        }

        for (const [key, value] of Object.entries(params)) {
            url += `&${key}=${value}`
        }

        await this.driver.get(url)
    }

    getHTML(_path:string, params:Object):Promise<string>{
        return new Promise((resolve, reject) => {
            this.openPage(_path, params)
                .then(() => {
                    const html = this.driver.findElement(By.tagName("html")).getAttribute("innerHTML")

                    resolve(html)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    quit(){
        return this.driver.quit()
    }
}
