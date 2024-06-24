import pymongo

client = pymongo.MongoClient("mongodb+srv://usuario:1234@ssc0904.fhiqlsk.mongodb.net/?retryWrites=true&w=majority")
# db_names = client.list_database_names()
db = client['test']
db_names = db.list_collection_names()
rivotril = {
    "nome": "rivotril",
    "codigo": "12343049",
    "preco": 199.99
}
collection = db['medicamentos']
# collection.insert_one(rivotril)
print(collection.find_one({"nome": "rivotril"}))
