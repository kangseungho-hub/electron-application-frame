const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, message:Object) => {
            ipcRenderer.send(channel, message)
        },
        on: (channel, func) => {
            ipcRenderer.on(channel, func)
        },
    }
)
