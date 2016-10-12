package org.openhs.core.cfg;

//***  !!!

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

import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Bundle;
import java.io.File;
import java.util.ArrayList;

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
	
	public OpenhsBundles m_bundles = new OpenhsBundles();

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
    		
//    		System.out.println("\n\n------> Starting...." + commComponent);
    	
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
		    
		    String comp = "org.openhs.comm.rxtx";
		    
    		Configuration config2 = null;
			config2 = m_ca.getConfiguration(comp);
			
			Dictionary<String, Object> dict2 = config2.getProperties();
		    if (dict2 == null) {
		       dict2 = new Hashtable<String, Object>();
		    }
		    
		    // configure the Dictionary
		    dict2.put(OHS_COMM_CONFIG_FILE, commConfigFile);
		
		    //push the configuration dictionary to the comm component
		    config2.update(dict2);			
			
		    /*
		    try {
		    	
		    System.out.println("\n\n------> Starting....rxtx");
		    	
		    BundleContext bundlecontext = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
		 //   Bundle b = bundlecontext.installBundle("file:plugins" + File.separator + "org.openhs.comm.rxtx");
		    Bundle b = bundlecontext.installBundle("file:C:\\Users\\E454551\\openhs\\plugins\\org.openhs.comm.rxtx_1.0.0.201610061057.jar");
		    b.start();
		    
		    } catch(Exception ex){
		    	
		    	System.out.println("\n>>>:" + ex.toString());
		    }
		    */

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
