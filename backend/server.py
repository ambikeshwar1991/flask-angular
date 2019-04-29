from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from dfOperation import results, getSeriesData
app = Flask(__name__)
api = Api(app)

class ShareHoldingData(Resource):
    def get(self, tickerID, bankName, startDate, endDate):
        series = getSeriesData(tickerID, bankName, startDate, endDate)
        print(series)
        return jsonify(series)
    #def get(self, tickerID):
    #    getSeriesData(tickerID, "JPM", "2019-04-15", "2019-04-26")
    #    print(results)
    #    return jsonify(results)

api.add_resource(ShareHoldingData, '/shareHolding/<tickerID>/<bankName>/<startDate>/<endDate>') # Route_1

if __name__ == '__main__':
    app.run(port=5002)
