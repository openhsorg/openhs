package org.openhs.core.commons;

import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.Message;

public abstract class ThingUpdater {
	private Thing m_thing;
	private DevicePath m_devicePath = new DevicePath();
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

	public DevicePath getDevicePath() {
		return m_devicePath;
	}

	public void setDevicePath(DevicePath devicePath) {
		m_devicePath = devicePath;
	}
	
	boolean isValid() {
		return m_valid;
	}

	public IMessageHandler getMessageHandler() {
		return m_messageHandler;
	}

	public void setMessageHandler(IMessageHandler messageHandler) {
		m_messageHandler = messageHandler;
	}

}
