#!/usr/bin/env python
# coding: utf-8
# %%
#run with: python Cardiovascular_abnormality_detection_ANN.py Data\CAD_Testing.csv 125 667619 1234 ./

# %%
import sys
import pandas as pd
import numpy as np
import tensorflow as tf
def get_freq_bins(signal,fs,num_bins,bin_width,verbose=False):
#function that returns num_bins number of bins with width bin_width 
    size = np.shape(signal)[1]
    print("size:",size)
    ts = 1/fs
    amplidtude = np.fft.fft(signal,size)/size
    df=fs/size; #frequency resolution
    f=[i*df for i in range(0,int(size/2))]
    if verbose:
        plt.figure(1)
        plt.subplot(2,1,1)
        plt.stem(f,abs(frequencyArr[0:int(size/2)]))
        plt.subplot(2,1,2)
        plt.plot(signal)

    bin_array = np.array(0,dtype = float)
    
    for i in range(0,num_bins*bin_width,bin_width):
        #first index of bin array is the amplitudes from fq 1 to 5. second is 5 to 10 and so on
        bin_array = np.append(bin_array, np.sum(abs(amplidtude[i:i+bin_width+1])))
    bin_array = np.delete(bin_array,0)
    #Make graphs of time series and frequency and save those images as .png
    #Make parameter to pass patient ID save as patient_ID_FFT.png patient_ID_TIMESERIES.png
    #add validation dataset
    return bin_array


def Run_CAD_ANN_Model(csv_path, sampling_frequency,patient_ID, date,result_path):
    
    model = tf.keras.models.load_model('CAD_ANN_11_15.h5')
    
    raw_ecg =  pd.read_csv(csv_path)
    
    bins=76
    width = 1
    raw_ecg = raw_ecg.to_numpy()
    fft_arr = get_freq_bins(raw_ecg,int(sampling_frequency),bins,width)
    
    print(np.shape(fft_arr))
    print(type(fft_arr))
    
    result = model.predict(fft_arr.reshape(1,bins))

    f = open(result_path + patient_ID+ '_' + date + "_results.txt", "w")

    if result[0][0] > result[0][1]:
        #print to result file
        print('patient normal')
        f.write('patient normal')
    else:
        print('patient abnormal')
        f.write('patient abnormal')
        
    print(result)
    

if __name__ == '__main__':
    
    if(len(sys.argv) != 6):
        print("Wrong number of arguments. Should be\nmodel_path, csv_path, sampling_frequency,patient_ID, date")
    Run_CAD_ANN_Model(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])


