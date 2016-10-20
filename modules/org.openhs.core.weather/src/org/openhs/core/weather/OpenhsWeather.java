package org.openhs.core.weather;

import org.openhs.comm.api.IOpenhsWeather;
import org.openhs.core.commons.Weather;

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

	/**
	 * Get Weather Forecast object.
	 */
	public Weather getForecastWeather6() {
		return this.m_gather.getForecastWeather6();
	}	
}
