package org.openhs.core.weather;

import org.openhs.core.commons.Weather;
import org.openhs.core.commons.WeatherForecast;
import org.openhs.core.weather.openweathermap.CurrentWeather;
import org.openhs.core.weather.openweathermap.OpenWeatherMap;
import org.openhs.core.weather.openweathermap.CurrentWeather.Clouds;
import org.openhs.core.weather.openweathermap.OpenWeatherMap.Units;

public class GatherData extends Thread {
	
	private Weather currWeather = new Weather ();
	private WeatherForecast forecastWeather = new WeatherForecast ();	
	
	OpenWeatherMap owm = new OpenWeatherMap(Units.METRIC, "152a8e3493c08a3bfa9eb3170ee23d6d");
	
	private volatile boolean running = true;

	public void run() {
		
		while (running) {
			gatherData();		
			
          	try {
				Thread.sleep (2000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				running = false;
			}						
		}		
	}
	
    public void stopThread() {
        running = false;
    }	
    
    private void gatherData () {
    	
    	gatherCurrentWeather();
    	
    }
    
    private void gatherCurrentWeather () {
    	try {
    		
    		CurrentWeather cwd = owm.currentWeatherByCityName(currWeather.location);
    		
    		currWeather.tempMax.set(cwd.getMainInstance().getMaxTemperature());
    		currWeather.tempMin.set(cwd.getMainInstance().getMinTemperature());
    		currWeather.temp.set(cwd.getMainInstance().getTemperature());
    		
    		currWeather.hum.set(cwd.getMainInstance().getHumidity());
    		currWeather.setPressure(cwd.getMainInstance().getPressure());
    		    		
    		Clouds clds = cwd.getCloudsInstance();    		
    		currWeather.setPercentageOfClouds(clds.getPercentageOfClouds());    		    		    		    		
    		
    	} catch (Exception ex) {
    		
    	}
    	    	
    }
    
    private void gatherForecastWeather () {
    	
    }    
    
    
    public Weather getCurrentWeather() {
    	return this.currWeather;
    }    
}
