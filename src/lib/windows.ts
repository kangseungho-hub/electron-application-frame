import { BrowserWindow } from "electron"
import path = require("path")

const mainWindowConfig = {
    width : 1080,
    height : 720,
    show : false,
    frame : false,
    webPreferences : {
        preload : path.join(__dirname, "../preload.js")
    }
}


export class WindowManager{
    mainWindow:BrowserWindow
    ipcMain : NodeJS.EventEmitter
    constructor(ipcMain){
        this.mainWindow = undefined

        this.ipcMain = ipcMain
    }

    createMainWindow(config){
        this.mainWindow = new BrowserWindow(mainWindowConfig)
        
        this.mainWindow.loadFile("../views/index.html")

        this.ipcMain.on("window-close", () => { 
            this.mainWindow.close()
        })

        this.ipcMain.on("window-minimize", () => {
            this.mainWindow.minimize()
        })

        this.ipcMain.on("window-maximize", () => {
            this.mainWindow.maximize()
        })
    }
    
    /** show main window */
    showMainWindow(){
        if(this.mainWindow == undefined){
            this.createMainWindow(mainWindowConfig)
        }

        this.mainWindow.show()
    }
}
