# This statistical model works just like a linear regression; i.e. provide the best function F from a set of data points [(x1,y1),(x1,y1)] in order to predict other points on a continious intervall. Except that it uses a "neural network" as the function

from sklearn.neural_network import MLPRegressor
from math import *

# Each array in the array corrspond to a training example. The elements inside each array inside the array are features

# For example we could use data P/B ratio and P/E as fatures ratio in order to predict the market cap

# Should me normalised in order

reg = MLPRegressor(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1)

def machineLearningAlgorithm(symbol):
    try:
        share = Share(symbol)
        print(reg.predict([share.get_price_earnings_ratio,share.get_price_book]))
    except:
        print()



def getMean( anArray ):

    mean = 0.0

    for x in anArray:
        mean = mean + x

    return (mean/len(anArray))

def getDeviation(anArray, mean):

    variance = 0.0

    for x in anArray:
        variance = variance + pow((mean-x),2)

    return sqrt(variance)

PBaapl = 1.0;
PEaapl = 20.0;
MCAPaapl = 1.0;

PBgogl = 2;
PEgogl = 15.0;
MCAPgogl = 1;

pbs = [PBaapl, PBgogl]

mean = getMean(pbs)
deviation = getDeviation(pbs, mean)

pbsNormalized = []

# x' = (x - mean) / std dev

for x in pbs:
    pbsNormalized.append((x-mean)/deviation)

print (pbsNormalized)

pes = [PEaapl, PEgogl]

mean2 = getMean(pes)
deviation2 = getDeviation(pes, mean2)

pesNormalized = []

# x' = (x - mean) / std dev

for x in pes:
    pesNormalized.append((x-mean2)/deviation2)

print (pesNormalized)

labels = [MCAPaapl, MCAPgogl]

normalized1 = (MCAPaapl)/(max(labels))
normalized2 = (MCAPgogl)/(max(labels))

print(normalized1,normalized2)

X = [[pesNormalized[0], pbsNormalized[0]], [pesNormalized[0], pbsNormalized[0]]]
y = [normalized1,normalized2];


# MLPRegressor(activation='relu', alpha=0.0001, batch_size='auto', learning_rate='constant', learning_rate_init=0.001, power_t=0.5, max_iter=200, shuffle=True, random_state=None, tol=0.0001, verbose=False, warm_start=False, momentum=0.9, nesterovs_momentum=True, early_stopping=False, validation_fraction=0.1, beta_1=0.9, beta_2=0.999, epsilon=1e-08)

reg.fit(X, y)

# %print(reg.get_params([True]))
