package org.openhs.comm.wifiadmin;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.io.*;
import java.net.*;
import java.util.*;

import org.json.JSONException;
import org.json.JSONObject;
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
	
	void getIP () {
		 InetAddress iAddress;
		try {
			iAddress = InetAddress.getLocalHost();
			String currentIp = iAddress.getHostAddress();
			System.out.println("Current IP address : " + currentIp); //gives only host address
			
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}
	
	void NetworkInterfaces () throws SocketException{
        
		Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();
        
        for (NetworkInterface netint : Collections.list(nets)){
        	
        	logger.info("Display name: " + netint.getDisplayName());
        	logger.info("Name: " + netint.getName());
            
            Enumeration<InetAddress> inetAddresses = netint.getInetAddresses();
            
            for (InetAddress inetAddress : Collections.list(inetAddresses)) {
            	logger.info("InetAddress: " + inetAddress);
            }
            
            Enumeration<NetworkInterface> subIfs = netint.getSubInterfaces();
           // logger.info("Sub Iinterfaces: ");
            for (NetworkInterface subIf : Collections.list(subIfs)) {
            	logger.info("Sub Interface Display name: " + subIf.getDisplayName());
            	logger.info("Sub Interface Name: " + subIf.getName());
            }
        	
        }
            //displayInterfaceInformation(netint);
	}
	
	void sendJson (){
		try{
			
			JSONObject json = new JSONObject();
			json.put("type", "CONNECT");
			Socket s = new Socket("192.168.0.100", 7777);
						
		    OutputStreamWriter out = new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8);
		   
		    out.write(json.toString());
		    out.close();
		
		}catch (Exception e){
			
		}
	}

	public boolean reset() {
		DataInputStream is;
		DataOutputStream os;
		boolean result = true;
		String noReset = "Could not reset.";
		String reset = "The server has been reset.";
			
		try {
			Socket socket = new Socket(InetAddress.getByName("x.x.x.x"), 3994);
			String string = "{\"id\":1,\"method\":\"object.deleteAll\",\"params\":[\"subscriber\"]}";
			is = new DataInputStream(socket.getInputStream());
			os = new DataOutputStream(socket.getOutputStream());
			PrintWriter pw = new PrintWriter(os);
			pw.println(string);
			pw.flush();
				
			BufferedReader in = new BufferedReader(new InputStreamReader(is));
			JSONObject json = new JSONObject(in.readLine());
			if(!json.has("result")) {
				System.out.println(noReset);
				result = false;
			}
			is.close();
			os.close();
			
			socket.close();
				
		} catch (IOException e) {
			result = false;
			System.out.println(noReset);
			e.printStackTrace();			
		} catch (JSONException e) {
			result = false;
			System.out.println(noReset);
			e.printStackTrace();
		}
		
		System.out.println(reset);
		return result;
	}	
	
	public void reset2 () throws IOException {
		String host = "localhost";
		int portNumber = 81;
		System.out.println("Creating socket to '" + host + "' on port " + portNumber);

		while (true) {
			Socket socket = new Socket(host, portNumber);
			BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

			System.out.println("server says:" + br.readLine());

			BufferedReader userInputBR = new BufferedReader(new InputStreamReader(System.in));
			String userInput = userInputBR.readLine();

			out.println(userInput);

			System.out.println("server says:" + br.readLine());

			if ("exit".equalsIgnoreCase(userInput)) {
				socket.close();
				break;
			}						
		}				
	}
	
	public void getListDevices() throws UnknownHostException{
		 
        Vector<String> Available_Devices=new Vector<>();
        String myip=InetAddress.getLocalHost().getHostAddress();
        String mynetworkips=new String();
 
        for(int i=myip.length();i>0;--i){
            if(myip.charAt(i-1)=='.'){
		 mynetworkips=myip.substring(0,i);
		 break; 
	    }
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
}
