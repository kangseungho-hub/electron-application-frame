import {Agent } from "./agent"
import {parse } from "node-html-parser"
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export type searchOption ={
    text : string,
    delay : number
}

export class Crawler {
    agent : Agent
    constructor() {
        this.agent = new Agent("https","coupang.com")
    }

    async searchProducts(option:searchOption):Promise<Object[]>{
        let result = []

        let page = 1
        while (true) {
            let html = await this.agent.getHTML("np/search", {
                q: option.text,
                page : page,
            })
    
            let parser = parse(html)

            let productDivs = parser.querySelectorAll(".search-product")
            if(productDivs.length == 0){
                break;
            }

            productDivs.forEach(productDiv => {
                result.push({
                    name: productDiv.querySelector(".name").innerText,
                    price: productDiv.querySelector(".price-value").innerText
                })
            })    

            
            let nextPage = parser.querySelector(".search-pagination .selected+a")
            if(nextPage){
                page += 1
                await delay(option.delay)
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
