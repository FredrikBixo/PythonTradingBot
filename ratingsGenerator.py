import config
import MySQLdb
import importlib
import time
import datetime

def generateRatings():
    "Gets all stocks in the database, computes their rating and returns the result as a an array of dicts"

    ratings = [] #Stores the results

    #Connect to MySQL and create a cursor
    db = MySQLdb.connect(host = config.mysql["host"],
        user = config.mysql["user"],
        passwd = config.mysql["password"],
        db = config.mysql["database"])
    cursor = db.cursor()


    #Get all algorithms from database and import them
    algorithms = dict()
    cursor.execute("SELECT algorithms.algorithmId, algorithms.algorithmScriptName from algorithms")
    for algorithm in cursor.fetchall():
        algorithms[algorithm[1]] = importlib.import_module("ratingAlgorithms." + algorithm[1])

    #Run all algorithms on every stock and save the results in the ratings list
    cursor.execute("SELECT stocks.stockId, stocks.stockSymbol, algorithms.algorithmId, algorithms.algorithmScriptName FROM stocks CROSS JOIN algorithms")
    for stock in cursor.fetchall():
        rating = getattr(algorithms[stock[3]], stock[3])(stock[1])
        print str(stock[0]) + " " + stock[1] + " " + stock[3] + " " + str(rating) + " " + str( int(time.time()))
        ratings.append({"stockId": stock[0],
            "algorithmId": stock[2],
            "ratingScore": rating,
            "ratingComputed": datetime.datetime.fromtimestamp(int(time.time())).strftime('%Y-%m-%d %H:%M:%S')})
    db.close()

    return ratings

def pushRatings(ratings):
    "Saves the ratings to the database"
    #Connect to MySQL and create a cursor
    db = MySQLdb.connect(host = config.mysql["host"],
        user = config.mysql["user"],
        passwd = config.mysql["password"],
        db = config.mysql["database"])
    cursor = db.cursor()

    #Create a querystring
    queryString = "insert into ratings (stockId, algorithmId, ratingScore, ratingComputed) values "
    for rating in ratings:
        queryString += str("(" + str(rating["stockId"]) + ", " + str(rating["algorithmId"]) + ", " + str(rating["ratingScore"]) + ", '" + str(rating["ratingComputed"]) + "'),")
    queryString = queryString[:-1]
    cursor.execute(queryString)
    db.commit()
    db.close()

ratings = generateRatings()
pushRatings(ratings)
