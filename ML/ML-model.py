import sys
import warnings
import glob
import itertools
import json
import pandas as pd
import numpy as np
import statsmodels.api as sm
import matplotlib.pyplot as plt

warnings.filterwarnings("ignore")

countryName = sys.argv[1]

pd.set_option('display.max_rows', 500)
pd.set_option('display.min_rows', 500)


print("[SCRIPT]: reading data")
data = pd.concat([pd.read_csv(f) for f in glob.glob('../datasets_full/**-**-202*.csv')], ignore_index=True)
print("[SCRIPT]: reading data finished")

data = data.drop(['FIPS', 'Admin2', 'Active', 'Combined_Key'], axis=1)

data["Date"] = data["Last_Update"].astype('str').str[:10]

data = data[data["Date"].str[-1] != ":"]

data["Date"] = pd.to_datetime(data["Date"])

data = data.sort_values(by=['Date'], ascending=[True])

data = data.groupby(by=["Country_Region", "Date"]).sum()

# print(data)

tsC = data['Confirmed']
tsR = data['Recovered']
tsD = data['Deaths']

ts = data.loc[countryName]

ts = ts[['Confirmed', 'Recovered', 'Deaths']]

ts = ts.resample('D').ffill().reset_index().dropna()
ts = ts.set_index(["Date"])

# print(ts)

# '''
result = pd.DataFrame()
i = 0
for casetype in ['Confirmed', 'Recovered', 'Deaths']:
    print(f"=====[SCRIPT]: Current dataset: {casetype} =====")
    dataset = ts[casetype]

    #-- look for the best parameters for the model
    p = d = q = range(0, 2)
    pdq = list(itertools.product(p, d, q))
    seasonal_pdq = [(x[0], x[1], x[2], 12) for x in list(itertools.product(p, d, q))]

    print("[SCRIPT]: iterating params for optimal results using ML model")
    params = []
    for param in pdq:
        for param_seasonal in seasonal_pdq:
            try:
                mod = sm.tsa.statespace.SARIMAX(dataset,
                                                order=param,
                                                seasonal_order=param_seasonal,
                                                enforce_stationarity=False,
                                                enforce_invertibility=False)

                results = mod.fit(disp=False)
                # print('ARIMA{}x{}12 - AIC:{}'.format(param, param_seasonal, results.aic))
                params.append([param, param_seasonal, results.aic])
            except:
                continue

    aic = 100000
    order = ()
    seasonal_order = ()
    for param in params:
        # print(f"[CURRENT]: {param}")
        if param[2] < aic:
            aic = param[2]
            order = param[0]
            seasonal_order = param[1]
    print(f"[SCRIPT]: best params => {order}, {seasonal_order}")


    mod = sm.tsa.statespace.SARIMAX(dataset,
                                    order=order,
                                    seasonal_order=seasonal_order,
                                    enforce_stationarity=False,
                                    enforce_invertibility=False)
    results = mod.fit(disp=False)

    plt.figure(figsize=(15,6))
    plt.xticks(rotation=45)
    plt.rc('xtick', labelsize=1)

    # pred = results.get_prediction(start=pd.to_datetime('2020-12-01'), dynamic=False)
    pred_future = results.get_forecast(steps=30)
    pred_ci = pred_future.conf_int()
    ax = dataset.plot(label='observed', linewidth=2)
    # pred.predicted_mean.plot(ax=ax, label='Forecast', alpha=.7, figsize=(14, 7))
    pred_future.predicted_mean.plot(ax=ax, label='Forecast', alpha=.7, figsize=(14, 7))
    ax.fill_between(pred_ci.index,
                    pred_ci.iloc[:, 0],
                    pred_ci.iloc[:, 1], color='k', alpha=.2)

    plt.title(f"{countryName}-{casetype}")
    ax.set_xlabel('Date')
    plt.savefig(f'{countryName}-{casetype}.png')

    # print(pred.predicted_mean)
    # print("[SCRIPT]: Predicted values:\n", pred_future.predicted_mean)

    result[casetype] = pred_future.predicted_mean
    i += 1
# '''

result.to_json("output.json")