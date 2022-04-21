import { Agent } from "./agent"
import { parse } from "node-html-parser"

export class Crawler {
    agent : Agent
    constructor() {
        this.agent = new Agent("https","coupang.com")
    }

    async searchProducts(productName):Promise<any[]>{
        let result = []

        let html = await this.agent.getHTML("np/search", {
            q: productName,
        })

        let parser = parse(html)

        let productDivs = parser.querySelectorAll(".search-product")

        productDivs.forEach(productDiv => {
            result.push({
                name: productDiv.querySelector(".name").innerText,
                price: productDiv.querySelector(".price-value").innerText
            })
        })

        return result
    }
}
