package org.openhs.comm.wifiadmin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.*;
import java.net.*;
import java.util.*;
import java.io.IOException;
import java.net.*;
import java.util.Vector;

import static java.lang.System.out;

public class WifiAdminDiscovery extends Thread {
	
	private Logger logger = LoggerFactory.getLogger(WifiAdmin.class);
	
	 private volatile boolean active = true;

     @Override
     public void run() {    	 
         while (active) {
            // System.out.println("\nThread adjustment...........");
        	 
        	 logger.info("------>");
        	 
        	 try {
        		 Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();
        		 for (NetworkInterface netint : Collections.list(nets))
        			 displayInterfaceInformation(netint);
        	 }catch(Exception e){
        		 System.out.println("Detect exception: " + e);
        	 }
        	 
        	 /*
        	 try {
        		 detect();
        	 } catch (Exception ex) {
        		 System.out.println("Detect exception: " + ex);
        	 }
        	 */
        	 
        	      
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
    
    static void displayInterfaceInformation(NetworkInterface netint) throws SocketException {
        out.printf("Display name: %s\n", netint.getDisplayName());
        out.printf("Name: %s\n", netint.getName());
        Enumeration<InetAddress> inetAddresses = netint.getInetAddresses();
        for (InetAddress inetAddress : Collections.list(inetAddresses)) {
            out.printf("InetAddress: %s\n", inetAddress);
        }
        out.printf("\n");
     }  

    /*
    void detect () throws UnknownHostException {
    	 Vector<String> Available_Devices=new Vector<>();
         String myip=InetAddress.getLocalHost().getHostAddress();
         String mynetworkips=new String();

         for(int i=myip.length();i>0;--i) {
             if(myip.charAt(i-1)=='.'){ mynetworkips=myip.substring(0,i); break; }
         }

         System.out.println("My Device IP: " + myip+"\n");

         System.out.println("Search log:");
         for(int i=1;i<=254;++i){
             try {
                 InetAddress addr=InetAddress.getByName(mynetworkips + new Integer(i).toString());
                 if (addr.isReachable(1000)){
                     System.out.println("Available: " + addr.getHostAddress());
                     Available_Devices.add(addr.getHostAddress());
                 }
                 else System.out.println("Not available: "+ addr.getHostAddress());

             }catch (IOException ioex){}
         }

         System.out.println("\nAll Connected devices(" + Available_Devices.size() +"):");
         for(int i=0;i<Available_Devices.size();++i) System.out.println(Available_Devices.get(i));    	
    }
    
    */
}
