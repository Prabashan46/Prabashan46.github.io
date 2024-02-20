// Function to update navigation instructions based on selected locations
function updateNavigationInstructions(from, to) {
    var instructions = "";
    var targetDistance = 2; // Target distance to walk in meters

    // Update instructions based on selected locations
    if (from === "Entrance" && to === "Room1") {
        instructions = "Walk straight ahead for " + targetDistance + " meters.";
    }

    document.getElementById("instructions").innerText = instructions;

    // Reset distance walked when navigation instructions change
    distanceWalked = 0;
    document.getElementById("distanceWalked").innerText = "Distance Walked: 0 meters";

    // Reset turn verification flags
    leftTurnDetected = false;
    rightTurnDetected = false;
    turnVerified = false;
    initialBeta = null; // Reset initialBeta for accurate left turn detection
}

// Update navigation instructions when dropdown values change
document.getElementById("from").addEventListener("change", function() {
    var from = this.value;
    var to = document.getElementById("to").value;
    updateNavigationInstructions(from, to);
});

document.getElementById("to").addEventListener("change", function() {
    var from = document.getElementById("from").value;
    var to = this.value;
    updateNavigationInstructions(from, to);
});

// Initialize variables for distance tracking
var distanceWalked = 0;
var isWalking = false;
var walkingThreshold = 1.0; // Adjust the threshold as needed
var lastAcceleration = { x: 0, y: 0, z: 0 };

// Initialize variables for gyroscope data
var turnThreshold = 45; // Adjust the threshold as needed

// Initialize variables for turn detection and verification
var leftTurnDetected = false;
var rightTurnDetected = false;
var turnVerified = false;
var initialBeta = null; // Initialize initialBeta as null

// Track user's movements and update distance walked
window.addEventListener("devicemotion", function(event) {
    if (isWalking) {
        // Calculate delta acceleration
        var acceleration = event.acceleration;
        var deltaAcceleration = Math.abs(acceleration.x - lastAcceleration.x) + 
                                 Math.abs(acceleration.y - lastAcceleration.y) +
                                 Math.abs(acceleration.z - lastAcceleration.z);

        // Check if the user has walked the initial 2 meters
        if (!initialBeta && distanceWalked >= 2) {
            initialBeta = event.rotationRate.beta;
            document.getElementById("instructions").innerText = "Turn left.";
        }

        // Check if the user has turned left and the turn has been verified
        if (leftTurnDetected && !rightTurnDetected && turnVerified) {
            // Increment distance walked if acceleration exceeds threshold
            if (deltaAcceleration >= walkingThreshold) {
                distanceWalked += 0.01; // Incremental distance (adjust as needed)
                document.getElementById("distanceWalked").innerText = "Distance Walked: " + distanceWalked.toFixed(2) + " meters";
            }
        }

        // Check if the user has turned left
        if (initialBeta && !leftTurnDetected && Math.abs(event.rotationRate.beta - initialBeta) >= turnThreshold) {
            leftTurnDetected = true;
            document.getElementById("instructions").innerText = "You have turned left. Walk straight for another 2 meters.";
        }

        // Check if the user has turned right after the left turn instruction
        if (leftTurnDetected && !rightTurnDetected && Math.abs(event.rotationRate.beta - initialBeta) <= -turnThreshold) {
            rightTurnDetected = true;
            document.getElementById("instructions").innerText = "You have turned right. Please turn left.";
        }

        // Check if the user has walked the additional 2 meters after turning left
        if (leftTurnDetected && !rightTurnDetected && distanceWalked >= 4 && !turnVerified) {
            // Stop tracking distance until turn is verified
            isWalking = false;
            turnVerified = true;
        }

        lastAcceleration = acceleration;
    }
});

// Function to start navigation
function startNavigation() {
    isWalking = true; // Set isWalking to true when navigation starts
    walkingStartTime = Date.now();
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    updateNavigationInstructions(from, to);
}
