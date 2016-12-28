package org.openhs.comm.api;

import org.openhs.core.site.api.ISensorUpdater;

public interface IMessageParser {
	ISensorUpdater parseMessage(Message msg);
}
