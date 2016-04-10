#include <dht.h>

dht DHT;

#define DHT22_PIN 5

void setup()
{
    Serial.begin(9600);
}

void loop()
{
    // READ DATA
    Serial.print("DHT22, \t");
    int chk = DHT.read22(DHT22_PIN);
    switch (chk)
    {
        case DHTLIB_OK: 
           // Serial.print("OK,\t"); 
            break;
        case DHTLIB_ERROR_CHECKSUM: 
            Serial.print("Checksum error,\t"); 
            break;
        case DHTLIB_ERROR_TIMEOUT: 
            Serial.print("Time out error,\t"); 
            break;
        default: 
            Serial.print("Unknown error,\t"); 
            break;
    }
    
    // Sent sensor data   
    if (chk == DHTLIB_OK)
    {
      Serial.print(" ohs ");
      Serial.print(" device=");
      Serial.print("sensor ");
      Serial.print(" name=");
      Serial.print("Sensor1 ");     
      Serial.print(" temp=");
      Serial.print(DHT.temperature, 1);
      Serial.print(" hum=");
      Serial.print(DHT.humidity, 1);      
      Serial.print(" \n");
    }

    delay(1000);
}
