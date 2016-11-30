/*
  License TBD Christian Moll
*/
 
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#include <MQTTClient.h>

const int buttonPin = D3;
const int ledPin = BUILTIN_LED;

int buttonState = 0;
 
const char* host = "192.168.1.1";
const char* ssid = "MERVIN_2G";
const char* password = "lamicekskace11";
 
WiFiClient net;
MQTTClient mqtt;
 
void connect();
 
void setup(void){

  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);

  // set initial state, LED off
  digitalWrite(ledPin, buttonState); 
 
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

  // read button state, HIGH when pressed, LOW when not
  buttonState = digitalRead(buttonPin);

  // if the push button pressed, switch on the LED
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);  // LED on    
  } else {
    digitalWrite(ledPin, LOW); // LED off
    mqtt.publish("test", "PUSH BUTTON>>> Down...");
  }  

  delay(500);
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
 

