let points = 0;
let pointsPerClick = 1;
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let upgrade3Cost = 200;
let upgrade4Cost = 1000;
let upgrade5Cost = 5000;
let prestigeCost = 100000;
let prestigeMultiplier = 1;

// Store which upgrades have been purchased
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let upgrade3Purchased = false;
let upgrade4Purchased = false;
let upgrade5Purchased = false;

// Auto clicker variables
let coaches = {
    philJackson: { cost: 100, pointsPerSec: 1, purchased: false },
    patRiley: { cost: 500, pointsPerSec: 5, purchased: false },
    redAuerbach: { cost: 2500, pointsPerSec: 20, purchased: false },
    greggPopovich: { cost: 10000, pointsPerSec: 50, purchased: false },
    docRivers: { cost: 25000, pointsPerSec: 100, purchased: false },
    steveKerr: { cost: 100000, pointsPerSec: 200, purchased: false } // New Coach
};

// Players (with Bill Russell added)
let players = [
    { name: 'Michael Jordan', cost: 10, pointsPerClick: 1 },
    { name: 'Kobe Bryant', cost: 50, pointsPerClick: 5 },
    { name: 'LeBron James', cost: 200, pointsPerClick: 10 },
    { name: 'Bill Russell', cost: 1000, pointsPerClick: 25 } // Bill Russell added
];

// Player and Coach state tracking
let currentPlayerIndex = 0;
let currentCoachIndex = 0;

// Point Bank variables
let bankBalance = 0;
let interestRate = 0.5;

// Function to generate points from coaches
function generateAutoPoints() {
    for (const coach in coaches) {
        if (coaches[coach].purchased) {
            points += coaches[coach].pointsPerSec;
        }
    }
    saveGameData();
    updateDisplay();
}

// Function to deposit points into the point bank
function depositPoints() {
    if (points > 0) {
        bankBalance += points;
        points = 0;
        updateBankDisplay();
    }
}

// Function to withdraw points from the point bank
function withdrawPoints() {
    points += bankBalance;
    bankBalance = 0;
    updateBankDisplay();
    saveGameData();
}

// Function to update the point bank and interest
function updateBankDisplay() {
    document.getElementById('bank-amount').innerText = Math.round(bankBalance); // Round up
    document.getElementById('interest-rate').innerText = `${interestRate.toFixed(2)}%`;

    // Increase interest rate based on the amount in the bank
    interestRate = 0.5 + (bankBalance / 1000000); // Increase interest rate as bank balance grows
    bankBalance += Math.round(bankBalance * (interestRate / 100)); // Round up the bank balance
}

// Function to handle the prestige system
function prestige() {
    if (points >= prestigeCost) {
        points = 0;
        pointsPerClick = 1;
        prestigeMultiplier *= 1.5;
        prestigeCost = Math.floor(prestigeCost * 1.5); // Scaling up prestige cost
        saveGameData();
        updateDisplay();
    }
}

// Function to update the display of points and multipliers
function updateDisplay() {
    document.getElementById("points").innerText = `Points: ${points}`;
    document.getElementById("multipliers").innerText = `Multipliers: ${prestigeMultiplier}x`;

    // Show the current player and coach
    if (currentPlayerIndex < players.length) {
        document.getElementById("player").innerText = `${players[currentPlayerIndex].name} (Cost: ${players[currentPlayerIndex].cost})`;
    }

    if (currentCoachIndex < Object.keys(coaches).length) {
        document.getElementById("coach").innerText = `${Object.keys(coaches)[currentCoachIndex]} (Cost: ${coaches[Object.keys(coaches)[currentCoachIndex]].cost})`;
    }

    // Update bank display
    updateBankDisplay();
}

