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
        
    float humidity;
    float windSpeed;
    float windDegree;
    
    float rain;
    float snow;	
    
    public Weather () {
    	this.pressure = Float.NaN;
        this.windSpeed = Float.NaN;
        this.windDegree = Float.NaN;
        this.cloudsPercent = Float.NaN;
        this.rain = Float.NaN;
        this.snow = Float.NaN;       
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
    

}
