#include <ESP8266WiFi.h>
#include <Homie.h>
#include "FS.h"
#include "DHT.h"

#define DHTTYPE DHT11
#define DHTPIN D4

const int TEMPERATURE_INTERVAL = 30; // 30 sec...

unsigned long lastTemperatureSent = 0;

DHT dht(DHTPIN, DHTTYPE);

HomieNode temperatureNode("temperature", "temperature");

void format () {

  SPIFFS.format();    
  delay(500);
  ESP.reset();  
}

bool messageHandler(String value) {

  Serial.print("Message:");
  Serial.print(value);

  //Switch back to config mode...
  if (value == "configuration mode"){
    format();
  } else if (value == "reset") {
    ESP.reset();
  }

  return true;
}  

void setupHandler() {

  dht.begin();
  
  Homie.setNodeProperty(temperatureNode, "unit", "c", true);      
}

void loopHandler () {

  if (millis() - lastTemperatureSent >= TEMPERATURE_INTERVAL * 1000UL || lastTemperatureSent == 0) {

    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();


    humidity = dht.readHumidity();
    temperature = dht.readTemperature();    
  
   // float temperature = 22; // Fake temperature here, for the example
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
    if (Homie.setNodeProperty(temperatureNode, "degrees", String(temperature), true)) {
      lastTemperatureSent = millis();
    } else {
      Serial.println("Temperature sending failed");
    }

    if (Homie.setNodeProperty(temperatureNode, "humidity", String(humidity), true)) {
      lastTemperatureSent = millis();
    } else {
      Serial.println("Temperature sending failed");
    }
    
  }  
}


void setup() {

  Homie.setFirmware("OpenHS temperature", "1.0.0");
  Homie.registerNode(temperatureNode);
  temperatureNode.subscribe("message", messageHandler);    
  Homie.setSetupFunction(setupHandler);
  Homie.setLoopFunction(loopHandler);  
  Homie.setup();
}

void loop() {
  Homie.loop();
}

