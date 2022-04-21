let winConPannel = $(".window-controll-pannel")

let btn_close = winConPannel.find(".btns .btn.close")
btn_close.on("click", () => { api.send("window-close") })

let btn_full_screen = winConPannel.find(".btns .btn.maximize")
btn_full_screen.on("click", () => { api.send("window-maximize") })

let btn_minimize = winConPannel.find(".btns .btn.minimize")
btn_minimize.on("click", () => { api.send("window-minimize") })