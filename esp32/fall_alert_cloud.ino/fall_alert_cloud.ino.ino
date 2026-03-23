#include <WiFi.h>
#include <Wire.h>
#include <MPU6050.h>
#include <HTTPClient.h>

char ssid[] = "Nithin";
char pass[] = "123456789";

MPU6050 mpu;

#define BUZZER_PIN 25

// 🔴 ML API (Render)
String mlURL = "https://ml-api-54tg.onrender.com/predict";

// 🔴 Cloud API
String cloudURL = "https://fall-alert-backend.onrender.com/api/alert";

unsigned long lastTrigger = 0;
float prevMagnitude = 0;

void setup() {

  Serial.begin(115200);
  delay(2000);

  Serial.println("Starting...");

  Wire.begin(21,22);

  pinMode(BUZZER_PIN, OUTPUT);

  mpu.initialize();

  WiFi.begin(ssid, pass);

  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  Serial.println("\nSetup Complete");
}

void loop() {

  int16_t ax, ay, az, gx, gy, gz;
  mpu.getMotion6(&ax,&ay,&az,&gx,&gy,&gz);

  float Ax = ax / 16384.0;
  float Ay = ay / 16384.0;
  float Az = az / 16384.0;

  float magnitude = sqrt(Ax*Ax + Ay*Ay + Az*Az);

  Serial.print("Magnitude: ");
  Serial.println(magnitude);

  float diff = magnitude - prevMagnitude;

  Serial.print("Diff: ");
  Serial.println(diff);

  // 🔴 PRIMARY FALL DETECTION (YOUR WORKING LOGIC)
  if(diff > 0.4 && magnitude > 2.3 && millis() - lastTrigger > 5000){

    Serial.println("🚨 FALL DETECTED");

    // 🔊 BUZZER
    digitalWrite(BUZZER_PIN, HIGH);
    delay(3000);
    digitalWrite(BUZZER_PIN, LOW);

    // ☁️ CLOUD ALERT
    sendAlert();

    // 🔵 OPTIONAL ML CALL (DOES NOT AFFECT LOGIC)
    callML(ax, ay, az, gx, gy, gz);

    lastTrigger = millis();
  }

  prevMagnitude = magnitude;

  delay(100);
}

// 🔵 ML FUNCTION (OPTIONAL — SAFE)
void callML(int16_t ax, int16_t ay, int16_t az, int16_t gx, int16_t gy, int16_t gz){

  if(WiFi.status()==WL_CONNECTED){

    HTTPClient http;

    http.begin(mlURL);
    http.addHeader("Content-Type","application/json");

    String jsonData = "{";
    jsonData += "\"ax\":" + String(ax) + ",";
    jsonData += "\"ay\":" + String(ay) + ",";
    jsonData += "\"az\":" + String(az) + ",";
    jsonData += "\"gx\":" + String(gx) + ",";
    jsonData += "\"gy\":" + String(gy) + ",";
    jsonData += "\"gz\":" + String(gz);
    jsonData += "}";

    int code = http.POST(jsonData);

    Serial.print("ML HTTP: ");
    Serial.println(code);

    if(code > 0){
      String response = http.getString();
      Serial.print("ML Response: ");
      Serial.println(response);
    }

    http.end();
  }
}

// 🔴 CLOUD ALERT FUNCTION
void sendAlert(){

  if(WiFi.status()==WL_CONNECTED){

    HTTPClient http;

    http.begin(cloudURL);
    http.addHeader("Content-Type","application/json");

    String jsonData =
      "{\"deviceId\":\"ESP32\",\"latitude\":17.385,\"longitude\":78.486,\"fallDetected\":true}";

    int res = http.POST(jsonData);

    Serial.print("Cloud: ");
    Serial.println(res);

    http.end();
  }
}