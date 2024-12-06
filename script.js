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
};

// Point Bank variables
let bankBalance = 0;
let interestRate = 0.5;
let bankInterestInterval;
let bankInterestAmount = 0;

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
    document.getElementById('bank-amount').innerText = bankBalance;
    document.getElementById('interest-rate').innerText = `${interestRate.toFixed(2)}%`;

    // Increase interest rate based on the amount in the bank
    interestRate = 0.5 + (bankBalance / 1000000); // Increase interest rate as bank balance grows
    bankBalance += bankBalance * (interestRate / 100);
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

    // Show or hide buttons based on purchases
    if (upgrade1Purchased) document.getElementById("upgrade2").style.display = "block";
    if (upgrade2Purchased) document.getElementById("upgrade3").style.display = "block";
    if (upgrade3Purchased) document.getElementById("upgrade4").style.display = "block";
    if (upgrade4Purchased) document.getElementById("upgrade5").style.display = "block";
    if (upgrade5Purchased) document.getElementById("coach1").style.display = "block";

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

    localStorage.setItem("coach1Purchased", coaches.philJackson.purchased);
    localStorage.setItem("coach2Purchased", coaches.patRiley.purchased);
    localStorage.setItem("coach3Purchased", coaches.redAuerbach.purchased);
    localStorage.setItem("coach4Purchased", coaches.greggPopovich.purchased);
    localStorage.setItem("coach5Purchased", coaches.docRivers.purchased);

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

    // Load upgrades
    if (localStorage.getItem("upgrade1Purchased") === "true") upgrade1Purchased = true;
    if (localStorage.getItem("upgrade2Purchased") === "true") upgrade2Purchased = true;
    if (localStorage.getItem("upgrade3Purchased") === "true") upgrade3Purchased = true;
    if (localStorage.getItem("upgrade4Purchased") === "true") upgrade4Purchased = true;
    if (localStorage.getItem("upgrade5Purchased") === "true") upgrade5Purchased = true;

    // Load coaches
    coaches.philJackson.purchased = localStorage.getItem("coach1Purchased") === "true";
    coaches.patRiley.purchased = localStorage.getItem("coach2Purchased") === "true";
    coaches.redAuerbach.purchased = localStorage.getItem("coach3Purchased") === "true";
    coaches.greggPopovich.purchased = localStorage.getItem("coach4Purchased") === "true";
    coaches.docRivers.purchased = localStorage.getItem("coach5Purchased") === "true";

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

// Buy coach upgrades
function buyCoach(coachNumber) {
    if (coachNumber === 1 && points >= coaches.philJackson.cost) {
        points -= coaches.philJackson.cost;
        coaches.philJackson.purchased = true;
        localStorage.setItem("coach1Purchased", "true");
        document.getElementById("coach2").style.display = "block";
        saveGameData();
        updateDisplay();
    }
    else if (coachNumber === 2 && points >= coaches.patRiley.cost) {
        points -= coaches.patRiley.cost;
        coaches.patRiley.purchased = true;
        localStorage.setItem("coach2Purchased", "true");
        document.getElementById("coach3").style.display = "block";
        saveGameData();
        updateDisplay();
    }
    else if (coachNumber === 3 && points >= coaches.redAuerbach.cost) {
        points -= coaches.redAuerbach.cost;
        coaches.redAuerbach.purchased = true;
        localStorage.setItem("coach3Purchased", "true");
        document.getElementById("coach4").style.display = "block";
        saveGameData();
        updateDisplay();
    }
    else if (coachNumber === 4 && points >= coaches.greggPopovich.cost) {
        points -= coaches.greggPopovich.cost;
        coaches.greggPopovich.purchased = true;
        localStorage.setItem("coach4Purchased", "true");
        document.getElementById("coach5").style.display = "block";
        saveGameData();
        updateDisplay();
    }
    else if (coachNumber === 5 && points >= coaches.docRivers.cost) {
        points -= coaches.docRivers.cost;
        coaches.docRivers.purchased = true;
        localStorage.setItem("coach5Purchased", "true");
        saveGameData();
        updateDisplay();
    }
}

