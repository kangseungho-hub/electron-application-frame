import {Agent, hostOption } from "./agent"
import {By, until, Locator} from "selenium-webdriver"
import {parse } from "node-html-parser"
import {ipcMain} from "electron"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let CRAWLER_ACTIVE = false

function querySelector(selector:string):Locator{
    return By.css(selector)
}

export type searchOption ={
    path : string,
    params : Object,
    text : string,
    delay : number
}


export class Crawler extends Agent{
    constructor(option:hostOption) {
        super(option)
    }

    async searchItems(option:searchOption):Promise<Object[]>{
        let result = []


        ipcMain.on("interrupt-search", () => {
            CRAWLER_ACTIVE = false
        })

        CRAWLER_ACTIVE = true

        let page = 1

        while (CRAWLER_ACTIVE) {
                await this.openPage(`/rankings/${page}`, option.params)
                await this.driver.wait(until.elementLocated(querySelector(".rankings-table")))
            
                
                let dAppAnchors = await this.driver.wait(until.elementsLocated(querySelector(".rankings-table > a")))
    
                for (const [_, anchor] of Object.entries(dAppAnchors)){
                    let column = await anchor.findElement(querySelector(".rankings-column__name"))
                    let name_ccy_div = await column.findElement(querySelector(":scope > div:nth-child(2)"));
    
                    let name = await name_ccy_div.findElement(querySelector(":scope > span")).getAttribute("innerText");
                    let ccys = await name_ccy_div.findElement(querySelector(":scope > div")).getAttribute("innerText")
    
                    result.push({
                        name,
                        ccys,
                    })
                }
    
                let pagesContainer= await this.driver.wait(until.elementLocated(querySelector(".rankings-table+div div")))
                let nextPage = await pagesContainer.findElement(querySelector(":scope>div+a"))
                
                if(nextPage){
                    page++;
                }else{
                    break;
                }
        }

        return result
    }

    quit(): Promise<void> {
        return super.quit()
    }
}