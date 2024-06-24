import logging
import os
from time import sleep
from json import dumps, loads
from kafka import KafkaProducer
import json
import sys

# Custom filter to exclude sensitive information from console output
class NoSensitiveDataFilter(logging.Filter):
    def filter(self, record):
        if "Sending data:" in record.getMessage() or "Failed to read JSON file:" in record.getMessage():
            return False
        return True

def main():
    try:
        with open(json_file_name) as arquivo:
            data = json.load(arquivo)
    except Exception as e:
        logger.error(f"Failed to read JSON file: {e}")
        sys.exit()

    producer = KafkaProducer(
        bootstrap_servers=['localhost:9092'],
        value_serializer=lambda x: dumps(x).encode('utf-8')
    )

    for j in range(1):
        logger.info(f"Sending data")
        producer.send('topic_App', value=data)
        logger.info("Data sent")
        sleep(0.3)

if __name__ == "__main__":
    # Ensure the logs directory exists
    os.makedirs('logs', exist_ok=True)

    # Create loggers
    logger = logging.getLogger('mainLogger')
    logger.setLevel(logging.INFO)

    # File handler to log all details in the logs folder
    file_handler = logging.FileHandler("logs/producer.log")
    file_handler.setLevel(logging.INFO)

    # Console handler to log without sensitive information
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.addFilter(NoSensitiveDataFilter())

    # Formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    main()

