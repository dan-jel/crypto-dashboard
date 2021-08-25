from apscheduler.schedulers.blocking import BlockingScheduler
from pymongo import MongoClient
import json

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

sched = BlockingScheduler()

@sched.scheduled_job('cron', hour=12)
def scheduled_job():
    with open("top500.json","r") as file:
        data = json.load(file)

sched.start()