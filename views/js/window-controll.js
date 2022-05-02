let winConPannel = $(".window-controll-pannel")

let btn_close = winConPannel.find(".btns .btn.close")
btn_close.on("click", () => { api.send("window-close") })

let btn_maximize = winConPannel.find(".btns .btn.maximize")
let btn_unmaximize = winConPannel.find(".btns .btn.unmaximize")
btn_maximize.on("click", () => {
    api.send("window-maximize")
    btn_maximize.hide()
    btn_unmaximize.css("display", "flex")
})

btn_unmaximize.on("click", () => {
    api.send("window-unmaximize")

    btn_maximize.css("display", "flex")
    btn_unmaximize.hide()
})

let btn_minimize = winConPannel.find(".btns .btn.minimize")
btn_minimize.on("click", () => { api.send("window-minimize") })