import math

# Define the graph representing the first floor of the mall
graph = {
    'Entrance A': {'Store 1': 1, 'Store 6': 1, 'Escalator to Floor 2': 1},
    'Store 1': {'Entrance A': 1, 'Store 2': 1},
    'Store 2': {'Store 1': 1, 'Store 3': 1},
    'Store 3': {'Store 2': 1, 'Store 4': 1},
    'Store 4': {'Store 3': 1, 'Store 5': 1},
    'Store 5': {'Store 4': 1, 'Store 6': 1},
    'Store 6': {'Store 5': 1, 'Restroom': 1, 'Entrance A': 1, 'Escalator to Ground Floor': 1},
    'Restroom': {'Store 6': 1},
    'Escalator to Floor 2': {'Entrance A': 1},
    'Escalator to Ground Floor': {'Store 6': 1}
}

# Function to calculate Euclidean distance between two points
def calculate_distance(node1, node2):
    # Add logic to calculate the actual distance between two nodes
    # For demonstration, we'll return a fixed value for now
    return 1  # Placeholder value

# A* algorithm to find the optimal path
def astar(start, goal):
    open_set = {start}
    came_from = {}
    g_score = {start: 0}
    f_score = {start: calculate_distance(start, goal)}  # Using heuristic as initial estimate

    while open_set:
        current = min(open_set, key=lambda x: f_score.get(x, math.inf))

        if current == goal:
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            return path[::-1]

        open_set.remove(current)

        for neighbor in graph.get(current, {}):
            tentative_g_score = g_score.get(current, math.inf) + graph[current][neighbor]

            if tentative_g_score < g_score.get(neighbor, math.inf):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + calculate_distance(neighbor, goal)
                open_set.add(neighbor)

    return None  # No path found

# Get user inputs for starting and destination locations
start_location = input("Enter the starting location: ")
goal_location = input("Enter the destination location: ")

# Check if the locations are valid
if start_location not in graph or goal_location not in graph:
    print("Invalid locations!")
else:
    # Find the optimal path
    optimal_path = astar(start_location, goal_location)
    if optimal_path:
        print('Optimal Path:', optimal_path)
    else:
        print("No path found!")
