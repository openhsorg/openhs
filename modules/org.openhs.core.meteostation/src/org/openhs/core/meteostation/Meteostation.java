/**
* @name		Meteostation.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	It keeps meteostation data.
*
*/

package org.openhs.core.meteostation;

import java.util.ArrayList;
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Weather;
import org.openhs.core.weather.OpenhsWeather;

public class Meteostation {
	
	TextOutput msg = new TextOutput ();

    /*
     * Basic data structure.
     */
    public ISiteService m_siteService = null;    
    
    public OpenhsWeather m_weather = null;
    

    /*
     * What sensors we deal with.
     */
    public String sensorInString = "***";
    public String sensorOutString = "Room1/Sensor1";

    /*
     * Indicators.
     */
    ArrayList<Boolean> list = new ArrayList<Boolean>();
    /*
     * [0]: Frost outside
     * [1]: Day/Night time
     * [2]: Intruder outside
     */
        
    public void activate() {
    	msg.println("org.openhs.core.meteostation: activate"); 	    	
    }

    public void deactivate() {
    	msg.println("org.openhs.core.meteostation: deactivate");
    }

    public void setService(ISiteService ser) {
    	msg.println("org.openhs.core.meteostation: Set ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
    	msg.println("org.openhs.core.meteostation: UnSet ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }   
    
    public void setWService(OpenhsWeather ser) {
    	msg.println("org.openhs.core.meteostation: Set IOpenhsWeather");
    	m_weather = ser;
    }

    public void unsetWService(OpenhsWeather ser) {
    	msg.println("org.openhs.core.meteostation: UnSet IOpenhsWeather");
        if (m_weather == ser) {
            ser = null;
        }
    } 

    /*
     * Constructor
     */
    public Meteostation() {
        list.add(false); // Frost indicator...
        list.add(false); // Daylight time indicator...
        list.add(false); // Movedetection outside...
    }    

    public Sensor getSensorIn() throws SiteException {
        return getSensor(sensorInString);
    }

    public Sensor getSensorOut() throws SiteException {
        return getSensor(sensorOutString);
    }

    public Sensor getSensor(String key) throws SiteException {
        Sensor sensor;

        try {
            String delims = "[/]";
            String[] tokens = key.split(delims);

            sensor = m_siteService.getSensor(tokens[0], tokens[1]);
        } catch (Exception ex) {
            throw ex;
        }

        return sensor;
    }

    public ArrayList<Boolean> getIndicatorsList() {
        try {
            setFrostIndicator();

            setDaylightTimeIndicator();
        } catch (Exception ex) {

        }

        return list;
    }
    
    public boolean isFrost() {
    	return (getTempOut() <= 0.0);
    }
    
    public boolean isDayTime() {
    	return true;
    }    

    /*
     * Set Frost indicator based on outside temperature.
     */
    void setFrostIndicator() throws SiteException {
        double tempOut;

        try {
            tempOut = getSensorOut().getTemperature().getCelsius();
        } catch (Exception ex) {
            throw ex;
        }

        // System.out.println("\nTemp: " + tempOut);

        list.set(0, (tempOut < 0.0));
    }

    /*
     * Set daylight time based on global time.
     */
    void setDaylightTimeIndicator() {

        // list.set(1, true);

    }

    /*
     * Set movedetection outside.
     */
    void setIntruderOutsideIndicator() throws SiteException {
        boolean intruder = false;

        try {
            intruder = getSensorOut().getMovedetection().getDetection();
        } catch (Exception ex) {
            throw ex;
        }

        list.set(2, intruder);
    }
    
    public Weather getCurrentWeather() {
    	return this.m_weather.getCurrentWeather();
    }
    
    public float getTempIn() {
    	float temp = Float.NaN;
    	
    	try {
    		Temperature tIn =  this.getSensorIn().getTemperature();
    	
    		temp = (float) tIn.getCelsius();
    	
    	} catch (Exception ex) {
    		return Float.NaN;    		
    	}
    	
    	return temp;
    }
    
    public float getTempOut(){
  	  
  	  float tmp = -5f;
  	  
  	  Weather wet = getCurrentWeather();
  	  
  	  Temperature temp = wet.getTemperature();
  	  
  	  tmp = (float) temp.getCelsius();
  	  	  
  	  return tmp;
   }	    

}
