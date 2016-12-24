package org.openhs.core.site.api;

public interface ISensorUpdater {
	//void update(ISiteService site) throws SiteException;
	void update(Object thing);
	String getPathAddress();
	void setPath(String channel, String topic);
}
