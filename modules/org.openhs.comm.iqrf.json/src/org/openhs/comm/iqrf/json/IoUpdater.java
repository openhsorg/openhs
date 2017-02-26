package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IoUpdater extends ThingUpdater {

	private Logger logger = LoggerFactory.getLogger(IoUpdater.class);
	
	private IqrfNode m_iqrfNode = null;
	private boolean m_state = false;
	private boolean m_confirmed = false;
	private String m_port = "unknown";
	private String m_comd = "unknown";
	private int m_bit = -1;
	private int m_input = -1;
	
	public IoUpdater() {
		m_iqrfNode = new IqrfNode();
    	m_state = false;
	}

	public IoUpdater(JSONObject jobj) throws ParseException {
		m_iqrfNode = new IqrfNode(jobj);

		m_comd = jobj.getString("Comd");
		m_port = jobj.getString("Port");
	    m_bit = jobj.getInt("Bit");

		if (m_iqrfNode.getCommand().equals("GET")) {
			m_input = 1;
		}
		else if (m_iqrfNode.getCommand().equals("SET")) {
			m_input = 0;
		}
		else if (m_iqrfNode.getCommand().equals("DIRECTION")) {
			m_input = -1;
		}
		else {
			throw new ParseException("Unexpected cmd: Comd=" + m_iqrfNode.getCommand());
		}

	    setDevicePath("Mqtt" + '/' + "Iqrf/DpaResponse" + '/' +
				Integer.toString(m_iqrfNode.getAddress())  + '/' +
				m_iqrfNode.getType()  + '/' +
				m_comd + '/' +
				m_port + '/' +
				Integer.toString(m_bit)
				);  

		if (m_iqrfNode.isResult() && m_input > -1) {
			m_state = jobj.getBoolean("Val");
			m_confirmed = true;
		}

		m_valid = true;
	}
	
	@Override
	public void updateIncoming() {
		if (m_input == 1) {
			((ContactSensor)getThing()).setState(m_state);
		}
		else if (m_input == 0) {
			if (m_valid && m_confirmed) {
				((Switch)getThing()).setDeviceState(m_state);
			}
		}
	}

	@Override
	public void updateOutcoming() {
		if (m_input == 0) {
			m_state = ((Switch)getThing()).getState();
    	
	    	JSONObject jobj = new JSONObject();
	    	jobj = m_iqrfNode.encode(jobj);
	    	
	    	jobj.put("Port", m_port);
	    	jobj.put("Bit", m_bit);
	    	jobj.put("Val", m_state);
	    	
	    	Message msg = new Message("Mqtt", "Iqrf/DpaRequest", jobj.toString());
	    	getMessageHandler().handleOutcomingMessage(msg);
		}
	}

	public boolean isState() {
		return m_state;
	}

	public boolean isConfirmed() {
		return m_confirmed;
	}

}
