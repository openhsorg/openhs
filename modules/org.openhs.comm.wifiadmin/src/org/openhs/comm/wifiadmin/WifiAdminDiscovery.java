package org.openhs.comm.wifiadmin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.*;
import java.net.*;
import java.util.*;
import java.io.IOException;
import java.net.*;
import java.util.Vector;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;



import static java.lang.System.out;

public class WifiAdminDiscovery extends Thread {
	
	private Logger logger = LoggerFactory.getLogger(WifiAdmin.class);
	
	WifiManager m_wifiManager = new WifiManager ();
	
	 private volatile boolean active = true;

     @Override
     public void run() {    	 
         while (active) {
            // System.out.println("\nThread adjustment...........");
        	 
        	 logger.info("\n<------ WIFI ADMIN ------------>");
        	 
        	 try {
        		 List<String> iot = m_wifiManager.GetIotWifiList("SWIM_");
 
        		 for (String line: iot) {
        			 logger.info(">>" + line);
        		 }
        	
        	 }catch (Exception e) {
        		 System.out.println(e);
        	 }
        	 
        	 logger.info("\n<------ (WIFI ADMIN) ------------>\n");
        	      
             try {
                 Thread.sleep(5000);
             } catch (Exception e) {
                 System.out.println("Thread interrupted " + e.getMessage());
             }         	 
         }                 
     }
    

    public void stopThread() {
        active = false;
    }	       
    
    
}
