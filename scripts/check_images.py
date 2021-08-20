import os.path
from pymongo import MongoClient

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

cursor=meta.find({})

pathToFile = ""

i=0

"""for c in cursor:
    i=i+1
    symbol = c["symbol"]
    if (os.path.isfile("../coin_images/"+symbol+"_small.png")) == False:
        print(symbol)"""
    
check=[]    
for c in cursor:
    symbol = c["symbol"]
    if symbol in check:
        print(symbol)
    else:
        check.append(symbol)


