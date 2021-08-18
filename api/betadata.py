from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import pprint

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27018")
db = client.data
meta = db["meta"]
beta = db["beta"]

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
parameters = {
    'start': '1',
    'limit': '100',
    'convert': 'EUR'
}

headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': 'eeba834a-9b71-4ade-8cf3-b933b34e81f7',
}

session = Session()
session.headers.update(headers)

try:
    response = session.get(url, params=parameters)
    data = json.loads(response.text)["data"]

    for d in data:
        id = d["id"]
        slug = d["slug"]
        query = {"id": id}
        search_res = meta.find(query)
        res = 0
        for s in search_res:
            res = s
        if res == 0:
            beta.insert_one({"id": id, "slug": slug})
        else:
            dictdata = {
                "cmc_rank": d["cmc_rank"],
                "max_supply": d["max_supply"],
                "total_supply": d["total_supply"],
                "EUR": d["quote"]["EUR"],
            }
            meta.update_one({"_id": res["_id"]}, {"$set": dictdata})

except (ConnectionError, Timeout, TooManyRedirects) as e:
    print(e)
