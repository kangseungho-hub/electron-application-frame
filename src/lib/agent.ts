import {Builder, By, WebDriver, until} from "selenium-webdriver"
import {WebDriverError, NoSuchWindowError} from "selenium-webdriver/lib/error"

const fs = require("fs")
const chrome = require("selenium-webdriver/chrome")
import path = require("path")

export type hostOption = {
    protocol : "http" | "https",
    hostname : string,
}

export class Agent {
    _driver: WebDriver
    protocol : "http" | "https"
    hostname : string

    constructor(option : hostOption) {
        this.protocol = option.protocol
        this.hostname = option.hostname


        this._driver = this.initialDriver()

        let outputPath = path.join(__dirname, "../../output")

        if(!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath)
        }
    }

    get driver():WebDriver{
        return this._driver
    }

    get baseURL():string{
        return `${this.protocol}://${this.hostname}`
    }

    initialDriver():WebDriver{
        let browserSize = {width : 1080, height : 720}
        
        let service = new chrome.ServiceBuilder(getChromeDriverPath()).build()
        chrome.setDefaultService(service)

        let chromeOption = new chrome.Options().windowSize(browserSize)

        return new Builder()
        .setChromeOptions(chromeOption)
        .forBrowser("chrome")
        .build()
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

    quit(){
        return this.driver.quit()
    }
}

function getChromeDriverPath():string{
    let chromeDriver_build_path = path.join(__dirname, "../../../drivers/chromedriver.exe")
    let chromeDriver_dev_path = path.join(__dirname, "../../drivers/chromedriver.exe")

    if(fs.existsSync(chromeDriver_dev_path)){
        return chromeDriver_dev_path
    }else if(fs.existsSync(chromeDriver_build_path)){
        return chromeDriver_build_path
    }
}