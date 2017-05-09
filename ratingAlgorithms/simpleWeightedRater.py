from yahoo_finance import Share

'''
***DISCLAIMER***
All the information, software, content, products and services available from this software are provided on as "as-is" and "as-avaiable" basis
with no warranties of any kind. If any past performance results are shown, it is for illustration and example only, are hypothetical and as 
such have many inherent limitations. No representation is being made that any account will or is likely to achieve profits or losses similar
to those shown. 

This algoritm checks all the stocks on the SP500-index which is based on the market capitalization of 500 large companies listed on NYSE
NASDAQ. It's one of the most followed equitu indices and is often considered the best representation of the U.S stock market. 
To measure the algorithms perfomance it should be compared to the ETF (Exchange-Traded Fund) 'SPY' which is the best-recognized and oldest ETF
and it tracks the SP500. 

The algorithm rates the stocks on a scale to 0-11, the higher rate, the better stock. The different rating conditions are weighting according
to our assesment strategy which mostly focus on the fundamentals of the companies which is ideal for value-investing. It also checks for
analyst consensus and momentum which both are weighted the same. 

Input: N/A
Output: Two lists. TOP_STOCKS which consists of all securities with a rating of 9 and higher. BOTTOM_STOCKS which consists of all securities
with a rating of 1 and lower. 
'''

