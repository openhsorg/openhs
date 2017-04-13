package org.openhs.core.suppliers.api;

import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Supplier;

public interface ISuppliers {
	
	public Supplier getSupplier (String name) throws SiteException;

}
