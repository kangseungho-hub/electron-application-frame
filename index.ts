import {app, ipcMain} from 'electron'
import {WindowManager}  from './src/lib/windows'
import {Crawler, searchOption} from "./src/lib/crawler"

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
    crawler.searchProducts(option)
    .then(item => {
        e.reply("r-search",item)
    })
    .catch(err => {
        e.reply("err-search", err)
    })
})

