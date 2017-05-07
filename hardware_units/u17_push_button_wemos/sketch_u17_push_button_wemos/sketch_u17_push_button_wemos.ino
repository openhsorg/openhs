#include <ESP8266WiFi.h>
#include <Homie.h>

const int buttonPin = D3;
const int ledPin = BUILTIN_LED;
//int buttonState = 0;
int lastButtonState = -1;  

HomieNode buttonNode("button", "button");
Bounce debouncer = Bounce();

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
  Homie.setSetupFunction(setupHandler);
  Homie.setLoopFunction(loopHandler);  
  Homie.setup();
}

void loop() {
  Homie.loop();
  debouncer.update(); 
}

