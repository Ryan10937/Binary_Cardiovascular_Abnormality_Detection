#!/usr/bin/env python
# coding: utf-8
# %%
#run with: python Cardiovascular_abnormality_detection_ANN.py Data\CAD_Testing.csv 125 667619 1234 ./

# %%
import sys
import pandas as pd
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
def get_freq_bins(signal,fs,num_bins,bin_width,verbose=False):
#function that returns num_bins number of bins with width bin_width 
    direction = 1
    
    #normalize signal
    signal_range = signal.max(axis=direction) - signal.min(axis=direction)
    #print('signal_range: ',signal_range)
    signal_min = signal.min(axis=direction)
    #print('signal_min: ',signal_min)
    signal = (signal - signal_min)/signal_range
    
    
    size = max(np.shape(signal))
    half_size = int(size/2)
    ts = 1/fs
    amplitude = np.fft.fft(signal,size)/size
    df=fs/size; #frequency resolution
    f=[i*df for i in range(0,half_size)]
    amplitude = abs(amplitude[0:half_size])
    return amplitude[0][0:num_bins]


def Run_CAD_ANN_Model(csv_path, sampling_frequency, patient_ID, date, result_path):
    
    model = tf.keras.models.load_model('C:/Users/Digital Suppliers/Documents/GitHub/Binary_Cardiovascular_Abnormality_Detection/Python/CAD_ANN_11_15.h5')
    
    raw_ecg =  pd.read_csv(csv_path,header=None)
    
    bins = 76
    width = 1
    raw_ecg = raw_ecg.to_numpy(copy=True)
    fft_arr = get_freq_bins(raw_ecg,int(sampling_frequency),bins,width)
    
    #print(np.shape(fft_arr))
    #print(type(fft_arr))
    
    result = model.predict(fft_arr.reshape(1,bins))
    print(result)
    png_path = ''

    if result[0][0] > result[0][1]:
        #print to result file
        png_path = result_path + "/" + patient_ID+ '_' + date + '_' + 'normal' + "_results.png"
        
    else:
        png_path = result_path + "/" + patient_ID+ '_' + date + '_' + 'abnormal' +"_results.png"

    #put all code in Python folder
    #copy all main files into python folder 

    plt.stem(fft_arr)
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Amplitude')
    plt.title(str(patient_ID) + ' Input Features')
    plt.savefig(png_path)

if __name__ == '__main__':
    Run_CAD_ANN_Model(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])
   #Run_CAD_ANN_Model("C:/Users/Digital Suppliers/Documents/GitHub/Binary_Cardiovascular_Abnormality_Detection/CSV/5ff02a26-d385-430f-a0b6-90ceb56a6668.csv",1000,"5ff02a26-d385-430f-a0b6-90ceb56a6668","01-12-2021","C:/Users/Digital Suppliers/Documents/GitHub/Binary_Cardiovascular_Abnormality_Detection/Results");

# %%
