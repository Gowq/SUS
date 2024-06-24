from kafka import KafkaConsumer
from json import loads
import logging
from datetime import datetime

# Set up logging
log_filename = 'logs/producer.log'
logging.basicConfig(
    filename=log_filename,
    level=logging.INFO,
    format='%(asctime)s - mainLogger - INFO - Data received',
    datefmt='%Y-%m-%d %H:%M:%S'
)

consumer = KafkaConsumer(
    'topic_DB',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group-id',
    value_deserializer=lambda x: loads(x.decode('utf-8'))
)

for event in consumer:
    event_data = event.value
    # Log the received data with the current date and time
    logging.info('Data received')
    print(event_data)

