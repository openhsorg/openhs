package org.openhs.core.commons;

public class OhsConfig {
	
	private final String OHS_DIR = "openhs";
	private final String OHS_PROPS = "openhs.properties";
	private final String OHS_XML_DATASRUCT = "ohs_data.xml";
	private final String OHS_XML_CONFIG = "ohs_config.xml";

	public String m_openhsDir;	
	public String m_openhsPropsFile;
	public String m_openhsDataFile;
	public String m_openhsConfigFile;

	
	/*
	 * Disk operations
	 */
	public boolean enableFiles; //enables saving & loading XML files

	public OhsConfig () {

    	String currentUsersHomeDir = System.getProperty("user.home");
        String m_fileSep = System.getProperty( "file.separator"); 
        m_openhsDir = currentUsersHomeDir + m_fileSep + OHS_DIR;  
        m_openhsPropsFile = m_openhsDir + m_fileSep + OHS_PROPS;
        m_openhsDataFile = m_openhsDir + m_fileSep + OHS_XML_DATASRUCT;
        m_openhsConfigFile = m_openhsDir + m_fileSep + OHS_XML_CONFIG;
        
        enableFiles = true;
	}	
	
}
