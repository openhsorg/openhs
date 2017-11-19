/**
* @name		WeatherData.java 11/18/2017
* @author	Michal Valny
* @version	1.0
* @description 	Weather data...
* 
*/

package org.openhs.core.commons;

import java.util.Date;

public class WeatherData {
	
	public boolean validity = false;
	
	//Date date = new Date ();
	
	public String location = "Brno";
	
	public float temp;
	public float tempMin;
	public float tempMax;
	public float hum;
    public float pressure;
    public float cloudsPercent;        
    public float windSpeed;
    public float windDegree;    
    public float rain;
    public float snow;	
    
    public int weatherSymbol = 0; //0: not set, 1:Sunny, 2:Sunny with Cloud, 3: Cloudy, 4: Cloudy+Rain, 5:Cloudy+Storm, 6: Cloudy+Snow  
    
    public WeatherData () {

    }        
    
	public String toString() {
		
		String out = "";
		
		out = out + "\n validity: " + validity;
		out = out + "\n temp: " + temp;
		out = out + "\n hum: " + hum;

		return out;
	}    
}
