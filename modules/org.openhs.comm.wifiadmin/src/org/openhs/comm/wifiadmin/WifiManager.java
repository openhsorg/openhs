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
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.WifiNode;
import org.openhs.core.site.api.ISiteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WifiManager {
	
	private static String OS = null;
	
	private Logger logger = LoggerFactory.getLogger(WifiManager.class);
	
	public ISiteService m_siteService = null; 
	
	WifiManager (ISiteService siteService) {
		this.m_siteService = siteService;
		
	}
	
	public  static String getOsName(){		
	    if(OS == null) { OS = System.getProperty("os.name"); }
	    return OS;		
	}	
	
	/*
	 * Add discovered nodes to OhsStructure
	 */
	void UpdateSiteData (List<String> listThings) {
		
		Set<Thing> setNodes = null;
		
		try {
			setNodes = this.m_siteService.getThingSet(WifiNode.class);
		} catch (SiteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (setNodes != null) {
			
			for (String iot: listThings) {
			
				boolean isIncluded = false;
				
				for (Thing item : setNodes) {									
					WifiNode node = (WifiNode) item;
					
					if(node.getName().equals(iot)) {
						isIncluded = true;
					}
				}
				
				// Add to data
				if (!isIncluded) {
					WifiNode iotNode = new WifiNode();
					iotNode.setName(iot);
					iotNode.netType = "wifi";
					this.m_siteService.addThing(iotNode.netType + "/" + iotNode.getName(), iotNode);
					
					logger.info("Adding this iot:" + iot);
				}			
			}
			
			//Remove not valid node....
			
			ArrayList<Thing> listThing = new ArrayList<Thing>();	
			
			for (Thing item : setNodes) {
				boolean isIncluded = false;
				
				for (String iot: listThings) {
				
					if (item.getName().equals(iot)) {
						isIncluded = true;
					}					
				}	
				
				if (!isIncluded) {				
					listThing.add(item);
				}
			}
			
			//Remove items in list...
			for (Thing lt: listThing) {												
				this.m_siteService.removeThing(lt.getSitePath());
			}			
		}						
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
		
		//logger.info("detectWifi_Linux()> Linux system...");
	        
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
        	
        	//logger.info("*******line>" + line);
        	
        	//Split...
        	
        	String[] parts = translateCommandline(line);
        	
        	if (parts[0].equals("*")) {
        		if  (parts.length >= 2) {
        			//logger.info("*******adding[1]" + parts[1]);
        			devList.add(parts[1]);   
        		}        		
        	} else {
        		//logger.info("*******adding[0]" + parts[0]);
        		devList.add(parts[0]);   
        	}        	        	        	        	     	       	        	
        	        	        	        	
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
	
	public static String[] translateCommandline(String toProcess) {
	    if (toProcess == null || toProcess.length() == 0) {
	        //no command? no string
	        return new String[0];
	    }
	    // parse with a simple finite state machine

	    final int normal = 0;
	    final int inQuote = 1;
	    final int inDoubleQuote = 2;
	    int state = normal;
	    final StringTokenizer tok = new StringTokenizer(toProcess, "\"\' ", true);
	    final ArrayList<String> result = new ArrayList<String>();
	    final StringBuilder current = new StringBuilder();
	    boolean lastTokenHasBeenQuoted = false;

	    while (tok.hasMoreTokens()) {
	        String nextTok = tok.nextToken();
	        switch (state) {
	        case inQuote:
	            if ("\'".equals(nextTok)) {
	                lastTokenHasBeenQuoted = true;
	                state = normal;
	            } else {
	                current.append(nextTok);
	            }
	            break;
	        case inDoubleQuote:
	            if ("\"".equals(nextTok)) {
	                lastTokenHasBeenQuoted = true;
	                state = normal;
	            } else {
	                current.append(nextTok);
	            }
	            break;
	        default:
	            if ("\'".equals(nextTok)) {
	                state = inQuote;
	            } else if ("\"".equals(nextTok)) {
	                state = inDoubleQuote;
	            } else if (" ".equals(nextTok)) {
	                if (lastTokenHasBeenQuoted || current.length() != 0) {
	                    result.add(current.toString());
	                    current.setLength(0);
	                }
	            } else {
	                current.append(nextTok);
	            }
	            lastTokenHasBeenQuoted = false;
	            break;
	        }
	    }
	    if (lastTokenHasBeenQuoted || current.length() != 0) {
	        result.add(current.toString());
	    }
	    if (state == inQuote || state == inDoubleQuote) {
	        throw new RuntimeException("unbalanced quotes in " + toProcess);
	    }
	    return result.toArray(new String[result.size()]);
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
	
	public boolean connectNode (String sitePath) throws Exception {
		
		// logger.info("CONNECTING: " + sitePath);
		boolean ret = false;
		WifiNode node = (WifiNode) this.m_siteService.getThing(sitePath);
		
		if (node != null) {
			//logger.info("CONNECTING: " + sitePath);
			
			ret = ConnectWifi("Homie-cb5b29e0", "cb5b29e0");	
			
			Thread.sleep(6000);
			
			if (ret) {
				//ConnectWifi("MERVIN_2G", "lamicekskace11");
			}
			
			
			ret = true;
		}
		
		return ret;
	}
	
	public boolean ConnectWifi(String name, String password) throws Exception {		
    	//logger.info("\n>GetFullWifiList(): " + "...detecting wifi");    	
        
        String os = getOsName();
        
        if (os.contains("Windows")) {
        	//return GetFullWifiList_Win();
        	
        } else if (os.contains("Linux")) {
        	return ConnectWifi_Lin(name, password);
        }
        
       return false;
    }	
	
	public boolean ConnectWifi_Lin(String name, String password) throws Exception {	
		
		List<String> out1 = commandLinux("nmcli", "con", "down", "MERVIN_5G");
		
		logger.info("!1->: " + out1.toString());
		
		Thread.sleep(3000);
		
		List<String> out2;
		
		int i = 0;
		boolean err = false;
		String str;
		
		do {
		
			out2 = commandLinux("nmcli", "-w", "120", "dev", "wifi", "con", "Homie-5ccf7fc0a99e", "password", "5ccf7fc0a99e", "name", "hh");
			
			logger.info("!2->: " + out2.toString());
			
			i ++;
			
			Thread.sleep(3000);
			
			str = Arrays.toString(out2.toArray()); 									
			
			//logger.info("!!!: " + str);
		
		} while (str.contains("Error") && i < 4);				
		
		Thread.sleep(3000);
		
		List<String> out3 = commandLinux("nmcli", "con", "down", "hh");
		
		logger.info("!3->: " + out3.toString());	
		
		Thread.sleep(3000);
		
		List<String> out4 = commandLinux("nmcli", "con", "up", "MERVIN_5G");
		
		logger.info("!4->: " + out4.toString());
		
		commandLinux("nmcli", "connection", "delete", "id", "hh");
		
		/*
		logger.info("++++++ Connect Wifi:" + name + ":" + password + "++++++");
		
		boolean ret = false;
		
        ProcessBuilder builder = new ProcessBuilder(
                "nmcli", "dev", "wifi", "connect", name.toString(), "password", password.toString());
	        
        builder.redirectErrorStream(true);
        Process p = builder.start();           
        
        BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
        
        String line = r.readLine();
        while(line != null)
        {        	
        	logger.info("+++>" + line);
        	
        	if (line.contains("successfully activated")) {
        		ret = true;
        	}
      	        	        	
        	line = r.readLine();
        	        	       	
        }
        r.close();			

        logger.info("++++++ Connect Wifi END ++++++");
        
       return ret;
       */
		
		return false;
    }		
	
	public List<String> commandLinux(String... command) throws Exception {
		List<String> ret = new ArrayList<String>();
		
		//logger.info("++++++ Command: " + command);
		
        ProcessBuilder builder = new ProcessBuilder(command);
	        
        builder.redirectErrorStream(true);
        Process p = builder.start();           
        
        BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
        
        String line = r.readLine();
                
        while(line != null)
        {        	
        	//logger.info("++++++>" + line);
        
        	ret.add(line);
        	line = r.readLine();
        	        	        	       	
        }
        r.close();			
		
		return ret;
	}
}