sp500 = ['A', 'AA', 'AAPL', 'ABC', 'ABT', 'ACE', 'ACN', 'ADBE', 'ADI', 'ADM', 'ADP', 'ADSK', 'ADT', 'AEE', 'AEP', 'AES',
         'AET', 'AFL', 'AGN', 'AIG', 'AIV', 'AIZ', 'AKAM', 'ALL', 'ALTR', 'ALXN', 'AMAT', 'AMD', 'AMGN', 'AMP', 'AMT',
         'AMZN', 'AN', 'ANF', 'AON', 'APA', 'APC', 'APD', 'APH', 'APOL', 'ARG', 'ATI', 'AVB', 'AVP', 'AVY', 'AXP',
         'AZO', 'BA', 'BAC', 'BAX', 'BBBY', 'BBT', 'BBY', 'BCR', 'BDX', 'BEAM', 'BEN', 'BF.B', 'BHI', 'BIG', 'BIIB',
         'BK', 'BLK', 'BLL', 'BMC', 'BMS', 'BMY', 'BRCM', 'BRK.B', 'BSX', 'BTU', 'BWA', 'BXP', 'C', 'CA', 'CAG', 'CAH',
         'CAM', 'CAT', 'CB', 'CBG', 'CCE', 'CCI', 'CCL', 'CELG', 'CERN', 'CF', 'CFN', 'CHK', 'CHRW', 'CI', 'CINF', 'CL',
         'CLF', 'CLX', 'CMA', 'CMCSA', 'CME', 'CMG', 'CMI', 'CMS', 'CNP', 'CNX', 'COF', 'COG', 'COH', 'COL', 'COP',
         'COST', 'COV', 'CPB', 'CRM', 'CSC', 'CSCO', 'CSX', 'CTAS', 'CTL', 'CTSH', 'CTXS', 'CVC', 'CVH', 'CVS', 'CVX',
         'D', 'DD', 'DE', 'DELL', 'DFS', 'DG', 'DGX', 'DHI', 'DHR', 'DIS', 'DISCA', 'DLTR', 'DNB', 'DNR', 'DO', 'DOV',
         'DOW', 'DPS', 'DRI', 'DTE', 'DTV', 'DUK', 'DVA', 'DVN', 'EA', 'EBAY', 'ECL', 'ED', 'EFX', 'EIX', 'EL', 'EMC',
         'EMN', 'EMR', 'EOG', 'EQR', 'EQT', 'ESRX', 'ESV', 'ETFC', 'ETN', 'ETR', 'EW', 'EXC', 'EXPD', 'EXPE', 'F',
         'FAST', 'FCX', 'FDO', 'FDX', 'FE', 'FFIV', 'FHN', 'FII', 'FIS', 'FISV', 'FITB', 'FLIR', 'FLR', 'FLS', 'FMC',
         'FOSL', 'FRX', 'FSLR', 'FTI', 'FTR', 'GAS', 'GCI', 'GD', 'GE', 'GILD', 'GIS', 'GLW', 'GME', 'GNW', 'GOOG',
         'GPC', 'GPS', 'GS', 'GT', 'GWW', 'HAL', 'HAR', 'HAS', 'HBAN', 'HCBK', 'HCN', 'HCP', 'HD', 'HES', 'HIG', 'HNZ',
         'HOG', 'HON', 'HOT', 'HP', 'HPQ', 'HRB', 'HRL', 'HRS', 'HSP', 'HST', 'HSY', 'HUM', 'IBM', 'ICE', 'IFF', 'IGT',
         'INTC', 'INTU', 'IP', 'IPG', 'IR', 'IRM', 'ISRG', 'ITW', 'IVZ', 'JBL', 'JCI', 'JCP', 'JDSU', 'JEC', 'JNJ',
         'JNPR', 'JOY', 'JPM', 'JWN', 'K', 'KEY', 'KIM', 'KLAC', 'KMB', 'KMI', 'KMX', 'KO', 'KR', 'KRFT', 'KSS', 'L',
         'LEG', 'LEN', 'LH', 'LIFE', 'LLL', 'LLTC', 'LLY', 'LM', 'LMT', 'LNC', 'LO', 'LOW', 'LRCX', 'LSI', 'LTD', 'LUK',
         'LUV', 'LYB', 'M', 'MA', 'MAR', 'MAS', 'MAT', 'MCD', 'MCHP', 'MCK', 'MCO', 'MDLZ', 'MDT', 'MET', 'MHP', 'MJN',
         'MKC', 'MMC', 'MMM', 'MNST', 'MO', 'MOLX', 'MON', 'MOS', 'MPC', 'MRK', 'MRO', 'MS', 'MSFT', 'MSI', 'MTB', 'MU',
         'MUR', 'MWV', 'MYL', 'NBL', 'NBR', 'NDAQ', 'NE', 'NEE', 'NEM', 'NFLX', 'NFX', 'NI', 'NKE', 'NOC', 'NOV', 'NRG',
         'NSC', 'NTAP', 'NTRS', 'NU', 'NUE', 'NVDA', 'NWL', 'NWSA', 'NYX', 'OI', 'OKE', 'OMC', 'ORCL', 'ORLY', 'OXY',
         'PAYX', 'PBCT', 'PBI', 'PCAR', 'PCG', 'PCL', 'PCLN', 'PCP', 'PCS', 'PDCO', 'PEG', 'PEP', 'PETM', 'PFE', 'PFG',
         'PG', 'PGR', 'PH', 'PHM', 'PKI', 'PLD', 'PLL', 'PM', 'PNC', 'PNR', 'PNW', 'POM', 'PPG', 'PPL', 'PRGO', 'PRU',
         'PSA', 'PSX', 'PWR', 'PX', 'PXD', 'QCOM', 'QEP', 'R', 'RAI', 'RDC', 'RF', 'RHI', 'RHT', 'RL', 'ROK', 'ROP',
         'ROST', 'RRC', 'RRD', 'RSG', 'RTN', 'S', 'SAI', 'SBUX', 'SCG', 'SCHW', 'SE', 'SEE', 'SHW', 'SIAL', 'SJM',
         'SLB', 'SLM', 'SNA', 'SNDK', 'SNI', 'SO', 'SPG', 'SPLS', 'SRCL', 'SRE', 'STI', 'STJ', 'STT', 'STX', 'STZ',
         'SWK', 'SWN', 'SWY', 'SYK', 'SYMC', 'SYY', 'T', 'TAP', 'TDC', 'TE', 'TEG', 'TEL', 'TER', 'TGT', 'THC', 'TIE',
         'TIF', 'TJX', 'TMK', 'TMO', 'TRIP', 'TROW', 'TRV', 'TSN', 'TSO', 'TSS', 'TWC', 'TWX', 'TXN', 'TXT', 'TYC',
         'UNH', 'UNM', 'UNP', 'UPS', 'URBN', 'USB', 'UTX', 'V', 'VAR', 'VFC', 'VIAB', 'VLO', 'VMC', 'VNO', 'VRSN',
         'VTR', 'VZ', 'WAG', 'WAT', 'WDC', 'WEC', 'WFC', 'WFM', 'WHR', 'WIN', 'WLP', 'WM', 'WMB', 'WMT', 'WPI', 'WPO',
         'WPX', 'WU', 'WY', 'WYN', 'WYNN', 'X', 'XEL', 'XL', 'XLNX', 'XOM', 'XRAY', 'XRX', 'XYL', 'YHOO', 'YUM', 'ZION',
         'ZMH']

TOP_STOCKS = []
BOTTOM_STOCKS = []

def simpleWeightedRater():
    for ticker in sp500:
        try:
            share = Share(ticker)
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
            #print("{} was rated: {}".format(ticker, rate))

            #Classifies the stocks
            if rate >= 9:
                TOP_STOCKS.append(ticker)
                #print(TOP_STOCKS)
            if rate <= 1:
                BOTTOM_STOCKS.append(ticker)
        except:
            print("Could not fetch data")

simpleWeightedRater()
print("The top rated stocks are: ")
print(TOP_STOCKS)
print("The bottom rated stocks are:")
print(BOTTOM_STOCKS)
