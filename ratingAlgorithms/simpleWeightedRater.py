from yahoo_finance import Share

def simpleWeightedRater(symbol):
    "Carls algorithm"
    try:
        share = Share(symbol)
        rate = 0
            if (share.get_price_earnings_ratio() < 10):
                rate += 3
            if (share.get_price_book() < 0.70):
                rate += 3
            if (share.get_50day_moving_avg() > share.get_200day_moving_avg()):
                rate += 1
            if (share.get_price_EPS_estimate_current_year() < share.get_price_EPS_estimate_next_year()):
                rate += 2
            if (share.get_one_yr_target_price() > share.get_price()):
                rate += 1
            if (share.get_dividend_yield() > 0.04):
                rate += 1
        return rate

    except:
        print("Could not fetch data")
        return 0
    else:
        return 0
