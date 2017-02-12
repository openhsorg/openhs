package org.openhs.core.commons;

import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.Message;

public abstract class ThingUpdater {
	private Thing m_thing;
	//private DevicePath m_devicePath = new DevicePath();
	private String m_devicePath = new String("none");
	private IMessageHandler m_messageHandler = null;
	protected boolean m_valid = false;

	public abstract void updateIncoming();
	public abstract void updateOutcoming();
	
	public Thing getThing() {
		return m_thing;
	}
	
	public void setThing(Thing thing) {
		this.m_thing = thing;
	}
	
	public void updateIncoming(Thing thing) {
		setThing(thing);
		updateIncoming();
	}

	public String getDevicePath() {
		return m_devicePath;
	}

	protected void setDevicePath(String devicePath) {
		m_devicePath = devicePath;
	}
	
	public boolean isValid() {
		return m_valid;
	}

	public IMessageHandler getMessageHandler() {
		return m_messageHandler;
	}

	public void setMessageHandler(IMessageHandler messageHandler) {
		m_messageHandler = messageHandler;
	}

}
