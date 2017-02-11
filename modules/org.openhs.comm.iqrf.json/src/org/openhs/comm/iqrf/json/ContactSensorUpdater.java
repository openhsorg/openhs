package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.ThingUpdater;

public class ContactSensorUpdater extends ThingUpdater {

	private IqrfNode m_iqrfNode = null;
	private boolean m_state;
	private String m_port = "unknown";
	private boolean m_dirOut = false;
	private int m_bit = 0;
	
	public ContactSensorUpdater() {
		m_iqrfNode = new IqrfNode();
    	m_state = false;
	}

	public ContactSensorUpdater(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		m_port = jobj.getString("port");
		m_dirOut = jobj.getBoolean("dirOut");
		assert !m_dirOut; //must be false for ContactSensor if true it is Switch
	    m_bit = jobj.getInt("bit");
		
		setDevicePath("Mqtt" + '/' + "Iqrf/DpaResponse" + '/' + 
				Integer.toString(m_iqrfNode.getAddress())  + '/' + 
				m_iqrfNode.getType()  + '/' +
				m_port + '/' +
				(m_dirOut ? "Out" : "Inp") + '/' +
				Integer.toString(m_bit)
				);  

		if (m_iqrfNode.getCommand().equals("READ") && m_iqrfNode.isResult()) {
			m_state = jobj.getBoolean("State");
		}
		else 
	    	m_state = false;
	}

	public IqrfNode getIqrfNode() {
		return m_iqrfNode;
	}

	@Override
	public void updateIncoming() {
		((ContactSensor)getThing()).setState(m_state);
	}

	@Override
	public void updateOutcoming() {
	}

}
