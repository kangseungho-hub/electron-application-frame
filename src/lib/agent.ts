import {Builder, By, Key, untilm, ThenableWebdriver} from "selenium-webdriver"
import {parse} from "node-html-parser"
import {hostname} from "os"
const path = require("path")
const driver = new Builder().forBrowser("firefox").build()


export class Agent {
    driver:ThenableWebdriver
    protocol : "http" | "https"
    hostname : string

    constructor(protocol:"http" | "https", hostname : string) {
        this.protocol = protocol
        this.hostname = hostname


        this.driver = new Builder().forBrowser("firefox").build()
    }

    get baseURL():String{
        return `${this.protocol}://${this.hostname}`
    }

    async openPage(_path:String, params:Object) {
        let url = path.join(this.baseURL, _path)

        if (params) {
            url += `?`
        }

        for (const [key, value] of Object.entries(params)) {
            url += `${key}=${value}`
        }

        await driver.get(url)
    }

    getHTML(_path:String, params:Object):Promise<string>{
        return new Promise((resolve, reject) => {
            this.openPage(_path, params)
                .then(() => {
                    const html = driver.findElement(By.tagName("html")).getAttribute("innerHTML")

                    resolve(html)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
