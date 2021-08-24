from apscheduler.schedulers.blocking import BlockingScheduler
from pymongo import MongoClient
import json
from pycoingecko import CoinGeckoAPI
from datetime import datetime

cg = CoinGeckoAPI()

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

sched = BlockingScheduler()



@sched.scheduled_job('interval', minutes=10)
def interval_job():
    current_time = datetime.now()
    now = current_time.strftime("%H:%M")

    print("job started running at ", now)

    with open("top500.json","r") as file:
        coinids = json.load(file)

    coindata_euro = cg.get_coins_markets(vs_currency="eur",ids=coinids,price_change_percentage="1h,24h,7d,30d,200d,1y")
    coindata_dollar=cg.get_coins_markets(vs_currency="usd",ids=coinids,price_change_percentage="1h,24h,7d,30d,200d,1y")

    if len(coindata_dollar) == len(coindata_euro):
        for c in range(len(coindata_euro)):
            euro=coindata_euro[c]
            dollar=coindata_dollar[c]

            id=euro["id"]

            # get current, pop first, append new price
            old_coindata=meta.find({"id":id})
            for cursor in old_coindata:
                euro_array=cursor["price_daily"]["euro"]
                euro_array.pop(0)
                euro_array.append({"x":now,"y":euro["current_price"]})

                dollar_array=cursor["price_daily"]["dollar"]
                dollar_array.pop(0)
                dollar_array.append({"x":now,"y":dollar["current_price"]})


            # update data
            meta.update_one({
                "id":id
            },{
                "$set":{
                    "price":{
                        "euro":euro["current_price"],
                        "dollar":dollar["current_price"],
                        "date":euro["last_updated"]
                        },
                    "market_cap":{
                        "euro":euro["market_cap"],
                        "dollar":dollar["market_cap"],
                        "change":euro["market_cap_change_percentage_24h"]
                        },
                    "rank":euro["market_cap_rank"],
                    "fully_diluted_valuation":{
                        "euro":euro["fully_diluted_valuation"],
                        "dollar":dollar["fully_diluted_valuation"]
                        },
                    "total_volume":{
                        "euro":euro["total_volume"],
                        "dollar":dollar["total_volume"]
                        },
                    "high_24h":{
                        "euro":euro["high_24h"],
                        "dollar":dollar["high_24h"]
                        },
                    "low_24h":{
                        "euro":euro["low_24h"],
                        "dollar":dollar["low_24h"]
                        },
                    "price_change_24h":{
                        "euro":euro["price_change_24h"],
                        "dollar":dollar["price_change_24h"]
                        },
                    "circulating_supply":euro["circulating_supply"],
                    "total_supply":euro["total_supply"],
                    "ath":{
                        "euro":euro["ath"],
                        "dollar":dollar["ath"],
                        "date":euro["ath_date"]
                        },
                    "atl":{
                        "euro":euro["atl"],
                        "dollar":dollar["atl"],
                        "date":euro["atl_date"]
                        },
                    "last_updated":euro["last_updated"],
                    "change_percentage":{
                        "1h":euro["price_change_percentage_1h_in_currency"],
                        "1d":euro["price_change_percentage_24h_in_currency"],
                        "1w":euro["price_change_percentage_7d_in_currency"],
                        "1m":euro["price_change_percentage_30d_in_currency"],
                        "6m":euro["price_change_percentage_200d_in_currency"],
                        "1y":euro["price_change_percentage_1y_in_currency"],
                    },
                    "price_daily":{
                        "euro":euro_array,
                        "dollar":dollar_array
                    }
                }
            })

    print("job finished running")


sched.start()