from flask import Flask, json, request, jsonify
from pymongo import MongoClient
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

client = MongoClient("mongodb://0.0.0.0:27018")
db = client.data
meta = db["meta"]


@cross_origin()


def CoinExists(symbol):
    count = meta.count_documents({"symbol":symbol})
    if count == 0:
        return ""
    else:
        return "1"


class CoinInfo(Resource):
    def post(self):
        postedData = request.get_json()
        symbol=postedData["symbol"]
        exists = str(CoinExists(symbol))[10]
        if exists == "1":
            r = meta.find({"symbol":symbol})
            for result in r:
                del result["_id"]
                result= str(result).replace("'",'"')
                result= result.replace("None",'"None"')
                response = jsonify(result)
                response.status_code = 200
                return response
        else:
            response = jsonify("coin not found")
            response.status_code = 401
            return response


api.add_resource(CoinInfo, "/coininfo")

if __name__== "__main__":
    app.run(host="0.0.0.0")
