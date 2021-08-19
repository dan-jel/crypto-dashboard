from colorthief import ColorThief
from pymongo import MongoClient

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

cursor=meta.find({})
for c in cursor:
    symbol=c["symbol"]
    ct = ColorThief("../coin_images/"+ symbol +"_small.png")
    color = ct.get_color(quality=1)
    hex_color='#%02x%02x%02x' % color
    meta.update({
        "symbol":symbol
    },{
        "$set":{
            "color":hex_color
        }
    })
    print(symbol, color,hex_color)
