import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

print("Loading dataset...")

data = pd.read_csv("dataset.csv")

# 🔴 ADD FEATURE ENGINEERING
data['magnitude'] = np.sqrt(
    data['ax']**2 + data['ay']**2 + data['az']**2
)

data['gyro_mag'] = np.sqrt(
    data['gx']**2 + data['gy']**2 + data['gz']**2
)

# 🔴 FEATURES
X = data[['ax','ay','az','gx','gy','gz','magnitude','gyro_mag']]
y = data['label']

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)

model = RandomForestClassifier(n_estimators=200)
model.fit(X_train,y_train)

pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test,pred))

joblib.dump(model,"fall_model.pkl")
print("Model saved")