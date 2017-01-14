/**
* @name		Site.java 01/03/2017
* @author	Michal Valny
* @version	1.0
* @description 	General interface for "org.openhs.core.Meteostation" module.
* 
*/

package org.openhs.core.commons.api;

import java.util.ArrayList;
import org.openhs.core.commons.Weather;

public interface IMeteostation {
	
	public void activate ();
	public void deactivate ();	
	public boolean isFrost();
	public boolean isDayTime();
	public float getCloudsForecast();
	public float getTempForecast();
	public Weather getCurrentWeather();
	public Weather getForecastWeather6();
	public ArrayList<Weather> getForecasts();
	public float getTempIn();
	public float getTempOut();

}
