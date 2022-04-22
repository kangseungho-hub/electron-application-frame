import { app, ipcMain} from 'electron';
import { WindowManager } from './lib/windows';
import { Crawler } from "./lib/crawler"

let windowManager = new WindowManager()

app.whenReady()
    .then(() => {
        windowManager.showMainWindow()
    })

app.on("window-all-closed", (e) => {
    app.quit()
})

