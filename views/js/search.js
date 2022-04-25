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
    api.send("get", searchOption)

    placeHolder.hide()
    crawlingLoader.show()
    result.hide()

    api.on("r-get", (e, products) => {
        products.forEach(product => {
            let productDiv = $("<div class = 'product'></div>")

            let name = $(`<span class = "name">${product.name}</span>`)
            let price = $(`<span class = "price">${product.price}</span>`)

            productDiv.append(name)
            productDiv.append(price)

            result.append(productDiv)
        })

        result.show()
        crawlingLoader.hide()
    })
})