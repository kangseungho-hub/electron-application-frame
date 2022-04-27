const { modalmanager } = require("./modal")

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

    let searchOption = {
        text: searchText,
        delay: searchDelay,
    }
    api.send("search", searchOption)

    placeHolder.hide()
    crawlingLoader.show()
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

        result.show()
        crawlingLoader.hide()
    })

    api.on("err-search", (e, err) => {
        if (err) {
            modalmanager.showErrorModal(err.message, () => {
                crawlingLoader.hide()
                placeHolder.show()
            })
        }
    })
})