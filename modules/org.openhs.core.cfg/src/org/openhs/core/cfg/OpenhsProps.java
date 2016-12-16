package org.openhs.core.cfg;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import javax.xml.soap.SOAPException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;

import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.OhsConfig;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Site;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.OutputKeys;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;



public class OpenhsProps {
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(OpenhsProps.class);

	private ConfigurationAdmin m_ca = null;
	private Properties m_properties = null;
    private ISiteService m_siteService = null;	
    public OhsConfig m_config = null;    
    
    private final String OHS_DIR = "openhs";
    private final String OHS_PROPS = "openhs.properties";
	private final String OHS_COMM_COMPONENT = "commComponent";
	private final String OHS_COMM_CONFIG_FILE = "commConfigFile";
	private final String OHS_XML_LOAD_ENABLE = "xmlLoadEnable";
	private final String OHS_XML_FILE_NAME = "xmlFileName";
	private final String OHS_CONFIG_FILE = "xmlConfiguration";
		
	public OpenhsBundles m_bundles = new OpenhsBundles();	
	public String m_openhsPropsFile;
    public String m_openhsDir;			 //OpenHS home directory	
    public String m_openhsDataFile = ""; //XML wile with data structure
    public String m_openhsConfigFile = ""; //XML wile with data structure
    
    public OpenhsProps() {
    	m_properties = new Properties();
    	m_config = new OhsConfig ();	
    	
    	String currentUsersHomeDir = System.getProperty("user.home");
        String m_fileSep = System.getProperty( "file.separator");     	    	
    	m_openhsDir = currentUsersHomeDir + m_fileSep + OHS_DIR;
    	m_openhsPropsFile = m_openhsDir + m_fileSep + OHS_PROPS;
    }

    //loading props file and distribute via ConfigAdmin
    private void loadProps()
    {
    	InputStream input = null;

    	try {
    		input = new FileInputStream(m_openhsPropsFile);

    		// load a properties file
    		m_properties.load(input);
            
    		logger.info("===================== openhs properties =====================");
    		logger.info(logger.getName());

            listProps(m_properties);    		
            
    		// get the property values for communication
    		String commComponent = m_properties.getProperty(OHS_COMM_COMPONENT);
    		String commConfigFile = m_properties.getProperty(OHS_COMM_CONFIG_FILE);
    		
    		//System.out.println("\n\n------> Starting...." + commComponent);
    	
    		// load properties from comConfigFile
    		input = new FileInputStream(m_openhsDir + System.getProperty( "file.separator") + commConfigFile);
    		Properties commProperties = new Properties();
    		commProperties.load(input);

    		Configuration config = null;
			config = m_ca.getConfiguration(commComponent);
		
			Dictionary<String, Object> dict = config.getProperties();
		    if (dict == null) {
		       dict = new Hashtable<String, Object>();
		    }
		    
		    // put properties to the Dictionary
		    for (final String name: commProperties.stringPropertyNames())
		        dict.put(name, commProperties.getProperty(name));		    
		
		    // update configuration with dictionary => starts commComponent via ConfigAdmin 
		    config.update(dict);		    		    
		    
    	} catch (IOException ex) {
    		ex.printStackTrace();
    	} finally {
    		if (input != null) {
    			try {
    				input.close();
    			} catch (IOException e) {
    				e.printStackTrace();
    				return;
    			}
    		}
    	}
    }
    
    private void listProps(Properties props)
    {
        if(props != null && ! props.isEmpty()) {
            Iterator<Entry<Object, Object>> it = props.entrySet().iterator();
            while (it.hasNext()) {
                Entry<Object, Object> entry = it.next();
                logger.info(entry.getKey() + " = " +
                	entry.getValue() + " of type " + entry.getValue().getClass().toString());
            }
        }
    }
    
