/**
* @name		IConfiguration.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	IConfiguration interface.
*
*/

package org.openhs.core.configuration;

import org.openhs.core.commons.Configuration;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.site.data.ISiteService;


public interface IConfiguration {
		
	public Configuration getConfiguration ();
	
	public boolean setConfiguration (Configuration configIn);
	
	public void save (String path, Object o) throws Exception;
	
	public Object load (String path) throws Exception;

}
