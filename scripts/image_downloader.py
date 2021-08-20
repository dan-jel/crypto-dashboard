from pymongo import MongoClient
import requests

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

cursor=meta.find({})
for c in cursor:
    id=c["id"]
    rank=c["rank"]
    small_url=c["image"]["small_url"]
    large_url=c["image"]["large_url"]
    image_path="../coin_images/"
    
    print(rank, id)

    with open(image_path+id+"_small.png","wb") as file:
        response=requests.get(small_url)
        file.write(response.content)
    
    with open(image_path+id+"_large.png","wb") as file:
        response=requests.get(large_url)
        file.write(response.content)