    /*
     * Loads datastructure...
     */
    private void loadData()
    {    	
    	   String loadXml = m_properties.getProperty(OHS_XML_LOAD_ENABLE);
    	   String fileName = m_properties.getProperty(OHS_XML_FILE_NAME);
	      // String fileCfgName = m_properties.getProperty(OHS_CONFIG_FILE);
    	   
    	   if (loadXml.equals("yes") && !(fileName.equals(""))) {
    		   	        
    		   m_openhsDataFile = m_openhsDir + System.getProperty( "file.separator") + fileName;
    		   
    		   File xml = new File(m_openhsDataFile);
				
			   if (xml.exists()) {				   
					
					try {
						System.out.println("\n++> LOADING XML...");	 
						
						LoadXML (m_openhsDataFile);
					}
					catch (Exception ex) {
				
					}
				} else {
		    		
					System.out.println("\n++> LOADING XML... but file is not here :( -> create something");	 
					
		    		m_siteService.buildHouse(6); //build some house....
		        	        	
			        try {		        	
			        	//xmlSave (m_openhsDataFile, m_siteService.getSite());
			        	SaveXML(m_openhsDataFile);	 
			        }
			        catch (Exception ex) {
			        	System.out.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
			        }
			        finally
			        {
			        	System.out.println("Site XML not found ---> Created basic config and saved: " + m_openhsDataFile); 
			        }
		    	}  			   
			   	        
    		 //  SaveXML(m_openhsConfigFile);	        
	        
    		 //  LoadXML (m_openhsConfigFile);
    	   } else {
    		   
    		    System.out.println("\n++> File disabled -> I create some house :)");	 
    		   
           		m_siteService.buildHouse(6); //build some house....
           }
    	
	        /*
        //Load properties...
        String loadXml = m_properties.getProperty(OHS_XML_LOAD_ENABLE);
        String fileName = m_properties.getProperty(OHS_XML_FILE_NAME);
        String fileCfgName = m_properties.getProperty(OHS_CONFIG_FILE);
        
        m_openhsConfigFile = m_openhsDir + System.getProperty( "file.separator") + fileCfgName;
        
      //  CreateXML(m_openhsConfigFile);
                        
        if (loadXml.equals("yes") && !(fileName.equals(""))) {
        	
        	m_openhsDataFile = m_openhsDir + System.getProperty( "file.separator") + fileName;
        	
        	
        	System.out.println("\n\n------> Data structure loading from XML...: " + m_openhsDataFile);
        	System.out.println("------> Config...: " + m_openhsConfigFile);
        	
	        File xml = new File(m_openhsDataFile);
	                       
	    	if (xml.exists()) {
	    		
	    		try {
	    			Site siteTmp = (Site) xmlLoad (m_openhsDataFile);
	    			
	    			m_siteService.setSite(siteTmp);
	    		}
	    		catch (Exception ex) {
	
	    		}
	    	}
	    	else {
	    		
	    		m_siteService.buildHouse(6); //build some house....
	        	        	
		        try {		        	
		        	xmlSave (m_openhsDataFile, m_siteService.getSite());	
		        }
		        catch (Exception ex) {
		        	System.out.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
		        }
		        finally
		        {
		        	System.out.println("Site XML not found ---> Created basic config and saved: " + m_openhsDataFile); 
		        }
	    	}       
	    	
        } else {
        	m_siteService.buildHouse(6); //build some house....
        }
        */
    }
    /*
    public void xmlSave (String path, Object o) throws Exception {
    	FileOutputStream fileStream = new FileOutputStream(path);
    	BufferedOutputStream buffStream = new BufferedOutputStream(fileStream);    	
    	
        XMLEncoder encoder = new XMLEncoder(buffStream);
        
        encoder.writeObject(o);
        
        encoder.close();
    }   
    
    public Object xmlLoad (String path) throws Exception {
    	FileInputStream fileStream = new FileInputStream(path);
    	BufferedInputStream buffStream = new BufferedInputStream(fileStream);    	
    	
    	XMLDecoder decoder = new XMLDecoder(buffStream);

        Object o = decoder.readObject();
        
        decoder.close();
        
        return o;      
    }  
    */
    public Properties getProperties () {
    	return this.m_properties;
    }
    
