"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawler = void 0;
const agent_1 = require("./agent");
const node_html_parser_1 = require("node-html-parser");
const electron_1 = require("electron");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let CRAWLER_ACTIVE = false;
class Crawler {
    constructor() {
        this.agent = new agent_1.Agent("https", "coupang.com");
    }
    async searchItems(option) {
        let result = [];
        let page = 1;
        electron_1.ipcMain.on("interrupt-search", () => {
            CRAWLER_ACTIVE = false;
        });
        CRAWLER_ACTIVE = true;
        while (CRAWLER_ACTIVE) {
            console.log(CRAWLER_ACTIVE);
            let html = await this.agent.getHTML("np/search", {
                q: option.text,
                page: page,
            });
            let parser = (0, node_html_parser_1.parse)(html);
            let productDivs = parser.querySelectorAll(".search-product");
            //crawling종료 조건1
            //현재 page에 상품이 없다면
            if (productDivs.length == 0) {
                break;
            }
            productDivs.forEach(productDiv => {
                let nameDiv = productDiv.querySelector(".name");
                let priceDiv = productDiv.querySelector(".price-value");
                //product스킵
                //price value혹은 name가 없는 경우 제외(확인된 상품 : 중고, )
                if (nameDiv && priceDiv) {
                    result.push({
                        name: nameDiv.innerText,
                        price: priceDiv.innerText
                    });
                }
            });
            let nextPage = parser.querySelector(".search-pagination .selected+a");
            //crawling종료 조건 2.
            //다음 page가 없는 경우
            if (nextPage) {
                page += 1;
                if (option.delay != 0) {
                    await delay(option.delay);
                }
            }
            else {
                break;
            }
        }
        return result;
    }
    quit() {
        return this.agent.quit();
    }
}
exports.Crawler = Crawler;
