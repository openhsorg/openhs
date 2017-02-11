package org.openhs.core.dataupdate;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
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

import org.openhs.core.commons.DevicePath;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.DeviceMapping;
import org.openhs.core.commons.api.ICommService;
import org.openhs.core.commons.api.IDeviceMapping;
import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.IMessageParser;
import org.openhs.core.commons.api.Message;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Dataupdate implements IMessageHandler {
	
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(Dataupdate.class);

	private Map<String, Object> m_properties = null;

	private BlockingQueue<Message> m_queueIncoming = null;
	private BlockingQueue<Message> m_queueOutcoming = null;

	private Thread m_threadIncoming = null;
    private volatile boolean m_runningIncoming = true;
    private MessageLoopIncoming m_messageLoopIncoming = null;

	private Thread m_threadOutcoming = null;
    private volatile boolean m_runningOutcoming = true;
    private MessageLoopOutcoming m_messageLoopOutcoming = null;

    //service references
    private ISiteService m_siteService = null;
    private Map<String, IMessageParser> m_parsers = null;
    private Map<String, ICommService> m_commServices = null;

    //private int m_log_num = 0; //TODO temporary - use slf4j instead
    
    ArrayList <IDeviceMapping> m_mapping = new ArrayList <IDeviceMapping>();
	
    private class MessageLoopIncoming implements Runnable {
    	MessageLoopIncoming() {
    		m_threadIncoming = new Thread(this);
    		m_threadIncoming.start();
    	}
	    @Override
    	public void run() {
		     try {
		       while (m_runningIncoming) { consumeIncoming(m_queueIncoming.poll(20, TimeUnit.SECONDS)); }
		     } catch (InterruptedException e) { 
		    	 logger.debug("MessageLoopOutcoming: No message for 20 sec");
		     }
    	}
    	public void terminate() {
    		m_runningIncoming = false;
            try {
            	m_threadIncoming.join();
    		} catch (InterruptedException ex) {
    			ex.printStackTrace();
    		}
        }
    }
    
    private class MessageLoopOutcoming implements Runnable {
    	MessageLoopOutcoming() {
    		m_threadOutcoming = new Thread(this);
    		m_threadOutcoming.start();
    	}
    	@Override
    	public void run() {
		     try {
		       while (m_runningOutcoming) { consumeOutcoming(m_queueOutcoming.poll(20, TimeUnit.SECONDS)); }
		     } catch (InterruptedException e) { 
		    	 logger.debug("MessageLoopOutcoming: No message for 20 sec");
		     }
    	}
    	public void terminate() {
    		m_runningOutcoming = false;
            try {
            	m_threadOutcoming.join();
    		} catch (InterruptedException ex) {
    			ex.printStackTrace();
    		}
        }
    }

    public Dataupdate() {
	    m_parsers = new HashMap<>();
	    m_commServices = new HashMap<>();

		m_queueIncoming = new LinkedBlockingQueue<Message>();		   		
		m_queueOutcoming = new LinkedBlockingQueue<Message>();		   		
	}
	
	public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("**** activate()");
		
		updated(properties);
		m_messageLoopIncoming = new MessageLoopIncoming();
		m_messageLoopOutcoming = new MessageLoopOutcoming();
	}		

	public void deactivate () {
		m_messageLoopIncoming.terminate();
		m_messageLoopOutcoming.terminate();
		logger.info("**** deactivate()");
	}
	
	public void updated(Map<String, Object> properties) {
		m_properties = properties;
//		String mappingFileName = (String) m_properties.get("deviceMapping");
//		String openhsHome = (String) m_properties.get("openhsHome");
//		mapping(openhsHome + mappingFileName);
	}
	
    public void setService(ISiteService siteService) {
    	logger.info( "**** setService(): ISiteService");
    	m_siteService = siteService;
    }

    public void unsetService(ISiteService siteService) {
    	if (m_siteService == siteService)
        	m_siteService = null;
    	logger.info( "**** unsetService(): ISiteService");
    }

    public void addService(ICommService cs) {
    	logger.info( "**** addService(): ICommService: " + cs.getName());
    	m_commServices.put(cs.getName(), cs);
    }

    public void removeService(ICommService cs) {
    	logger.info( "**** removeService(): ICommService: " + cs.getName());
    	m_commServices.remove(cs.getName());
    }

    public void addService(IMessageParser prs) {
    	logger.info( "**** addService(): IMessageParser: " + prs.getParserName());
    	m_parsers.put(prs.getParserName(), prs);
    }

    public void removeService(IMessageParser prs) {
    	logger.info( "**** removeService(): IMessageParser: " + prs.getParserName());
    	m_parsers.remove(prs.getParserName());
    }

    private void consumeIncoming(Message msg) {
    	if (msg == null) {
        	//logger.debug("consumeIncoming(): message: null");
    	}
    	else {
   			logger.debug(" Received message: " + msg.toString());
    		
    		//TODO select parser according channel and topic
    		ThingUpdater tu = null;
    		IMessageParser parser = m_parsers.get(msg.getTopic());
    		if (parser != null)
    			tu = parser.parseMessage(msg);
    		else
    			logger.warn("Unsupported topic: " + msg.getTopic() + " from channel: " + msg.getChannel());
        	
    		if (tu != null) {
//    			DevicePath dp = tu.getDevicePath();
//    			
//    			dp.setChannel(msg.getChannel());
//    			dp.setTopic(msg.getTopic());
//
//        		String devicePath = dp.getDevicePath(); 
        		String devicePath = tu.getDevicePath(); 
       			logger.debug("devicePath: " + devicePath);

        		if (m_siteService != null) {
                	try {
						Thing th = m_siteService.getThingDevice(devicePath);
						if (th != null) {
							logger.debug("Returned class: " + th.getClass().getName() );
							
							tu.updateIncoming(th);
						}
					} catch (SiteException e) {
						logger.warn("devicePath: " + devicePath + " " + e.getMessage());
					}
    	  		}

        	} else
        		logger.debug("Returned class: " + "null");
    	}
    }
    
	@Override
	public void handleIncomingMessage(Message msg) {
		try {
			m_queueIncoming.offer(msg, 200, TimeUnit.MILLISECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}  

    private void consumeOutcoming(Message msg) {
    	if (msg == null) {
        	//logger.debug("consumeOutcoming(): message: null");
    	}
    	else {
        	logger.debug("consumeOutcoming(): " + msg);
			ICommService channel = m_commServices.get(msg.getChannel());
			if (channel != null) {
				channel.sendMessage(msg);
			}
			else
				logger.warn("Unknown channel: " + msg.getChannel() + " to send: " + msg.toString());
    	}
    }
	
	@Override
	public void handleOutcomingMessage(Message msg) {
    	logger.debug("handleOutcomingMessage(): " + msg);
		try {
			m_queueOutcoming.offer(msg, 200, TimeUnit.MILLISECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	/*	
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
		
//		for (IDeviceMapping map : m_mapping) {   
//			System.out.println("\n++>...: " + ((DeviceMapping)map).getDeviceName());
//			System.out.println("\n++>...: " + ((DeviceMapping)map).getOhsName());			
//		}
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
	*/

}
