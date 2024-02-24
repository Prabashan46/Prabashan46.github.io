import json
from scipy.spatial import distance

# Load the JSON-like data from the text file
with open('merged_cones.txt', 'r') as file:
    data = json.loads(file.read())

# Extract labeled locations and their coordinates
locations = {}
for item in data:
    location = item['position']['location']
    if location:
        locations[location] = {
            'x': item['position']['x'],
            'y': item['position']['y'],
            'z': item['position']['z']
        }

# Define threshold distance for considering locations as connected
threshold_distance = 0.5  # Adjust as needed

# Initialize connections dictionary
connections = {}

# Calculate distances between locations and establish connections
for start_loc, start_coord in locations.items():
    connections[start_loc] = []
    for end_loc, end_coord in locations.items():
        if start_loc != end_loc:
            dist = distance.euclidean(
                (start_coord['x'], start_coord['y'], start_coord['z']),
                (end_coord['x'], end_coord['y'], end_coord['z'])
            )
            if dist <= threshold_distance:
                connections[start_loc].append(end_loc)
                if end_loc not in connections:
                    connections[end_loc] = []  # Ensure end_loc is in connections
                connections[end_loc].append(start_loc)  # Bidirectional connection

# Convert connections to the desired object format
output_data = {}
for start_loc, end_locs in connections.items():
    output_data[start_loc] = end_locs

# Print the output data (or you can save it to a file)
print(json.dumps(output_data, indent=4))
