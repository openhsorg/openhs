package org.openhs.comm.api;

public interface IMessageHandler {
	void handleMessage(Message m, ICommService cs);
}
