// ============================================
// GRAB ELEMENTS FROM THE HTML
// ============================================

// The cookie you click to earn cookies
let cookieButton = document.getElementById("cookieButton")

// The text showing your current cookie count
let cookieDisplay = document.getElementById("cookieDisplay")

// The button to upgrade your click multiplier
let upgradeClicker = document.getElementById("upgradeClicker")

// The button to buy an auto-clicker
let autoClicker = document.getElementById("autoClicker")

// The volume slider element itself (not just a one-time value!)
// We read its .value live, every time we need it, so dragging it
// actually changes the volume of future sounds.
let volumeSlider = document.getElementById("volume")


// ============================================
// GAME STATE (the numbers that change as you play)
// ============================================

let cookies = 0
let multiplier = 1
let multiplierCost = 25
let autoClickers = 0
let autoClickerCost = 15


// ============================================
// DISPLAY UPDATE
// ============================================

// Updates the on-screen text to show the current cookie count
function cookieDisplayAmt() {
    cookieDisplay.innerText = `You have ` + Math.floor(cookies) + ` cookies`
}


// ============================================
// SAVE / LOAD
// ============================================

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

loadGame() // run once when the script first loads, to restore progress


// ============================================
// WIPE SAVE DATA SHORTCUT: Cmd + Option + R
// ============================================

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


// ============================================
// EVENT LISTENERS
// ============================================

// Runs every time the cookie button is clicked
cookieButton.addEventListener('click', function(){
    cookies += multiplier
    cookieDisplayAmt()
    saveGame()

    const clickSound = new Audio("341695__projectsu012__coins-1.mp3")
    clickSound.volume = Number(volumeSlider.value)   // read the slider's CURRENT position
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


// ============================================
// PASSIVE INCOME LOOP
// ============================================

// Every second, add cookies automatically based on how many auto-clickers you own
setInterval(function(){
    cookies += autoClickers * multiplier
    cookieDisplayAmt()
    saveGame()
}, 1000)
