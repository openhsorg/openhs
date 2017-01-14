package org.openhs.core.commons.api;

import org.openhs.core.commons.ThingUpdater;

public interface IMessageParser {
	ThingUpdater parseMessage(Message msg);
	String getParserName();
}
