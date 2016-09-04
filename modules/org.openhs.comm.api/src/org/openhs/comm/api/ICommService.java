package org.openhs.comm.api;

public interface ICommService {
	void registerMessageHandler(IMessageHandler mh);
	void unregisterMessageHandler(IMessageHandler mh);
	void sendMessage(IMessage m);
	String getName();
}
