import json
import os

# Get a list of all .json files in the current directory
json_files = [f for f in os.listdir('.') if f.endswith('.json')]

# Sort the list of files based on their numerical filename
json_files.sort(key=lambda x: int(os.path.splitext(x)[0]))

# Initialize an empty list to store all cone objects
merged_cones = []

# Loop through each JSON file
for file_name in json_files:
    with open(file_name, 'r') as file:
        # Read JSON data from the file
        data = json.load(file)
        # Extend the merged_cones list with data from the current file
        merged_cones.extend(data)

# Write the merged data to a new file
with open('merged_cones.json', 'w') as output_file:
    # Write the merged_cones list as JSON to the output file
    json.dump(merged_cones, output_file, indent=2)
