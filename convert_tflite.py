import tensorflow as tf

print("Loading model...")

# Load trained model
model = tf.keras.models.load_model("fall_model_tf.h5")

print("Converting to TFLite...")

# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)

# Optimization (important for ESP32)
converter.optimizations = [tf.lite.Optimize.DEFAULT]

tflite_model = converter.convert()

# Save file
with open("fall_model.tflite", "wb") as f:
    f.write(tflite_model)

print("TFLite model saved as fall_model.tflite")