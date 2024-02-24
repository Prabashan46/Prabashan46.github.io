import json

# Define the input file name
input_file = 'merged_cones.json'

# Read JSON data from the file
with open(input_file, 'r') as file:
    data = json.load(file)

# Initialize a list to store unique nodes
unique_nodes = []

# Initialize a set to keep track of encountered nodes
encountered_nodes = set()

# Iterate through each node in the data
for node in data:
    # Convert the node to a string for easy comparison
    node_str = json.dumps(node, sort_keys=True)
    # Check if the node is not in the set of encountered nodes
    if node_str not in encountered_nodes:
        # Add the node to the list of unique nodes
        unique_nodes.append(node)
        # Add the node to the set of encountered nodes
        encountered_nodes.add(node_str)

# Write the unique data back to a file
output_file = 'unique_data.json'
with open(output_file, 'w') as file:
    json.dump(unique_nodes, file, indent=2)
