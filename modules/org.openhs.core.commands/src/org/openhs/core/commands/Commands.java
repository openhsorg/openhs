package org.openhs.core.commands;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openhs.core.commons.Configuration;
import org.openhs.core.commons.Message;
import org.openhs.core.commons.Temperature;
import org.openhs.core.site.data.ISiteService;

public class Commands implements ICommands {

	 /*
     * Basic data structure.
     */
    ISiteService m_siteService = null;	
    
    /*
     * Messages.
     */
	Message msg = new Message ();

	/*
	 * Methods
	 */
    void activate() {
    	msg.println("org.openhs.core.commands: activate");    	    	
    }

    void deactivate() {
    	msg.println("org.openhs.core.commands: deactivate");
    }

    void setService(ISiteService ser) {
    	msg.println("org.openhs.core.commands: Set ISiteService");
        m_siteService = ser;             
    }	
    
    public boolean setCommand (String commandIn) {
    	
    	//Example: Sensor:Sensor1;temp:23.20;
    	
    	String pattern1;
		String pattern2;
		Pattern p;
		Matcher m;			
		
    	if (commandIn.contains("Sensor:"))
    	{
			pattern1 = "Sensor:";
			pattern2 = ";";
			
			p = Pattern.compile(Pattern.quote(pattern1) + "(.*?)" + Pattern.quote(pattern2));
			m = p.matcher(commandIn);    	
			
			String sensorName = "";
			
			while (m.find()) {    
			
				sensorName = m.group(1);
			}
    		
    		if (commandIn.contains("temp:"))
    		{
     			
    			pattern1 = "temp:";
    			pattern2 = ";";
    			
    			p = Pattern.compile(Pattern.quote(pattern1) + "(.*?)" + Pattern.quote(pattern2));
    			m = p.matcher(commandIn);
    			
    			while (m.find()) {        			 
    			  
    			  double f = Double.parseDouble(m.group(1));
    			  
    			  System.out.println("COMMAND:> Sensor: "+ sensorName + " Temp: " + String.format("%.2f", f));
    			  
    			  Temperature temp = new Temperature ();
    			  
    			  temp.set(f);        			  
    			          			  
    			  if (!this.m_siteService.setSensorTemperature("Room1", sensorName, temp)) {
    				  System.out.println("Cannot write temp :(");
    			  }  
    			  
    			}
    		}        		
    	}     	
    	
    	return true;
    }
}
