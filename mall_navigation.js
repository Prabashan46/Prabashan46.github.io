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
