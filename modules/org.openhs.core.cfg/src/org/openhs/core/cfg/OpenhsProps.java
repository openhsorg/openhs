package org.openhs.core.cfg;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;

//***  !!!

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Properties;

import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.OhsConfig;
import org.openhs.core.commons.Site;

public class OpenhsProps {
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(OpenhsProps.class);

	private ConfigurationAdmin m_ca = null;
	private Properties m_properties = null;
    private ISiteService m_siteService = null;	
    private OhsConfig m_config = null;

	private final String OHS_COMM_COMPONENT = "commComponent";
	private final String OHS_COMM_CONFIG_FILE = "commConfigFile";
	
	public OpenhsBundles m_bundles = new OpenhsBundles();	

    public OpenhsProps() {
    	m_properties = new Properties();
    	m_config = new OhsConfig ();	
    }

    //loading props file and distribute via ConfigAdmin
    private void loadProps()
    {
    	InputStream input = null;

    	try {
    		input = new FileInputStream(m_config.m_openhsPropsFile);

    		// load a properties file
    		m_properties.load(input);
            
    		logger.info("===================== openhs properties =====================");
    		logger.info(logger.getName());

            listProps(m_properties);
    		
    		// get the property values for communication
    		String commComponent = m_properties.getProperty(OHS_COMM_COMPONENT);
    		String commConfigFile = m_properties.getProperty(OHS_COMM_CONFIG_FILE);
    		
    		System.out.println("\n\n------> Starting...." + commComponent);
    	
    		// load properties from comConfigFile
    		input = new FileInputStream(m_config.m_openhsDir + System.getProperty( "file.separator") + commConfigFile);
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
    
    private void loadData()
    {
        File xml = new File(m_config.m_openhsDataFile);
                       
    	if (xml.exists()) {
    		
    		try {
    			Site siteTmp = (Site) xmlLoad (m_config.m_openhsDataFile);
    			
    			m_siteService.setSite(siteTmp);
    		}
    		catch (Exception ex) {

    		}
    	}
    	else {
    		
    		m_siteService.buildHouse(6); //build some house....
        	        	
	        try {		        	
	        	xmlSave (m_config.m_openhsDataFile, m_siteService.getSite());
	        }
	        catch (Exception ex) {
	        	System.out.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
	        }
	        finally
	        {
	        	System.out.println("Site XML not found ---> Created basic config and saved: " + m_config.m_openhsDataFile); 
	        }
    	}       	    	
    }
    
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
