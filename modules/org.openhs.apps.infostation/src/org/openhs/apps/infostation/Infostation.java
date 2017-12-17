package org.openhs.apps.infostation;

import java.util.Calendar;
import java.util.Map;

import org.openhs.core.commons.InfoStationData;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Infostation {
	
	private Logger logger = LoggerFactory.getLogger(Infostation.class);
	
	public ISiteService m_siteService = null;   
	
	private Map<String, Object> m_properties = null;
	
	public void activate (ComponentContext componentContext, Map<String, Object> properties) {
		
		updated(properties);
		
	}
	
	public void deactivate () {
		
	}
	
	public void updated(Map<String, Object> properties) {
		m_properties = properties;

	}		
	
    public void setService(ISiteService ser) {
    	  logger.info("**** setService(): ISiteService");
          m_siteService = ser;
          
      }

      public void unsetService(ISiteService ser) {
    	  logger.info("**** unsetService(): ISiteService");
          if (m_siteService == ser) {
              ser = null;
          }
      }  	
      
      public InfoStationData getData () {
    	  
    	  InfoStationData data = new InfoStationData ();    	  
    	  // Name from file    	     	  
    	  
    	  data.validity = true;
    	  data.tmpInPath = (String) this.m_properties.get("tempIn_SitePath");
    	  data.tmpOutPath = (String) this.m_properties.get("tempOut_SitePath");
    	  
    	  return data;    	  
      }      
      
      public KidEvents getKidEvents() {
    	  
    	  KidEvents ke = new KidEvents ();
    	      	  
		  // Decision by time
		  Calendar currentTime = Calendar.getInstance();
		  Calendar schoolTime = Calendar.getInstance();
		  Calendar schoolClosedTime = Calendar.getInstance();
		  schoolTime.set(Calendar.HOUR_OF_DAY, 7);
		  schoolTime.set(Calendar.MINUTE, 25);
		  schoolTime.set(Calendar.SECOND, 0);
		  schoolTime.set(Calendar.MILLISECOND, 0);
		  schoolClosedTime.set(Calendar.HOUR_OF_DAY, 7);
		  schoolClosedTime.set(Calendar.MINUTE, 45);
		  schoolClosedTime.set(Calendar.SECOND, 0);
		  schoolClosedTime.set(Calendar.MILLISECOND, 0);	  
		
		  if (currentTime.after(schoolTime) && currentTime.before(schoolClosedTime)) {
			  ke.goToSchool = true;
		  } else {
			  ke.goToSchool = false;
		  }    	 
		  
		  Calendar bathTime = Calendar.getInstance();
		  Calendar bathTimeEnd = Calendar.getInstance();
		  bathTime.set(Calendar.HOUR_OF_DAY, 19);
		  bathTime.set(Calendar.MINUTE, 0);
		  bathTime.set(Calendar.SECOND, 0);
		  bathTime.set(Calendar.MILLISECOND, 0);
		  bathTimeEnd.set(Calendar.HOUR_OF_DAY, 19);
		  bathTimeEnd.set(Calendar.MINUTE, 30);
		  bathTimeEnd.set(Calendar.SECOND, 0);
		  bathTimeEnd.set(Calendar.MILLISECOND, 0);	
		  
		  if (currentTime.after(bathTime) && currentTime.before(bathTimeEnd)) {
			  ke.bathTime = true;
		  } else {
			  ke.bathTime = false;
		  }   	
		  
		  Calendar sleepTime = Calendar.getInstance();
		  Calendar sleepTimeEnd = Calendar.getInstance();
		  sleepTime.set(Calendar.HOUR_OF_DAY, 20);
		  sleepTime.set(Calendar.MINUTE, 0);
		  sleepTime.set(Calendar.SECOND, 0);
		  sleepTime.set(Calendar.MILLISECOND, 0);
		  sleepTimeEnd.set(Calendar.HOUR_OF_DAY, 20);
		  sleepTimeEnd.set(Calendar.MINUTE, 30);
		  sleepTimeEnd.set(Calendar.SECOND, 0);
		  sleepTimeEnd.set(Calendar.MILLISECOND, 0);	
		  
		  if (currentTime.after(sleepTime) && currentTime.before(sleepTimeEnd)) {
			  ke.sleepTime = true;
		  } else {
			  ke.sleepTime = false;
		  }   
		  		  
		  Calendar lunchTime = Calendar.getInstance();
		  Calendar lunchTimeEnd = Calendar.getInstance();
		  lunchTime.set(Calendar.HOUR_OF_DAY, 11);
		  lunchTime.set(Calendar.MINUTE, 30);
		  lunchTime.set(Calendar.SECOND, 0);
		  lunchTime.set(Calendar.MILLISECOND, 0);
		  lunchTimeEnd.set(Calendar.HOUR_OF_DAY, 12);
		  lunchTimeEnd.set(Calendar.MINUTE, 30);
		  lunchTimeEnd.set(Calendar.SECOND, 0);
		  lunchTimeEnd.set(Calendar.MILLISECOND, 0);	
		  
		  if (currentTime.after(lunchTime) && currentTime.before(lunchTimeEnd)) {
			  ke.lunchTime = true;
		  } else {
			  ke.lunchTime = false;
		  } 		      	  		  
    	  
    	  return ke;
      }

}
