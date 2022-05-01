"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelFileGenerator = void 0;
const path = require("path");
const xlsx = require("xlsx");
class ExcelFileGenerator {
    constructor() {
    }
    static createTempWithJson(jsonData) {
        let newBook = xlsx.utils.book_new();
        let sheet = xlsx.utils.json_to_sheet(jsonData);
        xlsx.utils.book_append_sheet(newBook, sheet);
        xlsx.writeFile(newBook, path.join(__dirname, "../../output/temp.xlsx"));
    }
}
exports.ExcelFileGenerator = ExcelFileGenerator;
