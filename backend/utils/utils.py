"""
@Author: Ambikeshwar
"""
from datetime import datetime, timedelta

class Utils(object):
    
    @staticmethod
    def getDatesBetweenStartEnd(startTime, stopTime):
        rangeList = []
        startTime = datetime.strptime(startTime, '%Y-%m-%d')
        stopTime = datetime.strptime(stopTime, '%Y-%m-%d')
        delta = stopTime - startTime
        for day in range(delta.days + 1):
            yield (startTime + timedelta(day)).strftime("%Y/%m/%d")
