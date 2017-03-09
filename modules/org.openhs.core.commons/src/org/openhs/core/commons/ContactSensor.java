/**
* @name		ContactSensor.java 03/01/2017
* @author	Michal Valny
* @version	1.0
* @description 	Contact Sensor Data
* 
*/

package org.openhs.core.commons;

public class ContactSensor extends Thing {
	
	private Value m_state = new Value();
	
	//Coordinates in house 
	public float x = 0.0f;
	public float y = 0.0f;
	public float z = 0.0f;
	
	public boolean getState ()
	{
		return m_state.get() > 0.0 ;
	}
	
	public void setState (boolean state)
	{
		if (state)
			m_state.set(1.0);
		else
			m_state.set(0.0);
	}	

}
