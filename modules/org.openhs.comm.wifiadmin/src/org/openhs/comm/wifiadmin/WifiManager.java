package org.openhs.comm.wifiadmin;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WifiManager {
	
	private static String OS = null;
	
	private Logger logger = LoggerFactory.getLogger(WifiManager.class);
	
	public  static String getOsName(){		
	    if(OS == null) { OS = System.getProperty("os.name"); }
	    return OS;		
	}	
	
	/*
	 * Function: Get a list of available IOT wifi items
	 * 
	 */
	List<String> GetIotWifiList(String filter) throws Exception {	
				
		List<String> fullDevList = GetFullWifiList();		
		
		//Filter
        List<String> iotDevList = fullDevList.stream()              
                .filter(line -> line.contains(filter))    
                .collect(Collectors.toList());             
		
		return iotDevList;
	}
		
	
	List<String> GetFullWifiList() throws Exception {		
    	logger.info("\n>GetFullWifiList(): " + "...detecting wifi");    	
        
        String os = getOsName();
        
        if (os.contains("Windows")) {
        	return GetFullWifiList_Win();
        	
        } else if (os.contains("Linux")) {
        	return GetFullWifiList_Linux();
        }
        
       return null;
    }	
	
	List<String> GetFullWifiList_Win() throws Exception {		
		List<String> devList = new ArrayList<String>();
		
		logger.info("GetFullWifiList_Win> Windows system...");				
		
		ProcessBuilder builder = new ProcessBuilder(
				"cmd.exe", "/c", "netsh wlan show all");
	      
	    builder.redirectErrorStream(true);	    	    
	    Process p = builder.start();	    	    	            

	    BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
	        
        String line = r.readLine();
        while(line != null)
        {
            //logger.info(line);          
        	//logger.info(">****");
          
          if (line.contains("SSID") || line.contains("Signal")){
              if(!line.contains("BSSID"))
            	 // logger.info(line);
              	//  logger.info(">****");
                  if(line.contains("SSID") && !line.contains("name") && !line.contains("SSIDs"))
                  {
                	  //logger.info(">>>" + line + "<<<");
                	  devList.add(line);
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
        
        return devList;
	}
	
	List<String> GetFullWifiList_Linux() throws Exception {
		List<String> devList = new ArrayList<String>();
		
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
        	//logger.info(line);        	        
        	        	
        	line = r.readLine();
        }
        r.close();
        
        return devList;
	}
	

}
