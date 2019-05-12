from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from utils import participant
from dfOperation import getSeriesData
app = Flask(__name__)
CORS(app)
api = Api(app)

class ShareHoldingData(Resource):
    def get(self, tickerID, bankName, startDate, endDate):
        outList = []
        for bank in participant.keys():
            outList.append(getSeriesData(tickerID, bank, startDate, endDate))
        print(outList)
        return jsonify(outList)

api.add_resource(ShareHoldingData, '/shareHolding/<tickerID>/<bankName>/<startDate>/<endDate>') # Route_1

if __name__ == '__main__':
    app.run(port=5002)
