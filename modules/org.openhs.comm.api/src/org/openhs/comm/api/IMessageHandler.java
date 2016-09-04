package org.openhs.comm.api;

public interface IMessageHandler {
	void handleMessage(IMessage m, ICommService cs);
}
