/**
 * Test number 2...
 */

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
	
	private volatile boolean running = true; //

	public void run() {
		
		while (running) {
			gatherData();		
			
          	try {
				Thread.sleep (1000 * 60 * 15); //every 15 minutes 
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
		
    	//Add some additional logic...
    	setWeatherSymbol (wth);		
					
    	return wth;    	
    }
    
    private Weather fillForecast(Forecast fcs) {
    	Weather wth = new Weather();
    	
    	wth.location = cityName;
    	
    	wth.temp.set(fcs.getMainInstance().getTemperature());
    	wth.setPercentageOfClouds(fcs.getCloudsInstance().getPercentageOfClouds());
    	wth.setWindDegree(fcs.getWindInstance().getWindDegree());
    	wth.setWindSpeed(fcs.getWindInstance().getWindSpeed());
    	    	
    	//Add some additional logic...
    	setWeatherSymbol (wth);

    	return wth;    	
    }  
    
    private void setWeatherSymbol (Weather m_weather) {
    	
    	if (m_weather.getPercentageOfClouds() != Float.NaN) {
    		if (m_weather.getPercentageOfClouds() <= 20) {
    			m_weather.setWeatherSymbol(1);
    		} else if (m_weather.getPercentageOfClouds() > 20 && m_weather.getPercentageOfClouds() <= 70) {
    			m_weather.setWeatherSymbol(2);
    		} else {
    			m_weather.setWeatherSymbol(3);
    		}
    	}    	
    }
    
    private void gatherForecastWeather () {    	
    	
    	try {    		
    		HourlyForecast fcst = owm.hourlyForecastByCityName(cityName);   		    		
    		
    		//System.out.println("\n\n------Number forecasts: " + fcst.getNumberForecasts());
    		
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
