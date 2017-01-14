package org.openhs.comm.dummy;

import java.util.regex.Pattern;

import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.Message;
import org.openhs.core.commons.Switch;

public class SwitchUpdater extends ThingUpdater {

	private boolean m_state;
	private boolean m_confirmed;
	
	public SwitchUpdater() {
	}

	public SwitchUpdater(String data) {
		String[] parts = data.split(Pattern.quote("|"));
		m_valid = false;
		m_confirmed = false;
		if (parts.length >= 3) { //request
			getDevicePath().setAddr(parts[0]);
			getDevicePath().setType(parts[1]);
			m_state = Boolean.valueOf(parts[2]);
			m_valid = true;
		}
		if (parts.length > 3) { //response
			String status = parts[3];
			if (status.equals("OK"))
				m_confirmed = true;
			m_valid = true;
		}
	}
	
	@Override
	public void updateOutcoming() {
		m_state = ((Switch)getThing()).getState();
		DummyMessage dm = new DummyMessage(getDevicePath().getAddr(), getDevicePath().getType(), Boolean.toString(m_state), "");
		Message msg = new Message(getDevicePath().getChannel(), getDevicePath().getTopic(), dm.toString()); 
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
