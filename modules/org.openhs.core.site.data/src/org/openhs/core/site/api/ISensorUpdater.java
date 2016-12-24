package org.openhs.core.site.api;

import org.openhs.core.commons.SiteException;

public interface ISensorUpdater {
	void update(ISiteService site) throws SiteException;
	String getPathAddress();
	void setPath(String channel, String topic);
}
