from apscheduler.schedulers.blocking import BlockingScheduler
from pymongo import MongoClient
from pycoingecko import CoinGeckoAPI
from datetime import datetime
import pytz

cg = CoinGeckoAPI()

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=1)
def interval_job():
    current_time = datetime.now(pytz.timezone("Europe/Berlin"))
    now = current_time.strftime("%H:%M")

    print("job started running at:", current_time)

    coins=""
    counter = meta.find({})
    for c in counter:
        coins=coins+c["id"]+","

    coindata = cg.get_price(vs_currencies="eur,usd",ids=coins)

    cursor = meta.find({})
    for c in cursor:
        euro=c["price_hourly"]["euro"]
        euro.pop(0)
        euro.append({"x":now,"y":coindata[c["id"]]["eur"],})

        dollar=c["price_hourly"]["dollar"]
        dollar.pop(0)
        dollar.append({"x":now,"y":coindata[c["id"]]["usd"]})

        meta.update_one({
            "id":c["id"]
        },{
            "$set":{
                "price":{
                    "euro":coindata[c["id"]]["eur"],
                    "dollar":coindata[c["id"]]["usd"],
                    "date":now
                    },
                "price_hourly":{
                    "euro":euro,
                    "dollar":dollar
                }
            }
        })

    print("job finished running at:", current_time)


sched.start()