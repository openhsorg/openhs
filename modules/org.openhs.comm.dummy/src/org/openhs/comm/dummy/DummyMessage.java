package org.openhs.comm.dummy;

public class DummyMessage {
	public DummyMessage(String addr, String type, String value, String confirmed) {
		m_addr = addr;
		m_type = type;
		m_value = value;
		m_confirmed = confirmed;
	}
	
	public String toString() {
		if (m_confirmed.isEmpty())
			return new String(m_addr + '|' + m_type + '|' + m_value);
		else
			return new String(m_addr + '|' + m_type + '|' + m_value + '|' + m_confirmed);
	}
	
	public String m_addr;
	public String m_type;
	public String m_value;
	public String m_confirmed;
		
}
