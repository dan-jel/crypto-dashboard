from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import pprint

from pymongo import MongoClient

"""url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
parameters = {
  'start':'1',
  'limit':'10',
  'convert':'USD'
}"""
url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info'
parameters = {
"id":"1,2,3"
}



headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': 'eeba834a-9b71-4ade-8cf3-b933b34e81f7',
}

session = Session()
session.headers.update(headers)

try:
  response = session.get(url, params=parameters)
  data = json.loads(response.text)
  pprint.pprint(data)
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)

def
