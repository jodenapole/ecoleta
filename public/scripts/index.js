const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", item => {
    modal.classList.remove("hide")
})

close.addEventListener("click", item => {
    modal.classList.add("hide")
})


