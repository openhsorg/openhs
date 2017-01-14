package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SwitchUpdater extends ThingUpdater {

	private Logger logger = LoggerFactory.getLogger(SwitchUpdater.class);
	
	private IqrfNode m_iqrfNode = new IqrfNode();
	private boolean m_state;
	private boolean m_confirmed;
	
	public SwitchUpdater() {
	}

	//{\"Type\":\"LedR\",\"Addr\":0,\"Comd\":\"PULSE\"}
	public SwitchUpdater(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		getDevicePath().setAddr(Integer.toString(m_iqrfNode.getAddress()));
		getDevicePath().setType(m_iqrfNode.getType());

		if(m_iqrfNode.getCommand().equals("ON")) 
			m_state = true;
    	else
			m_state = false;
		
		if (m_iqrfNode.getStatus().equals("STATUS_NO_ERROR"))
			m_confirmed = true;
		
		m_valid = true;
	}
	
	@Override
	public void updateOutcoming() {
		m_state = ((Switch)getThing()).getState();
		String cmd;
		if(m_state)
    		//cmd = new String("ON");
    		cmd = "ON";
    	else
    		cmd = "OFF";
		
		//{\"Type\":\"LedR\",\"Addr\":0,\"Comd\":\"PULSE\"}
    	m_iqrfNode.setType("LedR");
    	m_iqrfNode.setAddress(Integer.valueOf(getDevicePath().getAddr()));
    	m_iqrfNode.setCommand(cmd);
    	
    	JSONObject jobj = new JSONObject();
    	jobj = m_iqrfNode.encode(jobj);
    	
    	logger.debug("  updateOutcoming(): " + jobj.toString());
    	//Message msg = new Message(getDevicePath().getChannel(), getDevicePath().getTopic(), dm.toString());
    	Message msg = new Message(getDevicePath().getChannel(), "Iqrf/DpaRequest", jobj.toString());
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
