// volume + rsi + insider activity??

from yahoo_finance import Share

share = Share('GOOG')

   rate = 0
    if (float(share.get_volume()) > float(share.get_avg_daily_volume() * 1.5):
        rate += 1
   

