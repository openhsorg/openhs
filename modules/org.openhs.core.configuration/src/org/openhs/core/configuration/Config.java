/**
* @name		Config.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Config implementation.
*
*/

package org.openhs.core.configuration;

import java.beans.XMLEncoder;
import java.beans.XMLDecoder;
import java.io.*;
import java.io.IOException;

import org.openhs.core.commons.Site;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Configuration;
import org.openhs.core.site.data.ISiteService;

public class Config implements IConfiguration {
	
    /*
     * Basic data structure.
     */
    ISiteService m_siteService = null;	
    
    /*
     * Messages.
     */
    TextOutput msg = new TextOutput ();
	
	/*
	 * Configuration.
	 */
	Configuration config = new Configuration ();	

	/*
	 * Methods
	 */
	
	public Config () {
		config.initDefault(); //initialize data...
	}
	
    void activate() {
    	msg.println("org.openhs.core.configuration: activate");    	    	
    }

    void deactivate() {
    	msg.println("org.openhs.core.configuration: deactivate");
    }

    void setService(ISiteService ser) {
    	msg.println("org.openhs.core.configuration: Set ISiteService");
        m_siteService = ser;
        /*
         * Initialize config and data structure...
         */
        initialize();                
    }

    void unsetService(ISiteService ser) {
    	msg.println("org.openhs.core.configuration: UnSet ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }	
    
    /*
     * Initialize configuration...
     */
    void initialize () {
    	/*
    	 * Init home directory...
    	 */
    	initHomeDir ();    	
    	
    	/*
    	 * Load configuration
    	 */
    	loadConfigData ();

    	/*
    	 * Load site data...
    	 */
    	loadSiteData ();
                
    }
    
    /*
     * Check home directory, if does not exist it is created.
     * If disk operations are disabled, nothing is done.
     */
    void initHomeDir () {
    	
    	if (!config.enableFiles) {    		
    		return;
    	}
                
        File dir = new File(config.openhsDir);
                
        if (!dir.exists()) {
    		    		
    		try {                                
            	dir.mkdir();                
    		}
    		catch (Exception e) {
    			msg.println("Home dir doesn't exist. ---> ERROR Creating...: " + config.openhsDir);     
    		}
    		finally {
    			msg.println("Home dir doesn't exist. ---> Created: " + config.openhsDir);   
    		}        	
        }    
        else {
        	if (!dir.isDirectory()) {
        		msg.println("Home dir exists, but it's no folder. ---> ERROR: " + config.openhsDir);
        	}        		
        }
    }
    
    /*
     * Load configuration from XML.
     * If file operations are disabled, nothing is done.
     */
    void loadConfigData () {
    	
    	if (!config.enableFiles) {    		
    		return;
    	}
    	
    	String fileSep = System.getProperty( "file.separator"); 
        String xmlFilePath = config.openhsDir + fileSep + config.xmlConfiguration;
        
        File xml = new File(xmlFilePath);
                       
    	if (xml.exists()) {
    		msg.println("Loading config data: " + xmlFilePath); 
    		
    		try {
    			Configuration config = (Configuration) load (xmlFilePath);    			    			
    		}
    		catch (Exception ex) {
    			msg.println("Error, cannot load site data from XML: " + xmlFilePath); 
    		}
    	}
    	else {	
        	
	        try {		        	
	        	save (xmlFilePath, config);
	        }
	        catch (Exception ex) {
	        	msg.println("Config XML not found ---> Creating of new one ERROR: " + ex.toString());
	        }
	        finally
	        {
	        	msg.println("Config XML not found ---> Created new one: " + xmlFilePath); 
	        }
    	}    	
    }    
    
    /*
     * Load Site data from XML.
     * If file operations are disabled, there is created only basic structure/
     */
    void loadSiteData () {
    	
    	if (!config.enableFiles) { 
    		
    		basicStructure();  
    		
    		msg.println("File operation disabled [see class Configuration::enableFiles] --> config & data not loaded from XML, created only basic structure");
    		
    		return;
    	}
    	
    	String fileSep = System.getProperty( "file.separator"); 
        String xmlFilePath = config.openhsDir + fileSep + config.xmlSite;
        
        File xml = new File(xmlFilePath);
                       
    	if (xml.exists()) {
    		msg.println("Loading site data: " + xmlFilePath); 
    		
    		try {
    			Site siteTmp = (Site) load (xmlFilePath);
    			
    			m_siteService.setSite(siteTmp);
    		}
    		catch (Exception ex) {
    			msg.println("Error, cannot load site data from XML: " + xmlFilePath); 
    		}
    	}
    	else {
        	basicStructure();      	
        	
	        try {		        	
	        	save (xmlFilePath, m_siteService.getSite());
	        }
	        catch (Exception ex) {
	        	msg.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
	        }
	        finally
	        {
	        	msg.println("Site XML not found ---> Created basic config and saved: " + xmlFilePath); 
	        }
    	}    	
    }
    
    /*
     * Basic structure.
     * Only inside and outside rooms with sensors.
     */
    void basicStructure ()
    {
        m_siteService.addRoom("Room1");
        m_siteService.addRoom("Outside");

        m_siteService.addSensor("Room1", "Sensor1");
        m_siteService.addSensor("Outside", "Sensor2");	    	
    }
            
    public boolean setConfiguration (Configuration configIn)
    {
    	config = configIn;
    	
    	return true;
    }
    
    public Configuration getConfiguration ()
    {
    	return config;
    }        
 
    /*
     * (non-Javadoc)
     * @see org.openhs.core.configuration.IConfiguration#save(java.lang.String)
     * Save complete configuration to XML
     */
    public void save (String path, Object o) throws Exception {
    	FileOutputStream fileStream = new FileOutputStream(path);
    	BufferedOutputStream buffStream = new BufferedOutputStream(fileStream);    	
    	
        XMLEncoder encoder = new XMLEncoder(buffStream);
        
        encoder.writeObject(o);
        
        encoder.close();
    }   
    
    public Object load (String path) throws Exception {
    	FileInputStream fileStream = new FileInputStream(path);
    	BufferedInputStream buffStream = new BufferedInputStream(fileStream);    	
    	
    	XMLDecoder decoder = new XMLDecoder(buffStream);

        Object o = decoder.readObject();
        
        decoder.close();
        
        return o;      
    }     
}
