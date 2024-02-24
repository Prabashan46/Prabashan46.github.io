import json
import os

# List of input file names
input_files = ['cones.txt', 'cones (1).txt', 'cones (2).txt', 'cones (3).txt', 'cones (4).txt']

# Initialize an empty list to store all cone objects
merged_cones = []

# Loop through each input file
for file_name in input_files:
    if os.path.exists(file_name):
        with open(file_name, 'r') as file:
            # Read JSON data from the file
            data = json.load(file)
            # Extend the merged_cones list with data from the current file
            merged_cones.extend(data)

# Write the merged data to a new file
with open('merged_cones.txt', 'w') as output_file:
    # Write the merged_cones list as JSON to the output file
    json.dump(merged_cones, output_file, indent=2)
