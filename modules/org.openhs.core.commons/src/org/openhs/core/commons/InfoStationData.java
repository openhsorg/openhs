package org.openhs.core.commons;

public class InfoStationData {
	
	public boolean validity = false;
	public String tmpInPath = "";
	public String tmpOutPath = "";
	
	public String toString() {
		
		String out = "";
				
		out = out + "\n validity: " + validity;
		out = out + "\n tmpInPath: " + tmpInPath;
		out = out + "\n tmpOutPath: " + tmpOutPath;
				
		return out;
	}	

}
