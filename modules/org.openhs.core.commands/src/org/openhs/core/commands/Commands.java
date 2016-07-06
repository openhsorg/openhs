package org.openhs.core.commands;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openhs.core.commons.Configuration;
import org.openhs.core.commons.Message;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Humidity;
import org.openhs.core.site.data.ISiteService;
import java.util.Scanner;

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
    	//Example: ohs device=sensor name=Sensor1 temp1=22.10 hum=88.5
    	
    	String pattern1;
		String pattern2;
		Pattern p;
		Matcher m;			
		
    	if (commandIn.contains("ohs"))
    	{
			pattern1 = "device=";
			pattern2 = " ";
			
			p = Pattern.compile(Pattern.quote(pattern1) + "(.*?)" + Pattern.quote(pattern2));
			m = p.matcher(commandIn);    	
			
			String deviceName = "";
			
			while (m.find()) {    
				
				deviceName = m.group(1);
			}			
			
			//System.out.println("COMMAND:> device: "+ deviceName);			
			switch (deviceName)
			{
			case "sensor":				
				setCommandSensor (commandIn);
				
				break;			
			}			
    	}			    
    	
    	return true;
    }
    
    boolean setCommandSensor (String commandIn){
    	
    	String stringName = parseValue ("name", commandIn);
    	
    	String stringTemp = parseValue ("temp", commandIn);
    	
    	String stringHum = parseValue ("hum", commandIn);
    	
    	//System.out.println("COMMAND sensor:> " + " Name:" + stringName + " Temp:" + stringTemp + " Hum:" + stringHum);
    	
    	if (!stringTemp.isEmpty()) {
    		double f = Double.parseDouble(stringTemp);
    		
    		Temperature temp = new Temperature ();
    		
    		temp.set(f);
    		
	  		if (!this.m_siteService.setSensorTemperature("Room1", stringName, temp)) {
	  			System.out.println("Cannot write temp :(");
			  } 	  		
    	}
    	
    	if (!stringHum.isEmpty()) {
    		double h = Double.parseDouble(stringHum);
    		
    		Humidity hum = new Humidity ();
    		
    		hum.set(h);
    		
	  		if (!this.m_siteService.setSensorHumidity("Room1", stringName, hum)) {
	  			System.out.println("Cannot write temp :(");
			  } 	  		
    	}    			  		         			     	
    	
    	return true;
    }
    
    String parseValue (String id, String text)
    {
    	String output = "";
    	
    	String pattern1 = id + "=";
		String pattern2 = " ";
		
		Pattern p = Pattern.compile(Pattern.quote(pattern1) + "(.*?)" + Pattern.quote(pattern2));
		Matcher m = p.matcher(text);    			
				
		while (m.find()) {    
			
			output = m.group(1);
		}					
		
		return output;    	
    }
}
