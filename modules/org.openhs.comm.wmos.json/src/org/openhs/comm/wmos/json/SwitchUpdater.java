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
		
		//m_iqrfNode.setCommand(cmd);
    	
    	//JSONObject jobj = new JSONObject();
    	//jobj = m_iqrfNode.encode(jobj);
    	
    	//Message msg = new Message("Mqtt", "Wmos", jobj.toString());

		Message msg = new Message("Mqtt", "devices/15889de0/relay/on/set", cmd);
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
