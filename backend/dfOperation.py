from shareholdingDataFromExchange import crawlThread, results
import pandas as pd

def getSeriesData(tickerID, bankName, startDate, endDate):
    crawlThread(tickerID, bankName, startDate, endDate)
    df = pd.DataFrame(results)
    df = df.fillna(method='bfill')
    df = df.fillna(method='ffill')
    series = df[df.columns[0]]
    for col in df.columns[1:]:
        series += df[col]
    indexes = list(series.index)
    values = eval(series.to_json(orient='values'))
    x = {}
    x["result"] = []

    for idx, val in zip(indexes, values):
        x["result"].append({"date": idx, "shareholding": val})
    return x

