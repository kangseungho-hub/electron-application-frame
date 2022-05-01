import {app, ipcMain} from 'electron'
import {WindowManager}  from './src/lib/windows'
import {Crawler, searchOption} from "./src/lib/crawler"
import {ExcelFileGenerator} from "./src/lib/xlsxManager"
const crawler = new Crawler()
let windowManager = new WindowManager()

app.whenReady()
    .then(() => {
        windowManager.showMainWindow()
    })
    .catch((err) => {
        crawler.quit()
        .then(() => {
            app.quit()
        })
    })

app.on("window-all-closed", (e) => {
    crawler.quit()
    .then(() => {
        app.quit()
    })
    .catch(err => {
        throw err
    })
})

ipcMain.on("search", (e, option:searchOption) => {
    crawler.searchItems(option)
    .then(items => {
        ExcelFileGenerator.createTempWithJson(items)
        e.reply("r-search",items)
    })
    .catch(err => {
        e.reply("err-search", err)
    })
})

