const toExcel = $("#operation a.to-excel")
const { modalmanager } = require("./modal")

toExcel.on("click", (e) => {
    if (isEmpty($("#content .result"))) {
        e.preventDefault()
        modalmanager.showNoticeModal("아직 데이터가 없습니다", () => {

        })
    }
})

function isEmpty(el) {
    return !$.trim(el.html())
}