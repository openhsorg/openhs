/**
* @name		Site.java 01/03/2017
* @author	Michal Valny
* @version	1.0
* @description 	General interface for "org.openhs.core.infostation.Infostation" module.
* 
*/
package org.openhs.core.commons.api;

import java.util.ArrayList;
import java.util.List;

import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Weather;

public interface IInfostation {

	public boolean setSwitch (String sitePath);
	public List<Boolean> getSwitchState (String sitePath) throws SiteException;
	public float getTempIn();
	public float getTempOut();
	public Weather getForecastWeather6();
	public float getCloudsForecast();
	public float getTempForecast();
	public boolean isFrost();
	public ArrayList<Weather> getForecasts();
}
