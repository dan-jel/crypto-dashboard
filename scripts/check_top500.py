from apscheduler.schedulers.blocking import BlockingScheduler
from pymongo import MongoClient
import json
from pycoingecko import CoinGeckoAPI
from datetime import datetime
import pytz
import csv

cg = CoinGeckoAPI()

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

counter=0
coins=""
a=[]

cursor = meta.find({})
for c in cursor:
    counter += 1
    coins=coins+c["id"]+","
    a.append(c["id"])

result=cg.get_price(ids=coins,vs_currencies="usd,eur")

# with open ("pest.csv", "w") as file:
#     writer = csv.writer(file, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
#     for r in a:
#         writer.writerow(r)

# with open ("test.csv", "w") as file:
#     writer = csv.writer(file, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
#     for r in result:
#         writer.writerow(r)

print("length of db ->", counter)
print("length of api ->",len(result))

