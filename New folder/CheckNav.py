# Define the graph representing the first floor of the mall
graph = {
    1: {7: 1, 2: 1},
    2: {1: 1, 3: 1},
    3: {2: 1, 4: 1},
    4: {3: 1, 5: 1},
    5: {4: 1, 6: 1},
    6: {5: 1, 7: 1},
    7: {6: 1, 8: 1, 9: 1, 10: 1},
    8: {7: 1},
    9: {7: 1},
    10: {7: 1}
}

# Heuristic function (estimated cost from node n to the goal)
heuristic = {
    1: 2,   # Entrance A
    2: 3,   # Store 1
    3: 3,   # Store 2
    4: 2,   # Store 3
    5: 1.5, # Store 4
    6: 1,   # Store 5
    7: 0,   # Store 6
    8: 1.5, # Restroom
    9: 0.5, # Escalator to Floor 2
    10: 0.5 # Escalator to Ground Floor
}




# Locations legend
locations = {
    1: 'Entrance A',
    2: 'Store 1',
    3: 'Store 2',
    4: 'Store 3',
    5: 'Store 4',
    6: 'Store 5',
    7: 'Store 6',
    8: 'Restroom',
    9: 'Escalator to Floor 2',
    10: 'Escalator to Ground Floor'
}

# A* algorithm to find the optimal path
def astar(start, goal):
    open_set = [start]
    came_from = {}
    g_score = {node: float('inf') for node in graph}
    f_score = {node: float('inf') for node in graph}

    g_score[start] = 0
    f_score[start] = heuristic[start]

    while open_set:
        current = min(open_set, key=lambda node: f_score[node])

        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]

        open_set.remove(current)

        for neighbor in graph[current]:
            tentative_g_score = g_score[current] + graph[current][neighbor]
            if tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + heuristic[neighbor]
                if neighbor not in open_set:
                    open_set.append(neighbor)

    return None

# Print locations legend
print("Legend:")
for key, value in locations.items():
    print(f"{key}: {value}")

# Print graph
print("Graph:")
for node, neighbors in graph.items():
    print(f"{locations[node]}: {neighbors}")

# Print heuristic values
print("\nHeuristic Values:")
for node, value in heuristic.items():
    print(f"{locations[node]}: {value}")


# Get user input
start_location = int(input("Enter the starting location (as an integer): "))
end_location = int(input("Enter the destination location (as an integer): "))

# Find optimal path
optimal_path = astar(start_location, end_location)

# Print optimal path
if optimal_path:
    print("Optimal Path:")
    for node in optimal_path:
        print(locations[node])
else:
    print("No path found.")
