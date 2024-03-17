  
import pickle
import operation as op
import pandas as pd
from datetime import datetime
import numpy as np
from scipy import stats,special
import sys

test=pd.DataFrame()
def choice(option,start_date,days):
    start1=datetime.strptime(start_date,"%Y-%m-%d")
    test['ds']=pd.date_range(start=start1,periods=days,freq='D')
    if option =='overall':
        model=pickle.load(open('./ml_file/model_overall.pkl','rb'))
        forecast_data=(model.predict(test))
        forecast_orig=np.exp(forecast_data['yhat'])
        return op.operation(forecast_orig)
    elif option == 'BC':
        model=pickle.load(open('./ml_file/model_BC_2.pkl','rb'))
        forecast_data=(model.predict(test))
        forecast_orig=special.inv_boxcox((forecast_data['yhat']),-0.0417)
        return op.operation(forecast_orig)
    elif option == 'HM':
        model=pickle.load(open('./ml_file/model_HM_2.pkl','rb')) 
        forecast_data=(model.predict(test))
        forecast_orig=special.inv_boxcox((forecast_data['yhat']),0.006)
        return op.operation(forecast_orig)
    elif option == 'SE':
        model=pickle.load(open('./ml_file/model_SE_2.pkl','rb')) 
        forecast_data=(model.predict(test))
        forecast_orig=special.inv_boxcox((forecast_data['yhat']),-0.0315)
        return op.operation(forecast_orig)
    elif option == 'PL':
        model=pickle.load(open('./ml_file/model_PL.pkl','rb'))
        forecast_data=(model.predict(test))
        forecast_orig=np.exp(forecast_data['yhat'])
        return op.operation(forecast_orig)
    elif option == 'CP':
        model=pickle.load(open('./ml_file/model_CP.pkl','rb'))
        forecast_data=(model.predict(test))
        forecast_orig=np.exp(forecast_data['yhat'])
        return op.operation(forecast_orig)
    else:
        print('Invalid Input')
    

 # example usuage   
print(choice(str(sys.argv[1]), str(sys.argv[2]), int(sys.argv[3])))



