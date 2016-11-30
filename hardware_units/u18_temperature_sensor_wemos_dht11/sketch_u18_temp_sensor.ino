/*
  License TBD Christian Moll
*/
 
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
 
#include "DHT.h"
#include <MQTTClient.h>
 
#define DHTTYPE DHT11
#define DHTPIN D4
 
const char* host = "192.168.1.1";
const char* ssid = "MERVIN_2G";
const char* password = "lamicekskace11";
 
WiFiClient net;
MQTTClient mqtt;
 
DHT dht(DHTPIN, DHTTYPE);
 
void connect();
 
void setup(void){
 
  dht.begin();
 
  Serial.begin(115200);
  Serial.println();
  Serial.println("Booting Sketch...");
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);
 
  mqtt.begin("192.168.1.211", net);
 
  connect();
  Serial.printf("ready!");
}
 
void loop(void){
  if(!mqtt.connected()) {
    connect();
  }
 
  mqtt.loop();  
  
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  
  if (!isnan(h) && !isnan(t)) {
    mqtt.publish("test", "Temp: " + String(t));
    mqtt.publish("test", "Hum: " + String(h));
  }

  delay(2000); 
}
 
void connect() {
  while(WiFi.waitForConnectResult() != WL_CONNECTED){
    WiFi.begin(ssid, password);
    Serial.println("WiFi failed, retrying.");
  }
 
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
 
  while (!mqtt.connect(host, "test", "test")) {
    Serial.print(".");
  }
  Serial.println("\nconnected!");
}
 
 
void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  Serial.print("incoming: ");
  Serial.print(topic);
  Serial.print(" - ");
  Serial.print(payload);
  Serial.println();
}
 
double mapDouble(double x, double in_min, double in_max, double out_min, double out_max)
{
  double temp = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  temp = (int) (4*temp + .5);
  return (double) temp/4;
}

