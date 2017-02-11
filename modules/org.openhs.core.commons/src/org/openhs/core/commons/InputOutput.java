package org.openhs.core.commons;

public class InputOutput extends Thing {
	
	private Value m_state;
	
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
