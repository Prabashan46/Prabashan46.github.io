// Define the graph representing the first floor of the mall
const graph = {
    'Entrance A': { 'Store 1': 1, 'Store 6': 1 },
    'Store 1': { 'Entrance A': 1, 'Store 2': 1 },
    'Store 2': { 'Store 1': 1, 'Store 3': 1 },
    'Store 3': { 'Store 2': 1, 'Store 4': 1 },
    'Store 4': { 'Store 3': 1, 'Store 5': 1 },
    'Store 5': { 'Store 4': 1, 'Store 6': 1 },
    'Store 6': { 'Store 5': 1, 'Restroom': 1, 'Escalator to Floor 2': 1, 'Escalator to Ground Floor': 1 },
    'Restroom': { 'Store 6': 1 },
    'Escalator to Floor 2': { 'Store 6': 1 },
    'Escalator to Ground Floor': { 'Store 6': 1 }
};

// Function to calculate Euclidean distance between two points
function calculateDistance(node1, node2) {
    // Add logic to calculate the actual distance between two nodes
    // For example, you could use coordinates or other real-world data
    // For demonstration, we'll return a fixed value for now
    return 1; // Placeholder value
}

// A* algorithm to find the optimal path
function astar(start, goal) {
    const openSet = [start];
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    gScore[start] = 0;
    fScore[start] = calculateDistance(start, goal); // Using heuristic as initial estimate

    while (openSet.length > 0) {
        let current = openSet[0];
        let currentIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (fScore[openSet[i]] < fScore[current]) {
                current = openSet[i];
                currentIndex = i;
            }
        }

        if (current === goal) {
            let path = [current];
            while (cameFrom[current]) {
                current = cameFrom[current];
                path.push(current);
            }
            return path.reverse();
        }

        openSet.splice(currentIndex, 1);

        for (let neighbor in graph[current]) {
            let tentativeGScore = gScore[current] + graph[current][neighbor];

            if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + calculateDistance(neighbor, goal);
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return null; // No path found
}

// Example usage
const startLocation = 'Entrance A';
const goalLocation = 'Restroom';
const optimalPath = astar(startLocation, goalLocation);
console.log('Optimal Path:', optimalPath);
