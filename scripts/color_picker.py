from colorthief import ColorThief
from pymongo import MongoClient

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

cursor=meta.find({})
for c in cursor:
    id=c["id"]
    print(id)
    ct = ColorThief("../coin_images/"+ id +"_small.png")
    color = ct.get_color(quality=1)
    hex_color='#%02x%02x%02x' % color
    meta.update({
        "id":id
    },{
        "$set":{
            "color":hex_color
        }
    })
    print(color,hex_color)
