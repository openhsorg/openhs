package org.openhs.core.weather;

import java.util.ArrayList;

import org.openhs.core.commons.Weather;
import org.openhs.core.commons.WeatherData;
import org.openhs.core.commons.api.IOpenhsWeather;

public class OpenhsWeather implements IOpenhsWeather {
			
	private GatherData m_gather = new GatherData ();
	
	public void activate (){		
		m_gather.start();
	}
	
	public void deactivate (){		
		m_gather.stopThread();
        try {
        	m_gather.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }				
	}
	
	/**
	 * Get Weather object.
	 */
	public Weather getCurrentWeather() {
		return this.m_gather.getCurrentWeather();
	}
	
	public WeatherData getCurrentWeatherData() {
		return this.m_gather.getCurrentWeatherData();
	}	

	/**
	 * Get Weather Forecast object.
	 */
	public Weather getForecastWeather6() {
		return this.m_gather.getForecastWeather6();
	}	
	
	/**
	 * Get all forecasts...
	 * @return
	 */
	public ArrayList<Weather> getForecasts() {
		return this.m_gather.getForecasts();
	}	
	
	public ArrayList<WeatherData> getForecastsData() {
		return this.m_gather.getForecastsData();
	}	

}
