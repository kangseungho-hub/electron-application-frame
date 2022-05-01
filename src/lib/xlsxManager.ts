import path = require("path")
import * as xlsx from "xlsx"

type ExcelFileOption = {
    name : string,
    path : string,
}

export class ExcelFileGenerator{
    constructor(){
        
    }

    static createTempWithJson(jsonData:Object[]){
        let newBook = xlsx.utils.book_new()
        let sheet = xlsx.utils.json_to_sheet(jsonData)
        
        xlsx.utils.book_append_sheet(newBook, sheet)

        xlsx.writeFile(newBook, path.join(__dirname, "../../output/temp.xlsx"))
    }
}


