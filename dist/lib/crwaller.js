"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawller = void 0;
const agent_1 = require("./agent");
const node_html_parser_1 = require("node-html-parser");
class Crawller {
    constructor() {
        this.agent = new agent_1.Agent({
            protocol: "https",
            hostname: "coupang.com",
        });
    }
    async searchProducts(productName) {
        let result = [];
        let html = await this.agent.getHTML("np/search", {
            q: productName,
        });
        let parser = (0, node_html_parser_1.parse)(html);
        let productDivs = parser.querySelectorAll(".search-product");
        productDivs.forEach(productDiv => {
            result.push({
                name: productDiv.querySelector(".name").innerText,
                price: productDiv.querySelector(".price-value").innerText
            });
        });
        return result;
    }
}
exports.crawller = new Crawller();
//# sourceMappingURL=crwaller.js.map