package org.openhs.core.commons;

public class Thing {
	private ThingUpdater m_updater = null;

	protected String name = "no name";
	protected String m_sitePath = "unknown";
	
	public String getName () {
		return this.name;
	}
	
	public void setName (String name) {
		this.name = name;
	}

	public String getSitePath () {
		return m_sitePath;
	}
	
	public void setSitePath (String sitePath) {
		m_sitePath = sitePath;
	}
	
	public ThingUpdater getUpdater() {
		return m_updater;
	}

	public void setUpdater(ThingUpdater updater) {
		m_updater = updater;
		m_updater.setThing(this);
	}		
	
	boolean hasUpdater() {
		return m_updater != null;
	}

	void updateOutcoming() throws SiteException {
		if (m_updater != null)
			m_updater.updateOutcoming();
		else
			throw new SiteException("Thing: " + name + " has null updater");
		
	}
}
