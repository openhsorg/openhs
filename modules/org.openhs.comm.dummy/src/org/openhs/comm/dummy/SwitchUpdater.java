package org.openhs.comm.dummy;

import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.Message;
import org.json.JSONObject;
import org.openhs.core.commons.Switch;

public class SwitchUpdater extends ThingUpdater {

	private boolean m_state;
	private boolean m_confirmed;
	private int m_addr;
	private String m_type;
	
	public int getAddr() {
		return m_addr;
	}
	
	public SwitchUpdater() {
	}

	public SwitchUpdater(JSONObject jobj) {
    	m_type = jobj.getString("Type");
    	m_addr = jobj.getInt("Addr");
    	String val = jobj.optString("Value", "false");
    	if (val.equals("true"))
    		m_state = true;
    	else
    		m_state = false;
    	String conf = jobj.optString("Confirmed", "ERR");
    	if (conf.equals("OK"))
    		m_confirmed = true;
    	else
    		m_confirmed = false;
		m_valid = true;
		setDevicePath("DummyService" + '/' + "dummy" + '/' + m_addr  + '/' + m_type);  
	}
	
	@Override
	public void updateOutcoming() {
		m_state = ((Switch)getThing()).getState();
		DummyMessage dm = new DummyMessage(m_addr, m_type, Boolean.toString(m_state), "");
		Message msg = new Message("DummyService", "dummy", dm.toString()); 

		getMessageHandler().handleOutcomingMessage(msg);
	}

	@Override
	public void updateIncoming() {
		if (m_valid && m_confirmed) {
			((Switch)getThing()).setDeviceState(m_state);
		}
	}

	public boolean isState() {
		return m_state;
	}

	public boolean isConfirmed() {
		return m_confirmed;
	}

}
