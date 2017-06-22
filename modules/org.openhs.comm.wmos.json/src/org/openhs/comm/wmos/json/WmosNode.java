package org.openhs.comm.wmos.json;

import org.json.JSONObject;

public class WmosNode {
	private String m_type = new String();
	private String m_address = new String();
	private String m_command = new String();
	private int m_timeout = -1;
	private String m_status = new String();
	private boolean m_result = false;
	
	public WmosNode(String[] tokens) {
		m_address = tokens[0] + '/' + tokens[1];
		m_type = tokens[2];
	}

	public WmosNode(JSONObject jobj) {
    	m_type = jobj.getString("Type");
    	m_address = jobj.getString("Addr");

    	m_command = jobj.optString("Comd");
//    	m_timeout = jobj.optInt("Timeout");
//    	m_status = jobj.optString("Status");
//    	if (!m_status.isEmpty()) {
//    	  m_result = m_status.equals("STATUS_NO_ERROR");	
//    	}
	}

	public String getType() {
		return m_type;
	}

	public void setType(String type) {
		m_type = type;
	}

//	public int getTimeout() {
//		return m_timeout;
//	}
//
//	public void setTimeout(int timeout) {
//		m_timeout = timeout;
//	}
//
//	public String getStatus() {
//		return m_status;
//	}
//
//	public void setStatus(String status) {
//		m_status = status;
//	}

	public WmosNode() {
	}

	public String getAddress() {
		return m_address;
	}

	public void setAddress(String address) {
		m_address = address;
	}
	
	public String getCommand() {
		return m_command;
	}
	
	public void setCommand(String command) {
		m_command = command;
	}
	
	public JSONObject encode(JSONObject jobj) {
    	jobj.put("Type", m_type);
    	jobj.put("Addr", m_address);
//    	if (!m_command.isEmpty())
//    		jobj.put("Comd", m_command);
//    	if (m_timeout >= 0)
//    		jobj.put("Timeout", m_timeout);
//    	if (!m_status.isEmpty())
//    		jobj.put("Result", m_status);
    	return jobj;
	}

	public boolean isResult() {
		return  m_result;
	}
}
