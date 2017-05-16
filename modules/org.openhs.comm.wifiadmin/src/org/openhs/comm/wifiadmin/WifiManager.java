package org.openhs.comm.wifiadmin;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WifiManager {
	
	private static String OS = null;
	
	private Logger logger = LoggerFactory.getLogger(WifiManager.class);
	
	public  static String getOsName(){		
	    if(OS == null) { OS = System.getProperty("os.name"); }
	    return OS;		
	}	
	
	void detectWifi() throws Exception {		
    	logger.info("\n>Wifi Admin: " + "...detecting wifi");    	
        
        String os = getOsName();
        
        if (os.contains("Windows")) {
        	detectWifi_Win();
        	
        } else if (os.contains("Linux")) {
        	detectWifi_Linux();
        }
        
       
    }	
	
	void detectWifi_Win() throws Exception {
		logger.info("detectWifi_Win()> Windows system...");
		
		ProcessBuilder builder = new ProcessBuilder(
				"cmd.exe", "/c", "netsh wlan show all");
	      
	    builder.redirectErrorStream(true);	    	    
	    Process p = builder.start();	    	    	            

	    BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
	        
        String line = r.readLine();
        while(line != null)
        {
          //logger.info(line);          
          
          if (line.contains("SSID") || line.contains("Signal")){
              if(!line.contains("BSSID"))
            	  logger.info(line);
              	  logger.info(">****");
                  if(line.contains("SSID") && !line.contains("name") && !line.contains("SSIDs"))
                  {
                      //line=line.substring(8);
                    //  ssids.add(line);

                  }
                  if(line.contains("Signal"))
                  {
                   //   line=line.substring(30);
                  }
          }         
          
          line = r.readLine();
        }
        
        r.close();	             						
	}
	
	void detectWifi_Linux() throws Exception {
		logger.info("detectWifi_Linux()> Linux system...");
	        
        ProcessBuilder builder = new ProcessBuilder(
                "nmcli", "dev", "wifi");
	        
        builder.redirectErrorStream(true);
        Process p = builder.start();
        
      //  int errCode = p.waitFor();
     //   logger.info("Echo command executed, any errors? " + (errCode == 0 ? "No" : "Yes"));    
        
        BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
        
        String line = r.readLine();
        while(line != null)
        {        	
        	logger.info(line);
        	
        	
        	
        	
        	line = r.readLine();
        }
        r.close();
	}
	

}
