# electron-application-frame

Electron으로 application을 개발하다 보면 프로젝트를 시작할 때 항상 반복되는 부분들을 확장성 고려해서 심플하게 구현.

- webpack config
- package.json scripts
- create browser (main browser)
- send ipcRenderer through contextBridge as 'api'
- create window controll button (with backend's BrowserWindow controll method)

