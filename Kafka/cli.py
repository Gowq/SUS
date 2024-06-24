import json
import os
import time

def generate_json(request, collection, data):
    if collection !="Medicamento":
        raise ValueError("This script only supports the 'Medicamento' collection.")
    
    json_output = {
        "request": request,
        "collection": collection,
        "filters": {},
        "data": {}
    }
    
    if request == "put":
        json_output["filters"] = {"preco": {"$gt": 200}}
        json_output["data"] = {
            "nome": data["nome"],
            "codigo": data["codigo"],
            "preco": data["preco"]
        }
    elif request == "delete" or request == "get":
        json_output["filters"] = {"nome": data["nome"]}
    elif request == "update":
        json_output["filters"] = {"nome": data["nome"]}
        json_output["data"] = {"$mul": {"preco": data["preco"]}}
    
    return json_output

def main():
    os.makedirs("tmp", exist_ok=True)
    
    while True:
        request = input("Enter the method (put, get, delete, update): ").lower()

        if request not in ["put", "get", "delete", "update"]:
            print("The method must be one of the following: put, get, delete, update.")
            continue

        collection = input("Enter the collection: ")

        if collection != "Medicamento":
            print("This script only supports the 'medicamentos' collection.")
            continue

        data = {}
        if request == "put":
            data["nome"] = input("Enter the name: ")
            data["codigo"] = input("Enter the code: ")
            try:
                data["preco"] = float(input("Enter the price: "))
            except ValueError:
                print("The price must be a number.")
                continue
        elif request == "delete" or request == "get":
            data["nome"] = input("Enter the name: ")
        elif request == "update":
            data["nome"] = input("Enter the name: ")
            try:
                data["preco"] = float(input("Enter the new price: "))
            except ValueError:
                print("The price must be a number.")
                continue

        try:
            result = generate_json(request, collection, data)
            
            # Create a unique filename
            timestamp = int(time.time())
            filename = f"tmp/order_{timestamp}.json"
            
            # Save to file in tmp/ folder
            with open(filename, "w") as file:
                json.dump(result, file, indent=4)
                
            print("Generated order")
        except ValueError as e:
            print(e)

if __name__ == "__main__":
    main()

