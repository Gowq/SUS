import json
import os
import sys
from datetime import datetime

def generate_json_request():
    # Define the JSON structure
    request_data = {
        "request": "put",
        "collection": "medicamentos",
        "filters": {
            "preco": {"$gt": 200}
        },
        "data": {
            "nome": "Acetona",
            "codigo": "1239854",
            "preco": 199.99
        }
    }
    return request_data

def write_json_to_file(json_data, filename):
    # Create a 'tmp' folder if it doesn't exist
    os.makedirs('tmp', exist_ok=True)
    
    # Write JSON data to file
    with open(f'tmp/{filename}', 'w') as f:
        json.dump(json_data, f, indent=4)

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <number_of_files>")
        sys.exit(1)
    
    try:
        n = int(sys.argv[1])
    except ValueError:
        print("Invalid number of files. Please provide an integer.")
        sys.exit(1)
    
    # Generate and write n JSON files
    for i in range(n):
        json_data = generate_json_request()
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f'tmp_{timestamp}_{i}.json'
        write_json_to_file(json_data, filename)
        print(f'Generated: {filename}')
    
    print(f'\nSuccessfully generated {n} JSON files in tmp/ folder.')

if __name__ == "__main__":
    main()


