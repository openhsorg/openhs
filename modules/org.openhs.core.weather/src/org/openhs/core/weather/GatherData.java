package org.openhs.core.weather;

import java.util.ArrayList;

import org.openhs.core.commons.Weather;
import org.openhs.core.commons.WeatherForecast;
import org.openhs.core.weather.openweathermap.CurrentWeather;
import org.openhs.core.weather.openweathermap.HourlyForecast;
import org.openhs.core.weather.openweathermap.OpenWeatherMap;
import org.openhs.core.weather.openweathermap.CurrentWeather.Clouds;
import org.openhs.core.weather.openweathermap.HourlyForecast.Forecast;
import org.openhs.core.weather.openweathermap.OpenWeatherMap.Units;

public class GatherData extends Thread {
	
	private String API_Key = "152a8e3493c08a3bfa9eb3170ee23d6d";
	private String cityName = "Brno";
	
	private Weather currWeather = new Weather ();			
	private ArrayList<Weather> forecast = new ArrayList<Weather> ();	
	private OpenWeatherMap owm = new OpenWeatherMap(Units.METRIC, API_Key);
	
	private volatile boolean running = true;

	public void run() {
		
		while (running) {
			gatherData();		
			
          	try {
				Thread.sleep (10000);
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
    	
    	gatherForecastWeather ();
    	
    }
    
    private void gatherCurrentWeather () {
    	try {
    		
    		CurrentWeather cwd = owm.currentWeatherByCityName(cityName);
    		
    		currWeather = fillCurrWeather(cwd);
    		/*
    		currWeather.tempMax.set(cwd.getMainInstance().getMaxTemperature());
    		currWeather.tempMin.set(cwd.getMainInstance().getMinTemperature());
    		currWeather.temp.set(cwd.getMainInstance().getTemperature());
    		
    		currWeather.hum.set(cwd.getMainInstance().getHumidity());
    		currWeather.setPressure(cwd.getMainInstance().getPressure());
    		    		
    		Clouds clds = cwd.getCloudsInstance();    		
    		currWeather.setPercentageOfClouds(clds.getPercentageOfClouds());  
    		*/
    		
    	} catch (Exception ex) {
    		
    	}    	    	
    }
    
    private Weather fillCurrWeather(CurrentWeather curr) {
    	Weather wth = new Weather();
    	
    	wth.location = curr.getCityName();
	
		wth.tempMax.set(curr.getMainInstance().getMaxTemperature());
		wth.tempMin.set(curr.getMainInstance().getMinTemperature());
		wth.temp.set(curr.getMainInstance().getTemperature());
		
		wth.hum.set(curr.getMainInstance().getHumidity());
		wth.setPressure(curr.getMainInstance().getPressure());
		    		
		Clouds clds = curr.getCloudsInstance();    		
		wth.setPercentageOfClouds(clds.getPercentageOfClouds());       
					
    	return wth;    	
    }
    
    private Weather fillForecast(Forecast fcs) {
    	Weather wth = new Weather();
    	
    	wth.location = cityName;
    	
    	wth.temp.set(fcs.getMainInstance().getTemperature());
    	wth.setPercentageOfClouds(fcs.getCloudsInstance().getPercentageOfClouds());
    	wth.setWindDegree(fcs.getWindInstance().getWindDegree());
    	wth.setWindSpeed(fcs.getWindInstance().getWindSpeed());

    	return wth;    	
    }    
    
    private void gatherForecastWeather () {    	
    	
    	try {    		
    		HourlyForecast fcst = owm.hourlyForecastByCityName(cityName);   		    		
    		
    		System.out.println("\n\n------Number forecasts: " + fcst.getNumberForecasts());
    		
    		forecast.clear();
    		
    		for (int i = 0; i < fcst.getNumberForecasts(); i++) {
    			Forecast fcs = fcst.getForecastInstance(i);
    			
    			forecast.add(fillForecast(fcs));    			    			    			
    		}
    		
    	} catch (Exception ex) {
    		
    	}    	    	
    }    
        
    public Weather getCurrentWeather() {
    	return this.currWeather;
    }    
    
    public Weather getForecastWeather6() {
    	return forecast.get(1);    	
    }      
}
