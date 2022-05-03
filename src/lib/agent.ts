import {Builder, By, WebDriver} from "selenium-webdriver"
import {WebDriverError, NoSuchWindowError} from "selenium-webdriver/lib/error"

const fs = require("fs")
const chrome = require("selenium-webdriver/chrome")
import path = require("path")


export class Agent {
    _driver: WebDriver
    protocol : "http" | "https"
    hostname : string

    constructor(protocol:"http" | "https", hostname : string) {
        this.protocol = protocol
        this.hostname = hostname


        this._driver = this.initialDriver()

        let outputPath = path.join(__dirname, "../../output")

        if(!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath)
        }
    }

    get driver():WebDriver{
        return this._driver
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
                    let error = new Error()
                    error.message = "알 수 없는 오류가 발생했습니다."

                    //webdriver를 사용할 수 없는 경우, browser를 종료했을 확률이 높음.
                    if(err instanceof WebDriverError || err instanceof NoSuchWindowError){
                        error.message = "크롬 드라이버가 사용 불가능합니다. 프로그램을 재시작하고 브라우저를 닫지 마세요"
                    }
                    reject(error)
                })
        })
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