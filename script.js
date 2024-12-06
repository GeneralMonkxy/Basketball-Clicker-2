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
    let depositAmount = parseInt(document.getElementById("deposit-amount").value);
    if (depositAmount > 0 && depositAmount <= points) {
        points -= depositAmount;
        bankBalance += depositAmount;
        updateBankDisplay();
        saveGameData();
    } else {
        alert("Invalid deposit amount!");
    }
}

// Function to withdraw points from the point bank
function withdrawPoints() {
    let withdrawAmount = parseInt(document.getElementById("withdraw-amount").value);
    if (withdrawAmount > 0 && withdrawAmount <= bankBalance) {
        points += withdrawAmount;
        bankBalance -= withdrawAmount;
        updateBankDisplay();
        saveGameData();
    } else {
        alert("Invalid withdrawal amount!");
    }
}

// Function to deposit the maximum amount possible (all points)
function depositMax() {
    if (points > 0) {
        bankBalance += points;
        points = 0;
        updateBankDisplay();
        saveGameData();
    }
}

// Function to withdraw the maximum amount possible (all bank balance)
function withdrawMax() {
    if (bankBalance > 0) {
        points += bankBalance;
        bankBalance = 0;
        updateBankDisplay();
        saveGameData();
    }
}

// Function to update the point bank and interest
function updateBankDisplay() {
    document.getElementById("bank-amount").innerText = `Bank Balance: ${bankBalance}`;
    document.getElementById("interest-rate").innerText = `Interest Rate: ${interestRate.toFixed(2)}%`;
    interestRate += bankBalance * 0.0001; // Interest rate increases slightly based on bank balance
}

// Function to update the display
function updateDisplay() {
    document.getElementById("points").innerText = `Points: ${points}`;
    document.getElementById("multipliers").innerText = `Multipliers: ${prestigeMultiplier}x`;
}

// Function to prestige and reset the game
function prestige() {
    if (points >= prestigeCost) {
        points = 0;
        prestigeMultiplier *= 1.5;
        prestigeCost = Math.floor(prestigeCost * 1.5);
        saveGameData();
        updateDisplay();
    }
}

// Function to buy a player
function buyPlayer() {
    if (currentPlayerIndex < players.length && points >= players[currentPlayerIndex].cost) {
        points -= players[currentPlayerIndex].cost;
        pointsPerClick += players[currentPlayerIndex].pointsPerClick;
        currentPlayerIndex++;
        updateDisplay();
        saveGameData();
    }
}

// Function to buy a coach
function buyCoach() {
    if (currentCoachIndex < Object.keys(coaches).length && points >= coaches[Object.keys(coaches)[currentCoachIndex]].cost) {
        points -= coaches[Object.keys(coaches)[currentCoachIndex]].cost;
        coaches[Object.keys(coaches)[currentCoachIndex]].purchased = true;
        currentCoachIndex++;
        updateDisplay();
        saveGameData();
    }
}

// Function to save the game data to localStorage
function saveGameData() {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("bankBalance", bankBalance);
    localStorage.setItem("interestRate", interestRate);
    localStorage.setItem("prestigeMultiplier", prestigeMultiplier);
    localStorage.setItem("currentPlayerIndex", currentPlayerIndex);
    localStorage.setItem("currentCoachIndex", currentCoachIndex);
}

// Function to load the game data from localStorage
window.onload = function() {
    if (localStorage.getItem("points")) {
        points = parseInt(localStorage.getItem("points"));
    }
    if (localStorage.getItem("pointsPerClick")) {
        pointsPerClick = parseInt(localStorage.getItem("pointsPerClick"));
    }
    if (localStorage.getItem("bankBalance")) {
        bankBalance = parseInt(localStorage.getItem("bankBalance"));
    }
    if (localStorage.getItem("interestRate")) {
        interestRate = parseFloat(localStorage.getItem("interestRate"));
    }
    if (localStorage.getItem("prestigeMultiplier")) {
        prestigeMultiplier = parseFloat(localStorage.getItem("prestigeMultiplier"));
    }
    if (localStorage.getItem("currentPlayerIndex")) {
        currentPlayerIndex = parseInt(localStorage.getItem("currentPlayerIndex"));
    }
    if (localStorage.getItem("currentCoachIndex")) {
        currentCoachIndex = parseInt(localStorage.getItem("currentCoachIndex"));
    }

    updateDisplay();
    updateBankDisplay();
    setInterval(generateAutoPoints, 1000); // Start auto points generation every second
};


