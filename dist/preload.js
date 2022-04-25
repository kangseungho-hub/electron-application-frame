const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("api", {
    send: (channel, message) => {
        ipcRenderer.send(channel, message);
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, func);
    },
});
//# sourceMappingURL=preload.js.map