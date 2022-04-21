"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowManager = void 0;
const electron_1 = require("electron");
const path = require("path");
const mainWindowConfig = {
    width: 1080,
    height: 720,
    show: false,
    frame: false,
    webPreferences: {
        preload: path.join(__dirname, "../preload.js")
    }
};
class WindowManager {
    constructor(ipcMain) {
        this.mainWindow = undefined;
        this.ipcMain = ipcMain;
    }
    createMainWindow(config) {
        this.mainWindow = new electron_1.BrowserWindow(mainWindowConfig);
        this.mainWindow.loadFile("../views/index.html");
        this.ipcMain.on("window-close", () => {
            this.mainWindow.close();
        });
        this.ipcMain.on("window-minimize", () => {
            this.mainWindow.minimize();
        });
        this.ipcMain.on("window-maximize", () => {
            this.mainWindow.maximize();
        });
    }
    /** show main window */
    showMainWindow() {
        if (this.mainWindow == undefined) {
            this.createMainWindow(mainWindowConfig);
        }
        this.mainWindow.show();
    }
}
exports.WindowManager = WindowManager;
//# sourceMappingURL=windows.js.map