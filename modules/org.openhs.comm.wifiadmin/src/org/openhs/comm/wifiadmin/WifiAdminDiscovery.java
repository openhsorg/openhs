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
	
	 private volatile boolean active = true;

     @Override
     public void run() {    	 
         while (active) {
            // System.out.println("\nThread adjustment...........");
        	 
        	 logger.info("\n<------ WIFI ADMIN ------------>");
        	 
        	 try {
        		 detectWifi();
        	 }catch (Exception e) {
        		 System.out.println(e);
        	 }
        	 
        	 sendConfig("oror");
        	 
        	 logger.info("\n<------ (WIFI ADMIN) ------------>\n");
        	      
             try {
                 Thread.sleep(10000);
             } catch (Exception e) {
                 System.out.println("Thread interrupted " + e.getMessage());
             } 
        	 
         }
         
        
     }
     

    public void stopThread() {
        active = false;
    }	
    
    void detectWifi() throws Exception {
    	logger.info("\n>Wifi Admin: " + "...detecting wifi");
   // 	logger.info("\n>Wifi Admin: " + "local IP address:");
    //	listIPAddresses();
    	
    	
    	ArrayList<String>ssids=new ArrayList<String>();
        ArrayList<String>signals=new ArrayList<String>();
        ProcessBuilder builder = new ProcessBuilder(
                "nmcli", "dev", "wifi");
        
      //  logger.info("\n>X" + builder.toString());
        builder.redirectErrorStream(true);
        Process p = builder.start();
        
        int errCode = p.waitFor();
        System.out.println("Echo command executed, any errors? " + (errCode == 0 ? "No" : "Yes"));    
        
        BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
        
        String line = r.readLine();
        while(line != null)
        {
          System.out.println(line);
          line = r.readLine();
        }
        r.close();
        
       // while (true) {
       //     line = r.readLine();
          //  System.out.println(line);
            /*
            if (line.contains("SSID")||line.contains("Signal")){
                if(!line.contains("BSSID"))
                    if(line.contains("SSID")&&!line.contains("name")&&!line.contains("SSIDs"))
                    {
                        line=line.substring(8);
                        ssids.add(line);

                    }
                    if(line.contains("Signal"))
                    {
                        line=line.substring(30);
                        signals.add(line);

                    }

                    if(signals.size()==7)
                    {
                        break;
                    }

            }
            */

     //   }
        /*
        for (int i=1;i<ssids.size();i++)
        {
            System.out.println("SSID name == "+ssids.get(i)+"   and its signal == "+signals.get(i)  );
        }
        */
    }
        	     
      	     
    
    
    private static void listIPAddresses(){
        Enumeration<NetworkInterface> net = null;
        try { // get all interfaces; ethernet, wifi, virtual... etc
            net = NetworkInterface.getNetworkInterfaces();
        } catch (SocketException e) {
            throw new RuntimeException(e);
        }
 
        if (net == null){
            throw new RuntimeException("No network interfaces found.");
        }
 
        while(net.hasMoreElements()){
            NetworkInterface element = net.nextElement();
            try {
                if (element.isVirtual() || element.isLoopback()){
                    // discard virtual and loopback interface (127.0.0.1)
                    continue;
                }
 
                // rest are either Wifi or ethernet interfaces
                // loop through and print the IPs
                Enumeration<InetAddress> addresses = element.getInetAddresses();
                while (addresses.hasMoreElements()){
                    InetAddress ip = addresses.nextElement();
                    if (ip instanceof Inet4Address){
                        if (ip.isSiteLocalAddress()){
                            System.out.println(element.getDisplayName() + " - " + ip.getHostAddress());
                        }
                    }
                }
            } catch (SocketException e) {
                e.printStackTrace();
            }
        }
    } // listIPAddresses() ends    
    
    
    
    
    
    
    
    
    
    
    
    void sendConfig(String ip) {
    	logger.info("\n>Wifi Admin: " + "...sending config to " + ip);
    	
    }   
    
    
    
}
