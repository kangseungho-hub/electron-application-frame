const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            ipcRenderer.send(channel, data)
        },
        on: (channel, func) => {
            ipcRenderer.on(channel, func)
        },
        loadPlayList : () => {
            console.log()
        }
    }
)
