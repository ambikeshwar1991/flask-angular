from shareholdingDataFromExchange import crawlThread
import pandas as pd

def getSeriesData(tickerID, bankName, startDate, endDate):
    results = crawlThread(tickerID, bankName, startDate, endDate)
    df = pd.DataFrame(results)
    print(df)
    df = df.fillna(method='bfill')
    df = df.fillna(method='ffill')
    print('Here I am ')
    series = df[df.columns[0]]
    for col in df.columns[1:]:
        series += df[col]
    indexes = list(series.index)
    values = eval(series.to_json(orient='values'))
    x = {}
    x[bankName] = []
    for idx, val in zip(indexes, values):
        x[bankName].append({"date": idx, "shareholding": val})
    return x

