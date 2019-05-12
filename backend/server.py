from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from utils import participant, banks
from dfOperation import getSeriesData
app = Flask(__name__)
CORS(app)
api = Api(app)

class ShareHoldingData(Resource):
    def get(self, tickerID, startDate, endDate):
        outList = []
        for bank in banks:
            outList.append(getSeriesData(tickerID, bank, startDate, endDate))
        return jsonify(outList)

api.add_resource(ShareHoldingData, '/shareHolding/<tickerID>/<startDate>/<endDate>') # Route_1

if __name__ == '__main__':
    app.run(port=5002)
