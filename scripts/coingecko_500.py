from pycoingecko import CoinGeckoAPI
import json

cg = CoinGeckoAPI()

coindata_1 = cg.get_coins_markets(vs_currency="usd",order="market_cap_desc",page="1",per_page="250")
coindata_2 = cg.get_coins_markets(vs_currency="usd",order="market_cap_desc",page="2",per_page="250")

coin_array=[]

for c in coindata_1:
    coin_array.append(c["id"])
 
for c in coindata_2:
    coin_array.append(c["id"])

with open("new_top500.json","w") as file:
    file.write(str(coin_array))