// Save the game data to local storage
function saveGameData() {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("prestigeMultiplier", prestigeMultiplier);

    localStorage.setItem("upgrade1Purchased", upgrade1Purchased);
    localStorage.setItem("upgrade2Purchased", upgrade2Purchased);
    localStorage.setItem("upgrade3Purchased", upgrade3Purchased);
    localStorage.setItem("upgrade4Purchased", upgrade4Purchased);
    localStorage.setItem("upgrade5Purchased", upgrade5Purchased);

    localStorage.setItem("currentPlayerIndex", currentPlayerIndex);
    localStorage.setItem("currentCoachIndex", currentCoachIndex);

    localStorage.setItem("bankBalance", bankBalance);
    localStorage.setItem("interestRate", interestRate);
}

// Load game data from local storage
window.onload = function() {
    if (localStorage.getItem("points")) points = parseInt(localStorage.getItem("points"));
    if (localStorage.getItem("pointsPerClick")) pointsPerClick = parseInt(localStorage.getItem("pointsPerClick"));
    if (localStorage.getItem("prestigeMultiplier")) prestigeMultiplier = parseFloat(localStorage.getItem("prestigeMultiplier"));
    if (localStorage.getItem("bankBalance")) bankBalance = parseFloat(localStorage.getItem("bankBalance"));
    if (localStorage.getItem("interestRate")) interestRate = parseFloat(localStorage.getItem("interestRate"));
    
    if (localStorage.getItem("currentPlayerIndex")) currentPlayerIndex = parseInt(localStorage.getItem("currentPlayerIndex"));
    if (localStorage.getItem("currentCoachIndex")) currentCoachIndex = parseInt(localStorage.getItem("currentCoachIndex"));

    // Load upgrades (none in this simplified version)
    updateDisplay();

    // Start generating points from coaches every second
    setInterval(generateAutoPoints, 1000);
};

// Click the basketball to earn points
function clickBasketball() {
    points += pointsPerClick;
    saveGameData();
    updateDisplay();
}

// Buy player upgrades
function buyPlayer() {
    let player = players[currentPlayerIndex];
    if (points >= player.cost) {
        points -= player.cost;
        pointsPerClick += player.pointsPerClick;
        currentPlayerIndex++;
        saveGameData();
        updateDisplay();
    }
}

// Buy coach upgrades
function buyCoach() {
    let coach = Object.keys(coaches)[currentCoachIndex];
    if (points >= coaches[coach].cost) {
        points -= coaches[coach].cost;
        coaches[coach].purchased = true;
        currentCoachIndex++;
        saveGameData();
        updateDisplay();
    }
}

// Buy player upgrades (Upgrade button click logic)
function buyUpgrade(upgradeNumber) {
    if (upgradeNumber === 1 && points >= upgrade1Cost) {
        points -= upgrade1Cost;
        pointsPerClick += 1;
        upgrade1Purchased = true;
        localStorage.setItem("upgrade1Purchased", "true");
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 2 && points >= upgrade2Cost) {
        points -= upgrade2Cost;
        pointsPerClick += 5;
        upgrade2Purchased = true;
        localStorage.setItem("upgrade2Purchased", "true");
        upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 3 && points >= upgrade3Cost) {
        points -= upgrade3Cost;
        pointsPerClick += 10;
        upgrade3Purchased = true;
        localStorage.setItem("upgrade3Purchased", "true");
        upgrade3Cost = Math.floor(upgrade3Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 4 && points >= upgrade4Cost) {
        points -= upgrade4Cost;
        pointsPerClick += 20;
        upgrade4Purchased = true;
        localStorage.setItem("upgrade4Purchased", "true");
        upgrade4Cost = Math.floor(upgrade4Cost * 1.5);
        saveGameData();
        updateDisplay();
    }
    else if (upgradeNumber === 5 && points >= upgrade5Cost) {
        points -= upgrade5Cost;
        pointsPerClick += 50;
        upgrade5Purchased = true;
        localStorage.setItem("upgrade5Purchased", "true");
        saveGameData();
        updateDisplay();
    }
}