    public void SaveXML (String path) {
    	
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder =  dbFactory.newDocumentBuilder();
            Document doc = dBuilder.newDocument();
            
            /*
            
            // root element
            Element rootElement = doc.createElement("site");
            doc.appendChild(rootElement);

            //  floors element
            Element floor = doc.createElement("floor");
            rootElement.appendChild(floor);

            // setting attribute to element
            Attr attr = doc.createAttribute("name");
            attr.setValue("Floor1");
            floor.setAttributeNode(attr);

            // room element
            Element room = doc.createElement("room");
            floor.appendChild(room);
            
            Attr attrRoom = doc.createAttribute("name");
            attrRoom.setValue("Room1");
            room.setAttributeNode(attrRoom);
            
            // sensor element
            Element sensor = doc.createElement("sensor");
            room.appendChild(sensor);
            
            Attr attrSensor = doc.createAttribute("name");
            attrSensor.setValue("Sensor1");
            sensor.setAttributeNode(attrSensor);  
            
            sensor.appendChild(doc.createTextNode("Nejaka blbost"));
            */

            
            // root element
            Element rootElement = doc.createElement("site");
            doc.appendChild(rootElement);
            
        	Site site = m_siteService.getSite();
        	Set<String> keysF = site.floors.keySet();
        	
        	for (String keyF : keysF) {        		
        		
                //  floors element
                Element floor = doc.createElement("floor");
                rootElement.appendChild(floor);      
                
                // setting attribute to element
                Attr attr = doc.createAttribute("name");
                attr.setValue(keyF);
                floor.setAttributeNode(attr);      
                
		        Floor m_floor = (Floor) m_siteService.getThing("floors/" + keyF);
		        Set<String> keysR = m_floor.rooms.keySet();   
		        
		        for (String keyR : keysR) {      
		        	
	                //  room element
	                Element room = doc.createElement("room");
	                floor.appendChild(room);      
	                
	                // setting attribute to element
	                Attr attrR = doc.createAttribute("name");
	                attrR.setValue(keyR);
	                room.setAttributeNode(attrR);     		
	                
		        	Room m_room = (Room) m_siteService.getThing("floors/" + keyF + "/rooms/"+ keyR);
		            Set<String> keysS = m_room.sensors.keySet();	 
		            
		            for (String keyS : keysS) {
		                //  sensor element
		                Element sensor = doc.createElement("sensor");
		                room.appendChild(sensor);      
		                
		                // setting attribute to element
		                Attr attrS = doc.createAttribute("name");
		                attrS.setValue(keyS);
		                sensor.setAttributeNode(attrS);     			            			            	
		            }
		        }        		
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
    
  public void LoadXML (String path) {
    	
        try {
        	File inputFile = new File(path);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder =  dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();
            
            NodeList listFloor = doc.getElementsByTagName("floor");
            
            for (int i1 = 0; i1 < listFloor.getLength(); i1++) {
            	Node nFloor = listFloor.item(i1);
            	System.out.println("\n+>Current Element:" + nFloor.getNodeName());
            	
            	if (nFloor.getNodeType() == Node.ELEMENT_NODE) {
            		
            		 Element eFloor = (Element) nFloor;
            		 
            		 String keyFloor = eFloor.getAttribute("name");
            		 
            		 //System.out.println("\n+>" + keyFloor);
            		 
            		 //Create Floor
            		 m_siteService.addThing ("floors/" + keyFloor);
            		 
            		 NodeList listRoom = eFloor.getElementsByTagName("room");
            		 
            		 for (int i2 = 0; i2 < listRoom.getLength(); i2++){
            			 Node nRoom = listRoom.item(i2);
            			 
            			 if (nRoom.getNodeType() == Node.ELEMENT_NODE) {
            			 
	            			 Element eRoom = (Element) nRoom;
	            			 
	            			 String keyRoom = eRoom.getAttribute("name");
	            			 
	            			 //System.out.println("\n+>" + keyRoom);
	            			 
	                		 //Create Room
	                		 m_siteService.addThing ("floors/" + keyFloor + "/rooms/" + keyRoom);	            			 
	            			 
	                		 NodeList listSensor = eRoom.getElementsByTagName("sensor");
	                		 
	                		 for (int i3 = 0; i3 < listSensor.getLength(); i3++){	                			 
	                			 Node nSensor = listSensor.item(i3);
	                			 
	                			 if (nSensor.getNodeType() == Node.ELEMENT_NODE) {
	                				 
	                				 Element eSensor = (Element) nSensor;
	                				 
	                				 String keySensor = eSensor.getAttribute("name");
	                				 
	                				 //System.out.println("\n++>" + keySensor);	 
	                				 
	    	                		 //Create Sensor
	    	                		 m_siteService.addThing ("floors/" + keyFloor + "/rooms/" + keyRoom + "/sensors/" + keySensor);		                				 
	                			 }	                			 	                			 
	                		 }	                		                 		              		 	                		 	                		 
            			 }            			             			            			             			 
            		 }            			 
            	}            	
            }
            	
            
            /*
            
            // root element
            Element rootElement = doc.createElement("site");
            doc.appendChild(rootElement);
            
        	Site site = m_siteService.getSite();
        	Set<String> keysF = site.floors.keySet();
        	
        	for (String keyF : keysF) {        		
        		
                //  floors element
                Element floor = doc.createElement("floor");
                rootElement.appendChild(floor);      
                
                // setting attribute to element
                Attr attr = doc.createAttribute("name");
                attr.setValue(keyF);
                floor.setAttributeNode(attr);      
                
		        Floor m_floor = (Floor) m_siteService.getThing("floors/" + keyF);
		        Set<String> keysR = m_floor.rooms.keySet();   
		        
		        for (String keyR : keysR) {      
		        	
	                //  room element
	                Element room = doc.createElement("room");
	                floor.appendChild(room);      
	                
	                // setting attribute to element
	                Attr attrR = doc.createAttribute("name");
	                attrR.setValue(keyR);
	                room.setAttributeNode(attrR);     		
	                
		        	Room m_room = (Room) m_siteService.getThing("floors/" + keyF + "/rooms/"+ keyR);
		            Set<String> keysS = m_room.sensors.keySet();	 
		            
		            for (String keyS : keysS) {
		                //  sensor element
		                Element sensor = doc.createElement("sensor");
		                room.appendChild(sensor);      
		                
		                // setting attribute to element
		                Attr attrS = doc.createAttribute("name");
		                attrS.setValue(keyS);
		                sensor.setAttributeNode(attrS);     			            			            	
		            }
		        }        		
        	}            
*/
            /*
            // write the content into xml file
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File(path));
            transformer.transform(source, result);
            // Output to console for testing
            StreamResult consoleResult = new StreamResult(System.out);
            transformer.transform(source, consoleResult);
            */
            
         } catch (Exception e) {
            e.printStackTrace();
         }    	
    }    

    void activate() {
        logger.info("org.openhs.core.cfg: activate()");
		loadProps();
		loadData();		
    }
    
    void deactivate() {
        logger.info("org.openhs.core.cfg: deactivate()");
    }
    
    void setService(ConfigurationAdmin ca) {
        logger.info("org.openhs.core.cfg: setService(ConfigurationAdmin ca)");
		m_ca = ca;
    }
    
    void unsetService(Configuration ca) {
        logger.info("org.openhs.core.cfg: unsetService(ConfigurationAdmin ca)");
		if(m_ca == ca)
			m_ca = null;
    }
    
    void setService(ISiteService ser) {
        m_siteService = ser;             
    }

    void unsetService(ISiteService ser) {
        if (m_siteService == ser) {
            ser = null;
        }
    }	       
}
