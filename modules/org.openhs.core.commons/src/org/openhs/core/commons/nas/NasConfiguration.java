/**
* @name		NasConfiguration.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	NasConfiguration data
* 
*/

package org.openhs.core.commons.nas;

import java.util.ArrayList;

public class NasConfiguration {

	/*
	 * List of local NAS folders.
	 */
	public ArrayList <NasFile> folders = new ArrayList<NasFile>();	
	
	/*
	 * List of group names.
	 */
	public ArrayList <String> group = new ArrayList<String>();		
	
}
