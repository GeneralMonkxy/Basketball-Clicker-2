let points = 0;
let pointsPerClick = 1;
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let prestigeCost = 1000;
let prestigeMultiplier = 1;

window.onload = function() {
    if (localStorage.getItem("points")) {
        points = parseInt(localStorage.getItem("points"));
    }
    if (localStorage.getItem("pointsPerClick")) {
        pointsPerClick = parseInt(localStorage.getItem("pointsPerClick"));
    }
    if (localStorage.getItem("upgrade1Cost")) {
        upgrade1Cost = parseInt(localStorage.getItem("upgrade1Cost"));
    }
    if (localStorage.getItem("upgrade2Cost")) {
        upgrade2Cost = parseInt(localStorage.getItem("upgrade2Cost"));
    }
    if (localStorage.getItem("prestigeCost")) {
        prestigeCost = parseInt(localStorage.getItem("prestigeCost"));
    }
    if (localStorage.getItem("prestigeMultiplier")) {
        prestigeMultiplier = parseFloat(localStorage.getItem("prestigeMultiplier"));
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
    if (upgradeNumber === 1) {
        cost = upgrade1Cost;
        if (points >= cost) {
            points -= cost;
            pointsPerClick += 1;
            upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
            saveGameData();
            updateDisplay();
        }
    } else if (upgradeNumber === 2) {
        cost = upgrade2Cost;
        if (points >= cost) {
            points -= cost;
            pointsPerClick += 5;
            upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
            saveGameData();
            updateDisplay();
        }
    }
}

function prestige() {
    if (points >= prestigeCost) {
        points = 0;
        pointsPerClick = 1;
        prestigeMultiplier *= 1.5;
        prestigeCost = Math.floor(prestigeCost * 1.5);
        saveGameData();
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById("points").innerText = `Points: ${points}`;
    document.getElementById("multipliers").innerText = `Multipliers: ${prestigeMultiplier}x`;
    document.getElementById("upgrade1").innerText = `Upgrade 1 (Cost: ${upgrade1Cost})`;
    document.getElementById("upgrade2").innerText = `Upgrade 2 (Cost: ${upgrade2Cost})`;
    document.getElementById("prestige").innerText = `Prestige (Cost: ${prestigeCost})`;
}

function saveGameData() {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("upgrade1Cost", upgrade1Cost);
    localStorage.setItem("upgrade2Cost", upgrade2Cost);
    localStorage.setItem("prestigeCost", prestigeCost);
    localStorage.setItem("prestigeMultiplier", prestigeMultiplier);
}
