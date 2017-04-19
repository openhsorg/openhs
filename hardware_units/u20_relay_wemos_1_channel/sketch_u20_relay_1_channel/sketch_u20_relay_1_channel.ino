/*
  License TBD Christian Moll
*/
 
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <MQTTClient.h>
 
const char* host = "192.168.1.1";
const char* ssid = "xxx";
const char* password = "xxx";
 
WiFiClient net;
MQTTClient mqtt;

const int relayPin = D1;
 
void connect();
 
void setup(void){
 
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);
 
  Serial.begin(115200);
  Serial.println();
  Serial.println("Booting Sketch...");
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);
 
  mqtt.begin("192.168.1.26", net);
 
  connect();
  Serial.printf("ready!");
}
 
void loop(void){
  if(!mqtt.connected()) {
    connect();
  }
 
  mqtt.loop();  
  /*
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  
  if (!isnan(h) && !isnan(t)) {
    mqtt.publish("Wmos", "{\"Type\":\"Thermometer\",\"Addr\":\"192.168.1.26\",\"Temperature\":" + String(t) + "}");
    mqtt.publish("Wmos", "{\"Type\":\"Hygrometer\",\"Addr\":\"192.168.1.26\",\"Humidity\":" + String(h) + "}");
    // mqtt.publish("Wmos", "{Temp: \"" + String(t) + "\"}");
    // mqtt.publish("Wmos", "{Hum:  \"" + String(h) + "\"}");
  }
*/



  delay(5000); 
}
 
void connect() {
  while(WiFi.waitForConnectResult() != WL_CONNECTED){
    WiFi.begin(ssid, password);
    Serial.println("WiFi failed, retrying.");
  }
 
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
 
  while (!mqtt.connect("WmosClient", "usr", "pswd")) {
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

  if (payload == "ON") {
    digitalWrite(relayPin, HIGH);
    
  } else if (payload == "OFF"){
    digitalWrite(relayPin, LOW);
    
  }
    
}

