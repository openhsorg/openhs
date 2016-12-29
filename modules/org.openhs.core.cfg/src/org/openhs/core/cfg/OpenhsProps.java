package org.openhs.core.cfg;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Properties;

//import org.openhs.core.commons.OhsConfig;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OpenhsProps {
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(OpenhsProps.class);

	private ConfigurationAdmin m_ca = null;
	private Properties m_properties = null;
    //public OhsConfig m_config = null;    
    
    private final String OHS_DIR = "openhs";
    private final String OHS_PROPS = "openhs.properties";

	public OpenhsBundles m_bundles = new OpenhsBundles();	
	public String m_openhsPropsFile;
    public String m_openhsDir;			 //OpenHS home directory	
    
    public OpenhsProps() {
    	m_properties = new Properties();
    	//m_config = new OhsConfig ();	
    	
    	String currentUsersHomeDir = System.getProperty("user.home");
        String m_fileSep = System.getProperty( "file.separator");     	    	
    	m_openhsDir = currentUsersHomeDir + m_fileSep + OHS_DIR + m_fileSep;
    	m_openhsPropsFile = m_openhsDir + OHS_PROPS;
    }

    private void loadComponentProps(String componentName, String componentPropFile )
    		throws IOException {
		// get the property values for communication
    	InputStream input = null;
		
		// load properties from comConfigFile
		input = new FileInputStream(m_openhsDir + componentPropFile);
		Properties componentProperties = new Properties();
		componentProperties.load(input);
		
		Configuration config = null;
		config = m_ca.getConfiguration(componentName);
	
		Dictionary<String, Object> dict = config.getProperties();
	    if (dict == null) {
	       dict = new Hashtable<String, Object>();
	    }
	    
	    // put properties to the Dictionary
	    for (final String name: componentProperties.stringPropertyNames())
	        dict.put(name, componentProperties.getProperty(name));		    
	
        dict.put("openhsHome", m_openhsDir);		    

	    // update configuration with dictionary => starts commComponent via ConfigAdmin 
	    config.update(dict);
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

            loadProps(m_properties);    		
            
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
    
    private void loadProps(Properties props)
    {
        if(props != null && ! props.isEmpty()) {
            Iterator<Entry<Object, Object>> it = props.entrySet().iterator();
            while (it.hasNext()) {
                Entry<Object, Object> entry = it.next();
                logger.info(entry.getKey() + " = " +
                	entry.getValue() + " of type " + entry.getValue().getClass().toString());
                try {
					loadComponentProps((String)entry.getKey(),(String)entry.getValue());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        }
    }
    
    public Properties getProperties () {
    	return this.m_properties;
    }
    
    public void activate() {
        logger.info("org.openhs.core.cfg: activate()");
		loadProps();
    }
    
    public void deactivate() {
        logger.info("org.openhs.core.cfg: deactivate()");
    }
    
    public void setService(ConfigurationAdmin ca) {
        logger.info("org.openhs.core.cfg: setService(ConfigurationAdmin ca)");
		m_ca = ca;
    }
    
    public void unsetService(ConfigurationAdmin ca) {
        logger.info("org.openhs.core.cfg: unsetService(ConfigurationAdmin ca)");
		if(m_ca == ca)
			m_ca = null;
    }
    
}
