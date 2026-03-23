import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split

print("Loading dataset...")

# Load data
data = pd.read_csv("dataset.csv")

# Keep only required columns
data = data[['ax','ay','az','gx','gy','gz','label']]

print("Total rows:", len(data))

# Feature Engineering
data['magnitude'] = np.sqrt(data['ax']**2 + data['ay']**2 + data['az']**2)

# Split
X = data[['ax','ay','az','gx','gy','gz','magnitude']].values
y = data['label'].values

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Normalize
X_train = X_train / np.max(np.abs(X_train))
X_test = X_test / np.max(np.abs(X_test))

print("Training TensorFlow model...")

# Model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation='relu', input_shape=(7,)),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train
model.fit(X_train, y_train, epochs=20)

# Evaluate
loss, acc = model.evaluate(X_test, y_test)

print("\nAccuracy:", acc)

# Save model
model.save("fall_model_tf.h5")

print("\nModel saved as fall_model_tf.h5")