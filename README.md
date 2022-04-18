# electron-application-frame

Electron으로 application을 개발하다 보면 프로젝트를 시작할 때 항상 반복되는 부분들을 확장성 고려해서 심플하게 구현.


- setupWebPack(config.js)
    - setup style, css, scss preProcessor

- create browser (main browser)

- send ipcRenderer through contextBridge as 'api'

- create window controll button (백엔드와 contextBridge로 넘긴 api로 백엔드와 ipc통신으로 백엔드에서 browser Window method로 작동)



-scripts
    -start : start electron application
    -dev : watch webpack
