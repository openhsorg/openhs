package org.openhs.core.commons.api;

public interface IMessageHandler {
	void handleIncomingMessage(Message m);
	void handleOutcomingMessage(Message m);
}
