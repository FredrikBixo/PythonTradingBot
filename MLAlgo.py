# This statistical model works just like a linear regression; i.e. provide the best function F from a set of data points [(x1,y1),(x1,y1)] in order to predict other points on a continious intervall. 

from sklearn.neural_network import MLPRegressor

# Each array in the array corrspond to a training example. The elements inside each array inside the array are features

# For example we could use data P/B ratio and P/E as fatures ratio in order to predict the market cap

# Should me normalised in order

PBaapl = 1
PEaapl = 1;
MCAPaapl = 0;

PBgogl = 0
PEgogl = 0;
MCAPgogl = 1;

#input data (features by ML terminology)
X = [[PBaapl, PEaapl], [PBgogl, PEgogl]]

# corresponding output data (labels by ML terminology)
y = [MCAPaapl,MCAPgogl];

reg = MLPRegressor(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1)

# MLPRegressor(activation='relu', alpha=0.0001, batch_size='auto', learning_rate='constant', learning_rate_init=0.001, power_t=0.5, max_iter=200, shuffle=True, random_state=None, tol=0.0001, verbose=False, warm_start=False, momentum=0.9, nesterovs_momentum=True, early_stopping=False, validation_fraction=0.1, beta_1=0.9, beta_2=0.999, epsilon=1e-08)

reg.fit(X, y)

# %print(reg.get_params([True]))

print(reg.predict([[1, 0],[0, 0]]))

