from kafka import KafkaConsumer
from kafka import KafkaProducer
from json import loads
from time import sleep
from json import dumps
from bson import json_util
import pymongo
import ssl

# conexão do Producer com o endereço do kafka na porta especificada no docker-compose.yml
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: dumps(x).encode('utf-8')
)

# conexão do Cosnumidor com o endereço do kafka e ler do tópico da aplicação
consumer = KafkaConsumer(
    'topic_App',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group-id',
    value_deserializer=lambda x: loads(x.decode('utf-8'))
)
#conexão com a base da dados mongo
client = pymongo.MongoClient("mongodb+srv://usuario:1234@ssc0904.fhiqlsk.mongodb.net/?retryWrites=true&w=majority")

print(client)

#especificação da base de dados
db = client['SUS']
collection = db['Medicamento']
medicamento = {
    "nome": "Rivotril",
    "codigo": "001",
    "preço": 10.50
}
print('inseriu rivotril teste')
response_list = []

print("teste")
for event in consumer:
    data = event.value
    print(data)
    #teste para ver se o dado lido está formatado
    try:
        collection = db['Medicamento']
    except:
        continue
    #definição de rotas e gerenciamento das respostas
    #métodos definidos: get, post, put, replace, delete e update
    if data['request'] == 'get':
        print(data['filters'])
        response_list = list(collection.find(data['filters']))
        if response_list:
            print(response_list)
            response = {"code": 0, "values": response_list}
            #envio da lista de dados do get para o topico da base de dados
            producer.send('topic_DB',json_util.dumps(response))
            continue
        else:
            response = {"code":1 ,"error_message": "no value found"}
    elif data['request'] == 'post' or data['request'] == 'put':
        try:
            print(data['data'])
            collection.insert_one((data['data']))
            response = {"code": 0}
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    elif data['request'] == 'replace':
        try:
            collection.find_one_and_replace(data['filters'],data['data'])
            response = {"code": 0}
            print(response)
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    elif data['request'] == 'delete':
        try:
            r = collection.find_one_and_delete((data['filters']))
            print(r)
            if r == None:
                response = {"code":1 ,"error_message": "dado não encontrado"}
            else:
                response = {"code": 0}
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    elif data['request'] == 'update':
        try:
            r = collection.find_one_and_update(filter=data['filters'], update=data['data'])
            print(r)
            if r == None:
                response = {"code":1 ,"error_message": "dado não encontrado"}
            else:
                response = {"code": 0}
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    else:
        print("comando não encontrado")
        continue
    print(response)
    #envio de respostas padrões
    producer.send('topic_DB', value=response)
