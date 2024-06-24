import pymongo
import pandas as pd

client = pymongo.MongoClient("mongodb+srv://usuario:1234@ssc0904.fhiqlsk.mongodb.net/?retryWrites=true&w=majority")
db = client['test']
collection = db['medicamentos']
pmc = pd.read_csv("./pmc_treated.csv")
pmc['preco'] = pmc['preco'].astype(float)
pmc['codigo'] = pmc['codigo'].astype(str)
di = pmc.to_dict(orient='records')
# print(di)
# print(pmc.head(10))
collection.insert_many(di)
# collection.delete_many({})
# collection.delete_one({'nome': 'TALCO ALÍVIO'})
# collection.delete_one({'nome': 'TALCO ALÍVIO'})
dados = list(collection.find({}))
print(len(dados))

# client.close()
# Obtenha a lista de bases de dados

client.close()
