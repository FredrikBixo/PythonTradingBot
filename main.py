from yahoo_finance import Share

yahoo = Share('GOOG')



def rater():
    rate = 0
    if (float(yahoo.get_price_earnings_ratio()) < 10):
        rate += 1
    if (float(yahoo.get_price_book()<1) or yahoo.get_price_book() < yahoo.get_price_earnings_ratio()):
        rate += 1
    if (float(yahoo.get_50day_moving_avg()) < yahoo.get_200day_moving_avg()):
        rate += 1
    else:
        None
    print(rate)

from pprint import pprint
pprint(yahoo.get_price_earnings_ratio())
pprint(yahoo.get_price_book())
pprint(yahoo.get_50day_moving_avg())
pprint(yahoo.get_200day_moving_avg())
pprint(yahoo.get_historical('2014-04-25', '2014-04-29'))

rater()
