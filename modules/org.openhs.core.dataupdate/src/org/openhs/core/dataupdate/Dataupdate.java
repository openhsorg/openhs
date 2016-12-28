package org.openhs.core.dataupdate;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.openhs.comm.api.DeviceMapping;
import org.openhs.comm.api.ICommService;
import org.openhs.comm.api.IDeviceMapping;
import org.openhs.comm.api.IMessageHandler;
import org.openhs.comm.api.IMessageParser;
import org.openhs.comm.api.Message;
import org.openhs.comm.api.SensorMessage;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.site.api.ISensorUpdater;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Dataupdate implements IMessageHandler, Runnable {
	
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(Dataupdate.class);

	private Map<String, Object> m_properties = null;

	private BlockingQueue<Message> m_queue = null;
	private Thread m_myThd = null;
    private volatile boolean running = true;
    private ISiteService m_siteService = null;
    private IMessageParser m_parser = null;
    private int m_log_num = 0; //TODO temporary - use slf4j instead
    
    ArrayList <IDeviceMapping> m_mapping = new ArrayList <IDeviceMapping>();
	
	public Dataupdate() {
		m_queue = new LinkedBlockingQueue<Message>();		   		
	}
	
	public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		System.out.println("org.openhs.core.dataupdate: Activated...");
		
		updated(properties);
		
		m_myThd = new Thread(this);
		m_myThd.start();
	}		

	public void deactivate () {
        this.terminate();
        try {
			m_myThd.join();
		} catch (InterruptedException ex) {
			// TODO Auto-generated catch block
			ex.printStackTrace();
		}
        System.out.println("Thread successfully stopped.");		
		System.out.println("org.openhs.core.dataupdate: De-activated...");
	}
	
	public void updated(Map<String, Object> properties) {
		m_properties = properties;
		String mappingFileName = (String) m_properties.get("deviceMapping");
		String openhsHome = (String) m_properties.get("openhsHome");
		mapping(openhsHome + mappingFileName);
	}
	
    public void setService(ICommService cs) {
    	System.out.println("org.openhs.core.dataupdate: Set ICommService: " + cs.getName());
    	cs.registerMessageHandler(this);
    }

    public void unsetService(ICommService cs) {
    	System.out.println("org.openhs.core.dataupdate: UnSet ICommService: " + cs.getName());
    	cs.unregisterMessageHandler(this);
    }

    public void setService(ISiteService siteService) {
    	System.out.println("org.openhs.core.dataupdate: Set ISiteService: ");
    	m_siteService = siteService;
    }

    public void unsetService(ISiteService siteService) {
    	System.out.println("org.openhs.core.dataupdate: UnSet ISiteService: ");
    }

    public void setService(IMessageParser prs) {
    	System.out.println("org.openhs.core.dataupdate: Set IMessageParser: ");
    	m_parser = prs;
    }

    public void unsetService(IMessageParser prs) {
    	System.out.println("org.openhs.core.dataupdate: UnSet IMessageParser: ");
    	m_parser = null;
    }

    void consume(Message msg) {
    	//TODO
    	m_log_num++; 
    	if (msg == null) {
        	System.out.println("no msg");
    	}
    	else {
    		if(m_log_num < 4) {
    			System.out.println("do soming: " + msg.getTopic() + " " + msg.getData() );
    		}
    		if(m_log_num == 4) {
    			System.out.println("logging of temp stopped after: " + m_log_num + " outputs ..." );
    		}

    		//TODO select parser according channel and topic
    		String devicePath = msg.getChannel() + '/' + msg.getTopic() + '/';
    		ISensorUpdater su = m_parser.parseMessage(msg);
        	if (su != null) {
        		if(m_log_num < 4) System.out.println("pathAddress: " + su.getAddress());
        		
        		devicePath = devicePath + su.getAddress();

        		if (m_siteService != null) {
    	  			String thingPath = getOpenhsPath(devicePath);
    	  			if(m_log_num < 4) System.out.println("thingPath: " + thingPath);
    	  			
                	try {
						Object obj = m_siteService.getThing(thingPath);
						if (obj != null) {
							if(m_log_num < 4) System.out.println("Returned class: " + obj.getClass().getName() );
							
							su.update(obj);
						}
					} catch (SiteException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
    	  		}

        	} else
				System.out.println("Returned class: " + "null");
    	}
    }
    
    @Override
	public void run() {
	     try {
	       while (running) { consume(m_queue.poll(20, TimeUnit.SECONDS)); }
	     } catch (InterruptedException e) { 
			// TODO Auto-generated catch block
	     	System.out.println("no message for 5 sec");
	     }
    }
		
    public void terminate() {
        running = false;
    }
    
	@Override
	public void handleMessage(Message m, ICommService cs) {
//		if(m_log_num < 4) {
//			System.out.println(cs.getName() + ": " + m);
//		}
		try {
			m_queue.offer(m, 200, TimeUnit.MILLISECONDS);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}  
	
	public void mapping (String path) {

		File xml = new File(path);
		
		if (xml.exists()) {				   
			
			try {
				System.out.println("\n++> LOADING XML...");	 

				loadXML(path);
			}
			catch (Exception ex) {
		
			}
		} else {    		
			System.out.println("\n++> LOADING XML... but file is not here :( -> create something");	 
			
			// create something...    	
			m_mapping.add(new DeviceMapping("Room0_Sensor1", "floors/Floor1/rooms/Room0/sensors/Room0_Sensor1"));
			m_mapping.add(new DeviceMapping("Room1_Sensor1", "floors/Floor1/rooms/Room1/sensors/Room1_Sensor1"));
			m_mapping.add(new DeviceMapping("device_path3", "ohs_path/floors/etc3"));
        	        	
	        try {		        	
	        	saveXML(path);
	        }
	        catch (Exception ex) {
	        	System.out.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
	        }
	        finally {
	        	System.out.println("Site XML not found ---> Created basic config and saved: " + path); 
	        }
    	}  	
		
		/*
		for (IDeviceMapping map : m_mapping) {   
			System.out.println("\n++>...: " + ((DeviceMapping)map).getDeviceName());
			System.out.println("\n++>...: " + ((DeviceMapping)map).getOhsName());			
		}
		*/
	}
	
	public void saveXML(String path) {
		 try {
			 
			   //System.out.println("\n++> SAVING XML...: " + path);	 
			 
	            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
	            DocumentBuilder dBuilder =  dbFactory.newDocumentBuilder();
	            Document doc = dBuilder.newDocument();	            
	            
	            // root element
	            Element rootElement = doc.createElement("device_map");
	            doc.appendChild(rootElement);
	        	
	        	for (IDeviceMapping map : m_mapping) {        		
	        		
	                //mapping item
	                Element eMap = doc.createElement("map");
	                rootElement.appendChild(eMap);      
	                
	                Attr attr2 = doc.createAttribute("openhs_path");
	                attr2.setValue(((DeviceMapping) map).getOhsName());
	                eMap.setAttributeNode(attr2);    	                
	                
	                Attr attr = doc.createAttribute("device_path");
	                attr.setValue(((DeviceMapping) map).getDeviceName());
	                eMap.setAttributeNode(attr);     	                  	                	                       		
	        	}            

	            // write the content into xml file
	            TransformerFactory transformerFactory = TransformerFactory.newInstance();
	            Transformer transformer = transformerFactory.newTransformer();
	            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
	            DOMSource source = new DOMSource(doc);
	            StreamResult result = new StreamResult(new File(path));
	            transformer.transform(source, result);
	            // Output to console for testing
	          //  StreamResult consoleResult = new StreamResult(System.out);
	            //transformer.transform(source, consoleResult);
	            
	         } catch (Exception e) {
	            e.printStackTrace();
	         }   		
	}
	
	public void loadXML(String path) {
		  try {
	        	File inputFile = new File(path);
	            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
	            DocumentBuilder dBuilder =  dbFactory.newDocumentBuilder();
	            Document doc = dBuilder.parse(inputFile);
	            doc.getDocumentElement().normalize();
	            
	            m_mapping.clear();
	            
	            NodeList listMap = doc.getElementsByTagName("map");
	            
	            for (int i = 0; i < listMap.getLength(); i++) {
	            	Node nMap = listMap.item(i);
	            	//System.out.println("\n+>Current Element**:" + nMap.getNodeName() + ":: " + listMap.getLength());
	            	
	            	if (nMap.getNodeType() == Node.ELEMENT_NODE) {
	            		
	            		 Element eMap = (Element) nMap;	            		 
	            		 String openhs_path = eMap.getAttribute("openhs_path");
	            		 String device_path = eMap.getAttribute("device_path");
	            		 m_mapping.add(new DeviceMapping(device_path, openhs_path));
	            	}            	
	            }
	            		            	            	            
	         } catch (Exception e) {
	            e.printStackTrace();
	         }     		
	}
	
	private String getOpenhsPath (String device_name) {

		for (IDeviceMapping map : m_mapping) {
			DeviceMapping map2 = (DeviceMapping) map;
			
			String mapped_device_name = map2.getDeviceName();
			
			if (mapped_device_name.equals(device_name)) {
				return map2.getOhsName();
			}			
		}
				
		return "";
	}
}
