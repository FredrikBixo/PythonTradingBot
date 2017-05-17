from yahoo_finance import Share

def simpleWeightedRater(symbol):
    "Carls algorithm"
    try:
        share = Share(symbol)
        rate = 0
        if (share.get_price_earnings_ratio() < 100):
            rate += 1
        if (share.get_price_book()<1 or share.get_price_book() < share.get_price_earnings_ratio()):
            rate += 1
        if (share.get_50day_moving_avg() < share.get_200day_moving_avg()):
            rate += 1
        return rate

    except:
        print("Could not fetch data")
        return 0
    else:
        return 0
