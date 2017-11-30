package org.openhs.core.commons.api;

import java.util.ArrayList;

import org.openhs.core.commons.Weather;
import org.openhs.core.commons.WeatherData;

public interface IOpenhsWeather {
	
	public void activate ();
	public void deactivate ();
	public Weather getCurrentWeather();
	public WeatherData getCurrentWeatherData();
	public ArrayList<WeatherData> getForecastsData();

}
