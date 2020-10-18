let loader = document.querySelector(".loader")
let loaderBack = document.querySelector(".loader-back")
// loader.addEventListener("click", function(){click(unclick)})
loader.addEventListener("click", click)

function click(){
    loaderBack.classList.add("clicked")
    loader.removeEventListener("click", click)
    setTimeout(function(){
        loaderBack.classList.remove("clicked")
        loader.addEventListener("click", click)
    }, 3000)
}

// function unclick(){
//     setTimeout(function(){
//         loaderBack.classList.remove("clicked")
//     }, 4000)
// }