from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import pprint

from pymongo import MongoClient

client=MongoClient("mongodb://localhost:27017")
db=client.data
meta=db["meta"]
beta=db["beta"]

todo_res=beta.find({})
todo=""
for r in todo_res:
    todo=todo+str(r["id"])+","
todo=todo[:len(todo)-1]
print(todo)
if len(todo)>=1:
    url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info'
    parameters = {"id":todo}



    headers = {
      'Accepts': 'application/json',
      'X-CMC_PRO_API_KEY': 'eeba834a-9b71-4ade-8cf3-b933b34e81f7',
    }

    session = Session()
    session.headers.update(headers)

    try:
        response = session.get(url, params=parameters)
        raw_data = json.loads(response.text)
        try:
            data = raw_data["data"]
            pprint.pprint(data)
            for d in data:
                real_data=data[d]
                id = real_data["id"]
                slug = real_data["slug"]
                symbol = real_data["symbol"]
                logo = real_data["logo"]
                source = real_data["urls"]["source_code"]
                website = real_data["urls"]["website"]
                query = {"id":id}
                search_res=meta.find(query)
                res=0
                for x in search_res:
                    res=x
                if res == 0:
                    meta.insert_one({
                        "id":id,
                        "slug":slug,
                        "symbol":symbol,
                        "logo":logo,
                        "source":source,
                        "website":website,
                    })
            beta.delete_many({})
        except:
            print("kein data result")
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)
