import {Builder, By, Key, until, ThenableWebDriver} from "selenium-webdriver"
import path = require("path")

export class Agent {
    driver: ThenableWebDriver
    protocol : "http" | "https"
    hostname : string

    constructor(protocol:"http" | "https", hostname : string) {
        this.protocol = protocol
        this.hostname = hostname


        this.driver = new Builder().forBrowser("firefox").build()
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
