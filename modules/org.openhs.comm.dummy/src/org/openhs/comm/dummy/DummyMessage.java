package org.openhs.comm.dummy;

import org.json.JSONObject;

public class DummyMessage {
	public DummyMessage(int addr, String type, String value, String confirmed) {
		m_addr = addr;
		m_type = type;
		m_value = value;
		m_confirmed = confirmed;
	}
	
	public String toString() {
		JSONObject jobj = new JSONObject();
		jobj.put("Addr", m_addr);
		jobj.put("Type", m_type);
		jobj.put("Value", m_value);
		jobj.put("Confirmed", m_confirmed);
		if (!m_confirmed.isEmpty())
			jobj.put("Confirmed", m_confirmed);
		return jobj.toString();
	}
	
	public int m_addr;
	public String m_type;
	public String m_value;
	public String m_confirmed;
		
}
