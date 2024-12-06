let points = 0;
let pointsPerClick = 1;
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let upgrade3Cost = 200;
let upgrade4Cost = 1000;
let prestigeCost = 100000;
let prestigeMultiplier = 1;

// Store which upgrades have been purchased
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let upgrade3Purchased = false;
let upgrade4Purchased = false;

window.onload = function() {
    if (localStorage.getItem("points")) {
        points = parseInt(localStorage.getItem("points"));
    }
    if (localStorage.getItem("pointsPerClick")) {
        pointsPerClick = parseInt(localStorage.getItem("pointsPerClick"));
    }
    if (localStorage.getItem("prestigeMultiplier")) {
        prestigeMultiplier = parseFloat(localStorage.getItem("prestigeMultiplier"));
    }

    // Check if upgrades were purchased
    if (localStorage.getItem("upgrade1Purchased") === "true") {
        upgrade1Purchased = true;
        document.getElementById("upgrade2").style.display = "block";
    }
    if (localStorage.getItem("upgrade2Purchased") === "true") {
        upgrade2Purchased = true;
        document.getElementById("upgrade3").style.display = "block";
    }
    if (localStorage.getItem("upgrade3Purchased") === "true") {
        upgrade3Purchased = true;
        document.getElementById("upgrade4").style.display = "block";
    }

    updateDisplay();
};

function clickBasketball() {
    points += pointsPerClick;
    saveGameData();
    updateDisplay();
}

function buyUpgrade(upgradeNumber) {
    let cost = 0;
    if (upgradeNumber === 1 && points >= upgrade1Cost) {
        points -= upgrade1Cost;
        pointsPerClick += 1;
        upgrade1Purchased = true;
        localStorage.setItem("upgrade1Purchased", "true");
        document.getElementById("upgrade2").style.display = "block";
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);  // Increase the cost for next purchase
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 2 && points >= upgrade2Cost) {
        points -= upgrade2Cost;
        pointsPerClick += 5;
        upgrade2Purchased = true;
        localStorage.setItem("upgrade2Purchased", "true");
        document.getElementById("upgrade3").style.display = "block";
        upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 3 && points >= upgrade3Cost) {
        points -= upgrade3Cost;
        pointsPerClick += 10;
        upgrade3Purchased = true;
        localStorage.setItem("upgrade3Purchased", "true");
        document.getElementById("upgrade4").style.display = "block";
        upgrade3Cost = Math.floor(upgrade3Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 4 && points >= upgrade4Cost) {
        points -= upgrade4Cost;
        pointsPerClick += 20;
        upgrade4Purchased = true;
        upgrade4Cost = Math.floor(upgrade4Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
}

function prestige() {
    if (points >= prestigeCost) {
        points = 0;
        pointsPerClick = 1;
        prestigeMultiplier *= 1.5;
        prestigeCost = Math.floor(prestigeCost * 2.5); // Increase the cost with each prestige
        saveGameData();
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById("points").innerText = `Points: ${points}`;
    document.getElementById("multipliers").innerText = `Multipliers: ${prestigeMultiplier}x`;
    document.getElementById("upgrade1").innerText = `Michael Jordan (Cost: ${upgrade1Cost})`;
    document.getElementById("upgrade2").innerText = `LeBron James (Cost: ${upgrade2Cost})`;
    document.getElementById("upgrade3").innerText = `Kobe Bryant (Cost: ${upgrade3Cost})`;
    document.getElementById("upgrade4").innerText = `Stephen Curry (Cost: ${upgrade4Cost})`;
    document.getElementById("prestige").innerText = `Prestige (Cost: ${prestigeCost})`;
}

function saveGameData() {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("prestigeMultiplier", prestigeMultiplier);
}

