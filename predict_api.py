from flask import Flask, request
import numpy as np
import joblib

app = Flask(__name__)

model = joblib.load("fall_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    ax = data["ax"]
    ay = data["ay"]
    az = data["az"]
    gx = data["gx"]
    gy = data["gy"]
    gz = data["gz"]

    # Normalize
    ax = ax / 32768.0
    ay = ay / 32768.0
    az = az / 32768.0
    gx = gx / 32768.0
    gy = gy / 32768.0
    gz = gz / 32768.0

    magnitude = np.sqrt(ax**2 + ay**2 + az**2)

    X = [[ax, ay, az, gx, gy, gz, magnitude]]

    prob = model.predict_proba(X)[0][1]

    print("Fall Probability:", prob)

    # 🔴 STRICT THRESHOLD
    if prob > 0.85:
        return "fall"
    else:
        return "normal"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)