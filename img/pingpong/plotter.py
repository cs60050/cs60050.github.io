import sys
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def main(csvnames):
    for csvname in csvnames:
        base = csvname[:-4]
        df = pd.read_csv(csvname, sep=" ", names=["B", "time"])
        df["time"] *= 1e6
        model = pd.ols(y=df["time"], x=df["B"])
        print(model)
        model_time = df["B"] * model.beta["x"] + model.beta["intercept"]
        plt.plot(df["B"], df["time"], 'o-', label=base)
        plt.plot(df["B"], model_time, 'k--', 
                 label="{0:.2f}+{1:.2}*kB us".format(
                     model.beta["intercept"], model.beta["x"]*1024))
        
    plt.xlabel('Message size')
    plt.ylabel('Time per message (us)')
    lgd = plt.legend(bbox_to_anchor=(1.04,1), loc=2, borderaxespad=0.)
    plt.savefig('timings.svg'.format(base), bbox_extra_artists=(lgd,),
                bbox_inches='tight')

if __name__ == "__main__":
    main(sys.argv[1:])
