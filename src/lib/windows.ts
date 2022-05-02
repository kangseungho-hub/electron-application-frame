import { BrowserWindow, ipcMain} from "electron"
import path = require("path")

const mainWindowConfig = {
    width : 570,
    minWidth : 570,
    height : 980,
    minHeight : 980,
    show : false,
    frame : false,
    darkTheme : true,
    webPreferences : {
        preload : path.join(__dirname, "../preload.js")
    }
}


export class WindowManager{
    mainWindow:BrowserWindow
    ipcMain : NodeJS.EventEmitter
    constructor(){
        this.mainWindow = undefined
    }

    createMainWindow(config){
        this.mainWindow = new BrowserWindow(config)
        
        this.mainWindow.loadFile(path.join(__dirname, "../../views/index.html"))

        ipcMain.on("window-close", () => { 
            this.mainWindow.close()
        })

        ipcMain.on("window-minimize", () => {
            this.mainWindow.minimize()
        })

        ipcMain.on("window-maximize", () => {
            ipcMain.once("window-unmaximize", () => {
                this.mainWindow.unmaximize()
            })

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
