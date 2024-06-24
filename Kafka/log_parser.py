import re
from datetime import datetime
import statistics

# Define the path to the log file
log_file = "logs/producer.log"

# Regular expression pattern to match the timestamp
timestamp_pattern = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:,\d+)?'

def parse_log(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    data_sent_times = []
    data_received_time = None

    for line in lines:
        if "Data sent" in line:
            match = re.search(timestamp_pattern, line)
            if match:
                timestamp_str = match.group(0)
                timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S,%f')
                data_sent_times.append(timestamp)
        
        elif "Data received" in line and data_received_time is None:
            match = re.search(timestamp_pattern, line)
            if match:
                timestamp_str = match.group(0)
                data_received_time = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')

    return data_sent_times, data_received_time

def calculate_time_differences(data_sent_times, data_received_time):
    time_differences = []
    
    if data_received_time is None or not data_sent_times:
        return time_differences

    first_sent_time = data_sent_times[0]

    for sent_time in data_sent_times:
        difference = sent_time - first_sent_time
        time_differences.append(difference.total_seconds())

    return time_differences

def main():
    data_sent_times, data_received_time = parse_log(log_file)

    if data_received_time is None:
        print("No 'data received' timestamp found in the log file.")
        return

    time_differences = calculate_time_differences(data_sent_times, data_received_time)

    print(f"Time differences (seconds): {time_differences}")
    
    if len(time_differences) > 1:
        average_time = statistics.mean(time_differences)
        std_deviation = statistics.stdev(time_differences)
        print(f"Average time difference: {average_time:.2f} seconds")
        print(f"Standard deviation: {std_deviation:.2f}")
    else:
        print("Insufficient data to calculate average and standard deviation.")

if __name__ == "__main__":
    main()

