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


// ============================================
// GAME STATE (the numbers that change as you play)
// ============================================

let cookies = 0
let multiplier = 1
let multiplierCost = 25
let autoClickers = 0
let autoClickerCost = 15


// ============================================
// BACKGROUND MUSIC
// ============================================

// Set up the background music track
const bgMusic = new Audio("520554__deleted_user_11009121__lofi-loop-9.mp3")
bgMusic.loop = true       // repeat forever
bgMusic.volume = 0.3      // keep it quiet so it doesn't overpower click sounds

// Browsers allow audio to autoplay as long as it starts muted,
// so we start it muted right away on page load...
bgMusic.muted = true
bgMusic.play()

// ...then unmute it the very first time the player clicks anywhere.
// This is the closest thing to "plays immediately on load" that browsers allow.
document.addEventListener('click', function unmuteMusic() {
    bgMusic.muted = false
    document.removeEventListener('click', unmuteMusic) // only needs to run once
}, { once: true })


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
