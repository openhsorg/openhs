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
	
	ArrayList<String> GetIotWifiList(String filter) throws Exception {	
				
		ArrayList<String> fullDevList = GetFullWifiList();		
		ArrayList<String> iotDevList = new ArrayList<String>(fullDevList);

	//	iotDevList.removeAll(c)
		
		return iotDevList;
	}
		
	
	ArrayList<String> GetFullWifiList() throws Exception {		
    	logger.info("\n>GetFullWifiList(): " + "...detecting wifi");    	
        
        String os = getOsName();
        
        if (os.contains("Windows")) {
        	return GetFullWifiList_Win();
        	
        } else if (os.contains("Linux")) {
        	return GetFullWifiList_Linux();
        }
        
       return null;
    }	
	
	ArrayList<String> GetFullWifiList_Win() throws Exception {		
		ArrayList<String> devList = new ArrayList<String>();
		
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
            	  //logger.info(line);
              	//  logger.info(">****");
                  if(line.contains("SSID") && !line.contains("name") && !line.contains("SSIDs"))
                  {
                	  logger.info(">>>" + line + "<<<");
                	  devList.add("line");
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
	
	ArrayList<String> GetFullWifiList_Linux() throws Exception {
		ArrayList<String> devList = new ArrayList<String>();
		
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
        
        return devList;
	}
	

}
