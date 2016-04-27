/**
* @name		Humidity.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Humidity data
* 
*/

package org.openhs.core.commons;

import org.openhs.core.commons.Value;

public class Humidity extends Value {

	/**
	 * Measured value is in percentage of humidity.
	 */
	
	public String getString()
	{
		if (this.valid()) {
			return (String) "" + get();
		}
		else {
			return StringIdent.NOT_VALID.toString();
		}	
	}		
		
	
}
