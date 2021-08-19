from flask import Flask, json, request, jsonify, send_from_directory, abort
from pymongo import MongoClient
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

with open("conn_string.txt","r") as file:
    connection_string=file.readline()

client = MongoClient(connection_string)
db = client.data
meta = db["meta_data"]


@cross_origin()


def CoinExists(symbol):
    count = meta.count_documents({"symbol":symbol.upper()})
    if count == 1:
        return "1"
    else:
        return ""


class CoinInfo(Resource):
    def post(self):
        postedData = request.get_json()
        symbol=postedData["symbol"]
        exists = str(CoinExists(symbol))[10]
        if exists == "1":
            r = meta.find({"symbol":symbol})
            for result in r:
                del result["_id"]
                response = jsonify(result)
                response.status_code = 200
                return response
        else:
            response = jsonify("coin not found")
            response.status_code = 401
            return response




app.config["CLIENT_IMAGES"] = "../coin_images/"

class CoinImage(Resource):
    def get(self,image_name):
        try:
            return send_from_directory(
                directory=app.config["CLIENT_IMAGES"],path=image_name, as_attachment=False
            )
        except FileNotFoundError:
            abort(404)

api.add_resource(CoinInfo, "/coininfo")
api.add_resource(CoinImage, "/get-image/<image_name>")

if __name__== "__main__":
    app.run(host="0.0.0.0")
