import {Agent } from "./agent"
import {parse } from "node-html-parser"
import {ipcMain} from "electron"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let CRAWLER_ACTIVE = false

export type searchOption ={
    text : string,
    delay : number
}

export class Crawler {
    agent : Agent
    constructor() {
        this.agent = new Agent("https","coupang.com")
    }

    async searchItems(option:searchOption):Promise<Object[]>{
        let result = []

        let page = 1


        ipcMain.on("interrupt-search", () => {
            CRAWLER_ACTIVE = false
        })

        CRAWLER_ACTIVE = true


        while (CRAWLER_ACTIVE) {
            console.log(CRAWLER_ACTIVE)
            let html = await this.agent.getHTML("np/search", {
                q: option.text,
                page : page,
            })
    
            let parser = parse(html)

            let productDivs = parser.querySelectorAll(".search-product")

            //crawling종료 조건1
            //현재 page에 상품이 없다면
            if(productDivs.length == 0){
                break;
            }

            productDivs.forEach(productDiv => {
                let nameDiv = productDiv.querySelector(".name")
                let priceDiv = productDiv.querySelector(".price-value")

                //product스킵
                //price value혹은 name가 없는 경우 제외(확인된 상품 : 중고, )
                if (nameDiv && priceDiv) {
                    result.push({
                        name: nameDiv.innerText,
                        price: priceDiv.innerText
                    });
                }
            })    

            
            let nextPage = parser.querySelector(".search-pagination .selected+a")

            //crawling종료 조건 2.
            //다음 page가 없는 경우
            if(nextPage){
                page += 1

                if(option.delay != 0){
                    await delay(option.delay)
                }
            }else{
                break;
            }
        }

        return result
    }

    quit(){
        return this.agent.quit()
    }
}