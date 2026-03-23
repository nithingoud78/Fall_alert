with open("fall_model.tflite", "rb") as f:
    data = f.read()

with open("model.h", "w") as f:
    f.write("unsigned char model[] = {")
    for i, byte in enumerate(data):
        f.write(str(byte) + ",")
        if i % 12 == 0:
            f.write("\n")
    f.write("};\n")
    f.write(f"unsigned int model_len = {len(data)};")

print("model.h created successfully")