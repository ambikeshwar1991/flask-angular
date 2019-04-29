
import requests
from queue import Queue
from bs4 import BeautifulSoup
from datetime import datetime, date, timedelta
from threading import Thread
from numpy import nan

q = Queue(maxsize=0)

participantList = ['C00019', 'B01490', 'B01078', 'C00039', 'C00010', 'B01451', 'B01323', 'C00074', 'B01224', 'B01554', 'C00102', 'B01491', 'C00100','B01504', 'B01110', 'B01161', 'B01366', 'B01299', 'C00064']

participant = {'HSBC': ['C00019', 'B01490'],
               'SC'  : ['B01078', 'C00039'],
               'CITI': ['C00010'],
               'GS'  : ['B01451'],
               'DB'  : ['B01323', 'C00074'],
               'ML'  : ['B01224'],
               'MACQ': ['B01554', 'C00102'],
               'CS'  : ['B01491'],
               'JPM' : ['C00100','B01504', 'B01110'],
               'UBS' : ['B01161', 'B01366'],
               'BNP' : ['B01299', 'C00064']}

URL = "http://www.hkexnews.hk/sdw/search/searchsdw.aspx"
results = {}
def getDatesBetweenStartEnd(startTime, stopTime):
    rangeList = []
    startTime = datetime.strptime(startTime, '%Y-%m-%d')
    stopTime = datetime.strptime(stopTime, '%Y-%m-%d')
    delta = stopTime - startTime
    for day in range(delta.days + 1):
        yield (startTime + timedelta(day)).strftime("%Y/%m/%d")

def putQueue(bankName, startTime, endTime):
    for stockId in participant[bankName]:
        results[stockId] = {}
        for day in getDatesBetweenStartEnd(startTime, endTime):
            q.put((stockId, day))

def crawlThread(tickerID, bankName, startTime, endTime):
    putQueue(bankName, startTime, endTime)
    for stockId in participant[bankName]:
        for day in getDatesBetweenStartEnd(startTime, endTime):
            process = Thread(target=crawl, args=[q, tickerID, results])
            process.setDaemon(True)
            process.start()
    q.join()
def crawl(q, stockCode, results):
    payload = getPayLoad()
    while not q.empty():
        work = q.get()
        ccassParticipantId = work[0]
        date = work[1]
        try:
            soup = getDataFromHkExchange(date, stockCode, ccassParticipantId, results, payload)
            try:
                val = soup.find_all("div", class_="summary-value")[0].get_text().replace(',', '')
            except:
                val = False
            if val:
                results[ccassParticipantId][date] = int(val)
            else:
                for row in soup.findAll('tr'):
                    header = row.find_all("td", class_="header")
                    value = row.find_all("td", class_="value")
                    for head, val in zip(header, value):
                        resultHeader = head.get_text(strip=True).replace(':', '')
                        if resultHeader == 'Shareholding':
                            resultVal = int(val.get_text(strip=True).replace(',', ''))
                            results[ccassParticipantId][date] = resultVal
        except:
            results[ccassParticipantId][date] = nan
        q.task_done()
    return True

def getPayLoad():
    with requests.Session() as s:
        s.headers={"User-Agent":"Mozilla/5.0"}
        res = s.get(URL)
        soup = BeautifulSoup(res.text,"lxml")
        viewstate = soup.select_one("#__VIEWSTATE")['value']
        viewgen = soup.select_one("#__VIEWSTATEGENERATOR")['value']
        eventTarget = soup.select_one("#__EVENTTARGET")['value']
        payload = { "__EVENTTARGET": "btnSearch",
                    "__EVENTARGUMENT" : '',
                    "__VIEWSTATE" : viewstate,
                    "__VIEWSTATEGENERATOR" : viewgen,
                    "today": datetime.now().strftime("%Y%m%d"),
                    "sortBy": "shareholding",
                    "sortDirection": "desc",
                    "alertMsg": "",
                    "txtShareholdingDate": "",
                    "txtStockCode": "",
                    "txtStockName": "",
                    "txtParticipantID": "",
                    "txtParticipantName": "",
                    "txtSelPartID": ""}
        return payload

def getDataFromHkExchange(date, stockCode, ccassParticipantId, results, payload):
    results[ccassParticipantId][date] = {}
#    results[date] = {}
    payload["txtShareholdingDate"] = date
    payload["txtStockCode"] = stockCode
    payload["txtParticipantID"] = ccassParticipantId
    with requests.Session() as s:
        s.headers={"User-Agent":"Mozilla/5.0"}
        req = s.post(URL,data=payload,headers={"User-Agent":"Mozilla/5.0"})
        soup = BeautifulSoup(req.text,"lxml")
        return soup

#if __name__ == '__main__':

#    print(getDataFromHkExchange("2019/04/26", "00001", "C00019"))
#    crawlThread("00001", "JPM", "2019-04-25", "2019-04-26")
#    print(results)
