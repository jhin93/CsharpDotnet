import time

try:
    while True:
        print("Hello from processor!")
        time.sleep(1)
except KeyboardInterrupt:
    print("Processor stopped by user.")