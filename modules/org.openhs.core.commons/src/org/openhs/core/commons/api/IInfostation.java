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
import java.util.Set;

import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.Weather;
import org.openhs.core.commons.Floor;

public interface IInfostation {

	public boolean setSwitch (String sitePath);
	public boolean setSwitch (String sitePath, boolean state);
	public float getTempIn();
	public float getTempOut();
	public Weather getForecastWeather6();
	public float getCloudsForecast();
	public float getTempForecast();
	public boolean isFrost();
	public ArrayList<Weather> getForecasts();
	public int getNumberFloors();	
	public Set<Floor> getFloors ();
	public Set<String> getFloorsPaths () throws SiteException;
	public Set<String> getRoomsPaths () throws SiteException;
	public Set<String> getTempSensorsPaths () throws SiteException;
	public Set<String> getSwitchPaths () throws SiteException;
	public Thing getThing (String thingPath) throws SiteException;
	public Set<String> getThingPaths (Class<?> t) throws SiteException;
	public boolean isClosed (Thing m_thing) throws SiteException;
	public boolean isLocked (Thing m_thing) throws SiteException;

}
