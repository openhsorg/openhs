package org.openhs.comm.wmos.json;

import org.json.JSONObject;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SwitchUpdater extends ThingUpdater {

	private Logger logger = LoggerFactory.getLogger(SwitchUpdater.class);
	
	private WmosNode m_wmosNode = new WmosNode();
	private boolean m_state;
	private boolean m_confirmed;
	
	public SwitchUpdater() {
	}

	public SwitchUpdater(String[] tokens) {
		m_wmosNode = new WmosNode(tokens);

		setDevicePath("Mqtt" + '/' + m_wmosNode.getAddress()  + '/' + m_wmosNode.getType());  
		
		boolean state = false;
		if (tokens[4].equals("true"))
			state = true;

		if (tokens[3].equals("on")) {
			m_state = state;
			m_confirmed = true;
			m_valid = true;
		}
		else {
			m_confirmed = false;
			m_valid = false;
		}
	}

	public SwitchUpdater(JSONObject jobj) {
		m_wmosNode = new WmosNode(jobj);

		
		setDevicePath("Mqtt" + '/' + m_wmosNode.getAddress() + '/' + m_wmosNode.getType());  

		if(m_wmosNode.getCommand().equals("ON")) 
			m_state = true;
    	else
			m_state = false;
		
		if (m_wmosNode.isResult())
			m_confirmed = true;
		
		m_valid = true;
	}
	
	@Override
	public void updateOutcoming() {
		m_state = ((Switch)getThing()).getState();
		String cmd;
		if(m_state)
    		cmd = "true";
    	else
    		cmd = "false";
		
		Message msg = new Message("Mqtt", m_wmosNode.getAddress() + '/' + m_wmosNode.getType() + "/on/set", cmd);
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
