/*
 * OpenHS Wifi Relay
 * Michal Valny, michal.valny@openhs.org
 * May-2017
 */

#include <ESP8266WiFi.h>
#include <Homie.h>
#include "FS.h"

const int buttonPin = D3;
const int ledPin = BUILTIN_LED;
int lastButtonState = -1;  

HomieNode buttonNode("button", "button");
Bounce debouncer = Bounce();

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
  pinMode(buttonPin, INPUT);
  digitalWrite(buttonPin, HIGH);    

  debouncer.attach(buttonPin);
  debouncer.interval(100);     
}

void loopHandler () {
  int buttonState = debouncer.read();

  if (buttonState != lastButtonState) {

    if (buttonState == HIGH) { 
      Serial.println("Button is RELEASED...");
    } else {
      Serial.println("Button is PRESSED...");

      Homie.setNodeProperty(buttonNode, "status", "pressed", true);
    }

    lastButtonState = buttonState;
  }    
}


void setup() {
  Homie.setFirmware("OpenHS button", "1.0.0");
  Homie.registerNode(buttonNode);
  buttonNode.subscribe("message", messageHandler);    
  Homie.setSetupFunction(setupHandler);
  Homie.setLoopFunction(loopHandler);  
  Homie.setup();
}

void loop() {
  Homie.loop();
  debouncer.update(); 
}

