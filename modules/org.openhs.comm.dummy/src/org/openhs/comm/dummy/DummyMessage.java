package org.openhs.comm.dummy;

public class DummyMessage {
	public DummyMessage(String addr, String type, String value) {
		m_addr = addr;
		m_type = type;
		m_value = value;
	}
	
	public String toString() {
		return new String(m_addr + '|' + m_type + '|' + m_value);
	}
	
	public String m_addr;
	public String m_type;
	public String m_value;
		
}
