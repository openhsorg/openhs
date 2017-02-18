package org.openhs.core.commons;

public class ContactSensor extends Thing {
	
	private Value m_state = new Value();
	
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
