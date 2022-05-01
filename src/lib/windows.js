"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowManager = void 0;
const electron_1 = require("electron");
const path = require("path");
const mainWindowConfig = {
    width: 570,
    height: 980,
    show: false,
    frame: false,
    webPreferences: {
        preload: path.join(__dirname, "../preload.js")
    }
};
class WindowManager {
    constructor() {
        this.mainWindow = undefined;
    }
    createMainWindow(config) {
        this.mainWindow = new electron_1.BrowserWindow(config);
        this.mainWindow.loadFile(path.join(__dirname, "../../views/index.html"));
        electron_1.ipcMain.on("window-close", () => {
            this.mainWindow.close();
        });
        electron_1.ipcMain.on("window-minimize", () => {
            this.mainWindow.minimize();
        });
        electron_1.ipcMain.on("window-maximize", () => {
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
