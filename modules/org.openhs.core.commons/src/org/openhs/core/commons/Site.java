/**
* @name		Site.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Main class of data storage.
* 
*/

package org.openhs.core.commons;

import java.util.ArrayList;
import java.util.TreeMap;


public class Site extends Thing {

	private static String id = "My First Crazy Site :):)";
	
	/*
	 * String:  sitePath, Object: any thing...
	 */
	public TreeMap<String, Thing> things = 
            new TreeMap<String, Thing>();
	
	/*
	 * String: devicePath, String: sitePath
	 */
	public TreeMap<String, String> devPaths = 
            new TreeMap<String, String>();	

	public Site () {
		this.name = "My First Crazy Site :):)";
		
	}
	
	public String getId ()
	{
		return id;
	}
	
	public void setId (String newID)
	{
		id = newID;
	}		
}
