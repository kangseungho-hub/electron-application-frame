"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const windows_1 = require("./lib/windows");
let windowManager = new windows_1.WindowManager(electron_1.ipcMain);
electron_1.app.whenReady()
    .then(() => {
    windowManager.showMainWindow();
});
electron_1.app.on("window-all-closed", (e) => {
    electron_1.app.quit();
});
//# sourceMappingURL=index.js.map