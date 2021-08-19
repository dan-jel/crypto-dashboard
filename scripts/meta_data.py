import json
from pycoingecko import CoinGeckoAPI
from pymongo import MongoClient
import pprint
import time

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]

cg = CoinGeckoAPI()

with open("top500.json","r") as file:
    data = json.load(file)
    for i in range(len(data)):
        if i%10 == 0:
            time.sleep(10)

        coindata = cg.get_coin_by_id(data[i])
        print(i,coindata["name"])
        
        coindict={
            "symbol": coindata["symbol"].upper(),
            "name":coindata["name"],
            "description": coindata["description"]["en"],
            "homepage": coindata["links"]["homepage"],
            "github": coindata["links"]["repos_url"]["github"],
            "blockchain_site": coindata["links"]["blockchain_site"],
            "image": {
                "small_url":coindata["image"]["small"],
                "large_url":coindata["image"]["large"],
                },
            "rank": coindata["market_cap_rank"],
            "price":{
                "euro":coindata["market_data"]["current_price"]["eur"],
                "dollar":coindata["market_data"]["current_price"]["usd"]
                },
            "ath":{
                "euro":coindata["market_data"]["ath"]["eur"],
                "dollar":coindata["market_data"]["ath"]["usd"],
                "date":coindata["market_data"]["ath_date"]["eur"]
                },
            "atl":{
                "euro":coindata["market_data"]["atl"]["eur"],
                "dollar":coindata["market_data"]["atl"]["usd"],
                "date":coindata["market_data"]["atl_date"]["eur"]
                },
            "market_cap":{
                "euro":coindata["market_data"]["market_cap"]["eur"],
                "dollar":coindata["market_data"]["market_cap"]["usd"],
                },
            "total_volume":{
                "euro":coindata["market_data"]["total_volume"]["eur"],
                "dollar":coindata["market_data"]["total_volume"]["usd"],
            },
            "total_supply":coindata["market_data"]["total_supply"],
            "circulating_supply":coindata["market_data"]["circulating_supply"],
            "high_24h":{
                "euro":coindata["market_data"]["high_24h"]["eur"],
                "dollar":coindata["market_data"]["high_24h"]["usd"],
            },
            "low_24h":{
                "euro":coindata["market_data"]["low_24h"]["eur"],
                "dollar":coindata["market_data"]["low_24h"]["usd"],
            },
            "change_percentage":{
                "day":coindata["market_data"]["price_change_percentage_24h"],
                "week":coindata["market_data"]["price_change_percentage_7d"],
                "month":coindata["market_data"]["price_change_percentage_30d"],
                "year":coindata["market_data"]["price_change_percentage_1y"],
            },
            "price_change_24h":{
                "euro":coindata["market_data"]["price_change_24h_in_currency"]["eur"],
                "dollar":coindata["market_data"]["price_change_24h_in_currency"]["usd"],
                "coin":coindata["market_data"]["price_change_24h"],
                "percent":coindata["market_data"]["price_change_percentage_24h"]
            }
        }
        meta.insert_one(coindict)