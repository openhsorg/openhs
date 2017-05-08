
#include <ESP8266WiFi.h>
#include <Homie.h>
#include <Wire.h>  // Include Wire if you're using I2C
#include <SFE_MicroOLED.h>  // Include the SFE_MicroOLED library
#include "FS.h"

#define PIN_RESET 255  // Connect RST to pin 9 (req. for SPI and I2C)
#define DC_JUMPER 0

MicroOLED oled(PIN_RESET, DC_JUMPER); // Example I2C declaration

HomieNode displayNode("display", "display");

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
  } else {

    oled.setFontType(0);  // Set font to type 1
    oled.clear(PAGE);     // Clear the page
    oled.setCursor(0, 10); // Set cursor to top-left
    oled.print("OpenHS");  
    oled.setCursor(0, 20); // Set cursor to top-left
    oled.print(value);
    oled.display();
  }

  return true;
}  

void setup() {
  oled.begin();
  oled.clear(ALL);
  oled.setFontType(0);  // Set font to type 1
  oled.clear(PAGE);     // Clear the page
  oled.setCursor(0, 10); // Set cursor to top-left
  oled.print("OpenHS");
  oled.display();  
  
  Homie.setFirmware("OpenHS display", "1.0.0");
  Homie.registerNode(displayNode);
  displayNode.subscribe("message", messageHandler);    
  Homie.setup();
}

void loop() {
  Homie.loop();  
}

