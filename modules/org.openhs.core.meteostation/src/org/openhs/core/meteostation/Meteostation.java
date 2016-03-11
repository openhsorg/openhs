/**
* @name		Meteostation.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	It keeps meteostation data.
* 
*/

package org.openhs.core.meteostation;

import org.openhs.core.site.data.Temperature;

public class Meteostation {
	
	
	
	private Temperature tempIn = new Temperature ();
	private Temperature tempOut = new Temperature ();

	public Temperature getTempOut ()
	{
		return tempOut;
	}	

	public Temperature getTempIn ()
	{
		return tempIn;
	}	
	
	public void setTempOut (Temperature temp)
	{
		tempOut = temp;
	}	

	public void setTempIn (Temperature temp)
	{
		tempIn = temp;
	}		
}
