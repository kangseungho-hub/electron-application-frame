const {BrowserWindow}  = require("electron")
const path = require("path")

const mainWindowConfig = {
    width : 1080,
    height : 720,
    show : false,
    frame : false,
    webPreferences : {
        preload : path.join(__dirname, "../preload.js")
    }
}

class WindowManager{
    constructor(){
        this.mainWindow = undefined
    }

    createMainWindow(config){
        this.mainWindow = new BrowserWindow(mainWindowConfig)
        
        this.mainWindow.loadFile("../views/index.html")

        ipcMain.on("window-close", () => { 
            this.mainWindow.close()
        })

        ipcMain.on("window-minimize", () => {
            this.mainWindow.minimize()
        })

        ipcMain.on("window-maximize", () => {
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

exports.windowManager = new WindowManager()