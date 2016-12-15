package org.openhs.core.cfg;

import java.beans.XMLEncoder;
import java.beans.XMLDecoder;
import java.io.*;

import org.openhs.core.commons.Site;
import org.openhs.core.commons.OhsConfig;
import org.openhs.core.site.data.ISiteService;

public class OpenhsDataStructure {
	
    /*
     * Basic data structure.
     */
    public ISiteService m_siteService = null;	
    
    /*
	 * Configuration.
	 */
    public OhsConfig m_config = null;	
	
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
    	
    	if (!m_config.enableFiles) {    		
    		return;
    	}
                
        File dir = new File(m_config.m_openhsDir);
                
        if (!dir.exists()) {
    		    		
    		try {                                
            	dir.mkdir();                
    		}
    		catch (Exception e) {
    			System.out.println("Home dir doesn't exist. ---> ERROR Creating...: " + m_config.m_openhsDir);     
    		}
    		finally {
    			System.out.println("Home dir doesn't exist. ---> Created: " + m_config.m_openhsDir);   
    		}        	
        }    
        else {
        	if (!dir.isDirectory()) {
        		System.out.println("Home dir exists, but it's no folder. ---> ERROR: " + m_config.m_openhsDir);
        	}        		
        }
    }
    
    /*
     * Load configuration from XML.
     * If file operations are disabled, nothing is done.
     */
    void loadConfigData () {
    	
    	if (!m_config.enableFiles) {    		
    		return;
    	}
    	
    	String fileSep = System.getProperty( "file.separator"); 
        String xmlFilePath = m_config.m_openhsConfigFile;
        
        File xml = new File(xmlFilePath);
                       
    	if (xml.exists()) {
    			System.out.println("Loading config data: " + xmlFilePath); 
    		
    		try {
    			OhsConfig config = (OhsConfig) load (xmlFilePath);    			    			
    		}
    		catch (Exception ex) {
    			System.out.println("Error, cannot load site data from XML: " + xmlFilePath); 
    		}
    	}
    	else {	
        	
	        try {		        	
	        	save (xmlFilePath, m_config);
	        }
	        catch (Exception ex) {
	        	System.out.println("Config XML not found ---> Creating of new one ERROR: " + ex.toString());
	        }
	        finally
	        {
	        	System.out.println("Config XML not found ---> Created new one: " + xmlFilePath); 
	        }
    	}    	
    }    
    
    /*
     * Load Site data from XML.
     * If file operations are disabled, there is created only basic structure/
     */
    void loadSiteData () {
    	
    	if (!m_config.enableFiles) { 
    		
    		basicStructure();      		    	
    		
    		return;
    	}
    	
    	String fileSep = System.getProperty( "file.separator"); 
        String xmlFilePath = m_config.m_openhsDataFile;
        
        File xml = new File(xmlFilePath);
                       
    	if (xml.exists()) {
    		
    		try {
    			Site siteTmp = (Site) load (xmlFilePath);
    			
    			m_siteService.setSite(siteTmp);
    		}
    		catch (Exception ex) {

    		}
    	}
    	else {
        	basicStructure();      	
        	
	        try {		        	
	        	save (xmlFilePath, m_siteService.getSite());
	        }
	        catch (Exception ex) {
	        	System.out.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
	        }
	        finally
	        {
	        	System.out.println("Site XML not found ---> Created basic config and saved: " + xmlFilePath); 
	        }
    	}    	
    }
    
    /*
     * Basic structure.
     * Only inside and outside rooms with sensors.
     */
    void basicStructure ()
    {
    	/*
        m_siteService.addRoom("Room1");
        m_siteService.addRoom("Outside");

        m_siteService.addSensor("Room1", "Sensor1");
        m_siteService.addSensor("Outside", "Sensor2");	  
        */
        
        m_siteService.buildHouse(6);
    }
            
    public boolean setConfiguration (OhsConfig configIn)
    {
    	m_config = configIn;
    	
    	return true;
    }
    
    public OhsConfig getConfiguration ()
    {
    	return m_config;
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
