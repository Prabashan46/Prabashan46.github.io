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
var walkingThreshold = 1.0; // Adjust the threshold as needed (higher value to ignore small motions)
var walkingStartTime = null;
var lastAcceleration = { x: 0, y: 0, z: 0 };
var initialBeta = null; // Initial rotation rate around the beta axis
var orientationThreshold = 20; // Adjust the threshold as needed
var leftTurnDetected = false;

// Track user's movements and update distance walked
window.addEventListener("devicemotion", function(event) {
    if (isWalking) {
        // Calculate delta acceleration
        var acceleration = event.acceleration;
        var deltaAcceleration = Math.abs(acceleration.x - lastAcceleration.x) + 
                                 Math.abs(acceleration.y - lastAcceleration.y) +
                                 Math.abs(acceleration.z - lastAcceleration.z);

        // Increment distance walked if acceleration exceeds threshold
        if (deltaAcceleration >= walkingThreshold) {
            distanceWalked += 0.01; // Incremental distance (adjust as needed)
            document.getElementById("distanceWalked").innerText = "Distance Walked: " + distanceWalked.toFixed(2) + " meters";
        }

        lastAcceleration = acceleration;

        // Check if the user has walked the initial 2 meters
        if (distanceWalked >= 2 && initialBeta === null) {
            initialBeta = event.rotationRate.beta;
            document.getElementById("instructions").innerText = "Turn left and walk straight for another 2 meters.";
        }

        // Check if the user has turned left
        if (initialBeta !== null && !leftTurnDetected && event.rotationRate.beta <= initialBeta - orientationThreshold) {
            leftTurnDetected = true;
            document.getElementById("instructions").innerText = "Walk straight for another 2 meters.";
        }

        // Check if the user has walked the additional 2 meters after turning left
        if (leftTurnDetected && distanceWalked >= 4) {
            document.getElementById("instructions").innerText = "You have reached your destination.";
            isWalking = false; // Stop tracking distance
        }
    }
});

// Function to start navigation
function startNavigation() {
    isWalking = true;
    leftTurnDetected = false; // Reset left turn detection
    walkingStartTime = Date.now();
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    updateNavigationInstructions(from, to);
}
