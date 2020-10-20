let logo_big = document.querySelector("#logo-big")
let death_star = document.querySelector("#death-star")
let body = document.querySelector("body")
let main = document.querySelector("main")

let home_page_container = document.querySelector("#home-page-container")
let events_page_container = document.querySelector("#events-page-container")
let comments_page_container = document.querySelector("#comments-page-container")

let sections = document.querySelectorAll("section")
let home_tags = document.querySelectorAll(".home-tag")
let events_tag = document.querySelector(".events-tag")
let comments_tag = document.querySelector(".comments-tag")

let slider = document.querySelector("#slider")
let slider_images = document.querySelectorAll("#slider img")
let prev_arrow = document.querySelector("#slider-button-prev")
let next_arrow = document.querySelector("#slider-button-next")

let countdownText = document.querySelector("#countdown")


document.addEventListener("scroll", scroll);

for (let home_tag of home_tags) {
    home_tag.addEventListener("click", showHome)
}
events_tag.addEventListener("click", showEvents)
comments_tag.addEventListener("click", showComments)

prev_arrow.addEventListener("click", prevPic)
next_arrow.addEventListener("click", nextPic)
slider.addEventListener("animationend", cleanAnimations)

countdown()

function scroll(){
    logo_big.style.marginBottom = -document.documentElement.scrollTop/3 + "px";
    death_star.style.marginBottom = document.documentElement.scrollTop/3 + "px";
    body.style.backgroundPositionY = document.documentElement.scrollTop/1.5 + "px";
    main.style.backgroundPositionY = document.documentElement.scrollTop/1.5 + "px";
}

function hidePages(){
    for (let section of sections) {
        section.classList.add("hidden")
    }
}
function showHome(){
    hidePages()
    home_page_container.classList.remove("hidden")
}
function showEvents(){
    hidePages()
    events_page_container.classList.remove("hidden")
}
function showComments(){
    hidePages()
    comments_page_container.classList.remove("hidden")
}

function prevPic(){
    let lastNode = slider.removeChild(slider.children[slider.children.length-1])
    slider.insertBefore(lastNode, slider.children[0])
    // slider.classList.remove("sliderClickedLeft")
    slider.classList.add("sliderClickedLeft")

    prev_arrow.removeEventListener("click", prevPic)
    next_arrow.removeEventListener("click", nextPic)
    // clean()
}
function nextPic(){
    let firstNode = slider.removeChild(slider.children[0])
    slider.appendChild(firstNode)
    slider.classList.add("sliderClickedRight")

    prev_arrow.removeEventListener("click", prevPic)
    next_arrow.removeEventListener("click", nextPic)
    // slider.style.setProperty("animation", "sliderRight 0.7s linear")
    // slider.style.animation = "sliderRight 0.7s linear"
}
function cleanAnimations(){
    slider.classList.remove("sliderClickedLeft")
    slider.classList.remove("sliderClickedRight")

    prev_arrow.addEventListener("click", prevPic)
    next_arrow.addEventListener("click", nextPic)
}

function countdown(){
    let finalDate = new Date("May 4, 2021 12:00:00").getTime()
    let interval = setInterval(function(){
        let now = new Date().getTime()
        let difference = finalDate-now

        let days = Math.floor(difference / (1000 * 60 * 60 * 24))
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((difference % (1000 * 60)) / 1000)

        countdownText.innerHTML = "only "+days+" days and "+hours+":"+minutes+":"+seconds+" hs to go!"

        if (difference < 0){
            clearInterval(interval)
            countdown.innerHTML = "May the 4th be with you.."
        }
    }, 1000)
}