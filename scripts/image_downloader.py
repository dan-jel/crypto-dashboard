from pymongo import MongoClient
import requests

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

cursor=meta.find({})
for c in cursor:
    symbol=c["symbol"]
    small_url=c["image"]["small_url"]
    large_url=c["image"]["large_url"]
    image_path="../coin_images/"
    
    print(symbol)

    with open(image_path+symbol+"_small.png","wb") as file:
        response=requests.get(small_url)
        file.write(response.content)
    
    with open(image_path+symbol+"_large.png","wb") as file:
        response=requests.get(large_url)
        file.write(response.content)