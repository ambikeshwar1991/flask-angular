"""
@Author : Ambikeshwar
"""
import requests
import copy
from utils import participantList, participant, URL
from utils.retry import retry
from utils.utils import Utils
from queue import Queue
from bs4 import BeautifulSoup
from datetime import datetime, date, timedelta
from threading import Thread
from numpy import nan

q = Queue(maxsize=0)

results = {}

def putQueue(bankName, startTime, endTime):
    count = 0
    for stockId in participant[bankName]:
        results[stockId] = {}
        for day in Utils.getDatesBetweenStartEnd(startTime, endTime):
            q.put((stockId, day))
            count += 1
    return min(50, count) 

def crawlThread(tickerID, bankName, startTime, endTime):
    global results
    num_threads = putQueue(bankName, startTime, endTime)
    payload = getPayLoad()
#    for stockId in participant[bankName]:
#        for day in Utils.getDatesBetweenStartEnd(startTime, endTime):
#            process = Thread(target=crawl, args=[q, tickerID, results, payload])
#            process.setDaemon(True)
#            process.start()
    for i in range(num_threads):
        process = Thread(target=crawl, args=[q, tickerID, results, payload])
        process.setDaemon(True)
        process.start()
    q.join()
    resultsOut = copy.deepcopy(results)
    results = {}
    return resultsOut

def crawl(q, stockCode, results, payload):
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

@retry(Exception, tries=3)
def getDataFromHkExchange(date, stockCode, ccassParticipantId, results, payload):
    results[ccassParticipantId][date] = {}
    payload["txtShareholdingDate"] = date
    payload["txtStockCode"] = stockCode
    payload["txtParticipantID"] = ccassParticipantId
    with requests.Session() as s:
        s.headers={"User-Agent":"Mozilla/5.0"}
        req = s.post(URL,data=payload,headers={"User-Agent":"Mozilla/5.0"})
        soup = BeautifulSoup(req.text,"lxml")
        return soup

