import {app, ipcMain} from 'electron'
import {WindowManager}  from './lib/windows'
import {Crawler, searchOption} from "./lib/crawler"

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

ipcMain.on("get", (e, option:searchOption) => {
    crawler.searchProducts(option)
    .then(products => {
        e.reply("r-get",products)
    })
})

