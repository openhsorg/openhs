package org.openhs.core.commons.nas;

import java.io.File;

public class NasFile extends File {
	
	/*
	 * Mounted disc...
	 */
	String pathDisk = "";
	
	public NasFile (String path)
	{
		super(path);
	}

}
