package org.openhs.core.commons;

import java.util.Date;

public class Weather {	
	
	public Temperature tempMax = 	new Temperature ();
	public Temperature tempMin = 	new Temperature ();
	public Temperature temp = 	new Temperature ();
	
	public Humidity hum = 	new Humidity ();
	
	Date date = new Date ();
	
	public String location = "Brno";
	
    protected float pressure;
    protected float cloudsPercent;        
    protected float humidity;
    protected float windSpeed;
    protected float windDegree;    
    protected float rain;
    protected float snow;	
    
    protected int weatherSymbol; //0: not set, 1:Sunny, 2:Sunny with Cloud, 3: Cloudy, 4: Cloudy+Rain, 5:Cloudy+Storm, 6: Cloudy+Snow  
    
    public Weather () {
    	this.pressure = Float.NaN;
        this.windSpeed = Float.NaN;
        this.windDegree = Float.NaN;
        this.cloudsPercent = Float.NaN;
        this.rain = Float.NaN;
        this.snow = Float.NaN;       
        
        this.weatherSymbol = 0;
    }    
    
    /**
     * @return Percentage of all clouds if available, otherwise <code>Float.NaN</code>.
     */
    public float getPercentageOfClouds() {
        return this.cloudsPercent;
    }
    
    public void setPercentageOfClouds(float percentage) {
    	this.cloudsPercent = percentage;
    }
    
    public float getPressure() {
        return this.pressure;
    }
    
    public void setPressure(float pressure) {
    	this.pressure = pressure;
    }
    
    public Temperature getTemperature() {
    	return this.temp;
    }
    
    public void setWindSpeed(float windSpeed) {
    	this.windSpeed = windSpeed;
    }
    
    public float getWindSpeed() {
    	return this.windSpeed;
    }     
    
    public void setWindDegree(float windDegree) {
    	this.windDegree = windDegree;
    }
    
    public void setWeatherSymbol(int weatherSymbol) {
    	this.weatherSymbol = weatherSymbol;
    }  
    public int getWeatherSymbol() {
    	return this.weatherSymbol;
    }     
    
}
