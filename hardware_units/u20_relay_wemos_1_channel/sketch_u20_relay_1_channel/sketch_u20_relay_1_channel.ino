#include <ESP8266WiFi.h>
#include <Homie.h>
#include "FS.h"

const int relayPin = D1;

HomieNode relayNode("relay", "switch");

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

bool messageHandler2(String value) {  
  if (value == "true") {
    digitalWrite(relayPin, HIGH);
    Homie.setNodeProperty(relayNode, "on", "true"); // Update the state of the light
    Serial.println("Relay is on");
  } else if (value == "false") {
    digitalWrite(relayPin, LOW);
    Homie.setNodeProperty(relayNode, "on", "false");
    Serial.println("Relay is off");
  } else {
    return false;
  }     

  return true;
}  

void setupHandler() {
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);      
}


void setup() {

  Homie.setFirmware("OpenHS relay", "1.0.0");
  Homie.registerNode(relayNode);
  relayNode.subscribe("message", messageHandler);    
  relayNode.subscribe("on", messageHandler2);
  Homie.setSetupFunction(setupHandler);
  Homie.setup();
}

void loop() {
  Homie.loop();  
}

