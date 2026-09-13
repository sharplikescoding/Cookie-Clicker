// Grab the button and display elements from the HTML so we can use them in JS
let cookieButton = document.getElementById("cookieButton")
let cookieDisplay = document.getElementById("cookieDisplay")

// Grab the upgrade buttons
let upgradeClicker = document.getElementById("upgradeClicker")
let autoClicker = document.getElementById("autoClicker")

// Tracks how many cookies the player currently has
let cookies = 0
let multiplier = 1
let multiplierCost = 25
let autoClickers = 0
let autoClickerCost = 15

// Updates the on-screen text to show the current cookie count
function cookieDisplayAmt() {
    cookieDisplay.innerText = `You have ` + Math.floor(cookies) + ` cookies`
}

// Save current progress to localStorage
function saveGame() {
    localStorage.setItem("cookies", cookies)
    localStorage.setItem("multiplier", multiplier)
    localStorage.setItem("autoClickers", autoClickers)
}

// Load saved progress when the page first loads
function loadGame() {
    if (localStorage.getItem("cookies")) {
        cookies = Number(localStorage.getItem("cookies"))
        multiplier = Number(localStorage.getItem("multiplier"))
        autoClickers = Number(localStorage.getItem("autoClickers"))
        cookieDisplayAmt()
    }
}

// Wipe all progress: Cmd + Option + R
document.addEventListener('keydown', function(event) {
    if (event.metaKey && event.altKey && event.code === 'KeyR') {
        event.preventDefault()   // stops the browser from doing anything weird with this combo
        localStorage.clear()
        cookies = 0
        multiplier = 1
        multiplierCost = 25
        autoClickers = 0
        autoClickerCost = 15
        cookieDisplayAmt()
        upgradeClicker.innerText = 'Upgrade Clicks/s for ' + Math.floor(multiplierCost) + ' cookies'
        autoClicker.innerText = 'Buy auto-clicker for ' + Math.floor(autoClickerCost) + ' cookies'
        alert('Data wiped!')
    }
})

loadGame() // run once when the script first loads, to restore progress

// Runs every time the cookie button is clicked
cookieButton.addEventListener('click', function(){
    cookies += multiplier
    cookieDisplayAmt()
    saveGame()
    const clickSound = new Audio("341695__projectsu012__coins-1.mp3");
    clickSound.play()
})

// Runs every time the "upgrade clicker" button is clicked
upgradeClicker.addEventListener('click', function(){
    if (cookies >= multiplierCost) {
        cookies -= multiplierCost
        multiplier++
        multiplierCost *= 1.3
        cookieDisplayAmt()
        upgradeClicker.innerText = 'Upgrade Clicks/s for ' + Math.floor(multiplierCost) + ' cookies'
        saveGame()
    } else {
        alert("You don't have enough cookies to upgrade clicks/s")
    }
})

// Runs every time the "auto clicker" button is clicked
autoClicker.addEventListener('click', function(){
    if (cookies >= autoClickerCost) {
        autoClickers++
        cookies -= autoClickerCost
        autoClickerCost *= 1.3
        cookieDisplayAmt()
        autoClicker.innerText = 'Buy auto-clicker for ' + Math.floor(autoClickerCost) + ' cookies'
        saveGame()
    } else {
        alert("You don't have enough cookies to auto-clicker")
    }
})

// Passive income: adds cookies automatically based on how many auto-clickers you own
setInterval(function(){
    cookies += autoClickers * multiplier
    cookieDisplayAmt()
    saveGame()
}, 1000)
