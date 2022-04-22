let searchForm = $("#search")
let searchInput = searchForm.find("input")

searchForm.on("submit", (e) => {
    e.preventDefault()
    let searchText = searchInput.val()
    console.log(searchText)
    api.send("get", searchText)

    api.on("r-get", (products) => {
        products.forEach(product => {
            console.log(product)
        })
    })
})