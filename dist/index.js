"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const windows_1 = require("./lib/windows");
const crawler_1 = require("./lib/crawler");
const crawler = new crawler_1.Crawler();
let windowManager = new windows_1.WindowManager();
electron_1.app.whenReady()
    .then(() => {
    windowManager.showMainWindow();
})
    .catch((err) => {
    crawler.quit()
        .then(() => {
        electron_1.app.quit();
    });
});
electron_1.app.on("window-all-closed", (e) => {
    crawler.quit()
        .then(() => {
        electron_1.app.quit();
    })
        .catch(err => {
        throw err;
    });
});
electron_1.ipcMain.on("get", (e, option) => {
    crawler.searchProducts(option)
        .then(products => {
        e.reply("r-get", products);
    });
});
//# sourceMappingURL=index.js.map