package org.openhs.core.cfg;

//***

import java.io.FileInputStream;
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

public class OpenhsProps {
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(OpenhsProps.class);
	
	private String m_openhsDir = null;
	private String m_openhsPropsFile = null;
	private ConfigurationAdmin m_ca = null;
	private Properties m_properties = null;
	
	private final String OHS_DIR = "openhs";
	private final String OHS_PROPS = "openhs.properties";
	private final String OHS_COMM_COMPONENT = "commComponent";
	private final String OHS_COMM_CONFIG_FILE = "commConfigFile";

    public OpenhsProps() {
    	String currentUsersHomeDir = System.getProperty("user.home");
        String fileSep = System.getProperty( "file.separator"); 
        m_openhsDir = currentUsersHomeDir + fileSep + OHS_DIR;
        m_openhsPropsFile = m_openhsDir + fileSep + OHS_PROPS;
    	m_properties = new Properties();
    }

    //loading props file and distribute via ConfigAdmin
    void loadProps()
    {
        
        //xmlConfiguration = "config.xml";
        //xmlSite = "site.xml"; 

    	InputStream input = null;

    	try {
    		input = new FileInputStream(m_openhsPropsFile);

    		// load a properties file
    		m_properties.load(input);
            
    		logger.info("===================== openhs properties =====================");
    		logger.info(logger.getName());

            if(m_properties != null && !m_properties.isEmpty()) {
                Iterator<Entry<Object, Object>> it = m_properties.entrySet().iterator();
                while (it.hasNext()) {
                    Entry<Object, Object> entry = it.next();
                    logger.info(entry.getKey() + " = " +
                    	entry.getValue() + " of type " + entry.getValue().getClass().toString());
                }
            }
    		
    		// get the property values for communication
    		String commComponent = m_properties.getProperty(OHS_COMM_COMPONENT);
    		String commConfigFile = m_properties.getProperty(OHS_COMM_CONFIG_FILE);
    	
    		Configuration config = null;
			config = m_ca.getConfiguration(commComponent);
		
			Dictionary<String, Object> dict = config.getProperties();
		    if (dict == null) {
		       dict = new Hashtable<String, Object>();
		    }
		    
		    // configure the Dictionary
		    dict.put(OHS_COMM_CONFIG_FILE, commConfigFile);
		
		    //push the configuration dictionary to the comm component
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
    
    void activate() {
        logger.info("org.openhs.core.cfg: activate()");
		loadProps();
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

}
