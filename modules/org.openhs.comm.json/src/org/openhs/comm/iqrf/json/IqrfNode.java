package org.openhs.comm.iqrf.json;

import org.json.JSONObject;

public class IqrfNode {
	private int m_address = -1;
	private String m_command = null;
	String m_status = null;
	
	IqrfNode(JSONObject jobj) {
    	m_address = jobj.getInt("Addr");
    	m_command = jobj.getString("Comd");
    	m_status = jobj.getString("Status");
	}
	public int getAddress() {
		return m_address;
	}
	public void setAddress(int address) {
		m_address = address;
	}
	public String getCommand() {
		return m_command;
	}
	public void setCommand(String command) {
		m_command = command;
	}
}
