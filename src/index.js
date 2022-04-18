const {app, ipcMain} = require("electron")
const {windowManager} = require("./lib/windows")

global.ipcMain = ipcMain

app.whenReady()
.then(() => {
    windowManager.showMainWindow()
})

app.on("window-all-closed", (e) => {
    app.quit()
})
