const { modalmanager } = require("./modal")
const { toExcelBtn } = require("./operation")

let searchForm = $("#search")
let searchInput = searchForm.find("input")

let searchDelaySelection = $("#search-delay-value")

let result = $("#result-container .result")
let placeHolder = $("#result-container .place-holder")
let crawlingLoader = $("#result-container .crawling-loader-wrapper")

searchForm.on("submit", (e) => {
    e.preventDefault()
    let searchText = searchInput.val()
    let searchDelay = searchDelaySelection.val()

    if (searchInputIsInvalid(searchText)) {
        modalmanager.showNoticeModal("검색어가 유효하지 않습니다.")
        return
    }

    let searchOption = {
        text: searchText,
        delay: searchDelay,
    }
    api.send("search", searchOption)

    placeHolder.hide()
    showLoader()
    result.hide()

    api.on("r-search", (e, items) => {
        result.empty()

        items.forEach(item => {
            let itemDiv = $("<div class = 'item'></div>")

            let name = $(`<span class = "name">${item.name}</span>`)
            let price = $(`<span class = "price">${item.price}</span>`)

            itemDiv.append(name)
            itemDiv.append(price)

            result.append(itemDiv)
        })


        hideLoader()
        result.show()
    })

    api.on("err-search", (e, err) => {
        if (err) {
            modalmanager.showNoticeModal(err.message, () => {
                hideLoader()
                placeHolder.show()
            })
        }
    })
})

function showLoader() {
    crawlingLoader.css("display", "flex")

    console.log("show!")

    $(".interrupt").one("click", () => {
        console.log("stop!!")
        api.send("interrupt-search")
    })
}

function hideLoader() {
    crawlingLoader.hide()
}

function searchInputIsInvalid(text) {
    if (text) {
        return false
    }

    return true
}