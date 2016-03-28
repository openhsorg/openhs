/**
 * 
 */
package org.openhs.core.commons;

/**
 * @author mervin
 *
 */
public class Configuration {
	
	/*
	 * Home dir.
	 */
	public String openhsDir;
	
	/*
	 * Name Configuration xml file.
	 */
	public String xmlConfiguration; 	
	
	/*
	 * Name Site xml data file.
	 */
	public String xmlSite; 
	
	/*
	 * Disk operations
	 */
	public boolean enableFiles; //enables saving & loading XML files
	
	/*
	 * Methods...
	 */
	public void initDefault () {
		/*
		 * Home directory.
		 */
    	String currentUsersHomeDir = System.getProperty("user.home");
        String fileSep = System.getProperty( "file.separator"); 
        openhsDir = currentUsersHomeDir + fileSep + "openhs";     
        
        xmlConfiguration = "config.xml";
        xmlSite = "site.xml"; 
        
        enableFiles = false;
	}

}
