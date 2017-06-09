package org.openhs.apps.cobalt.math;

import java.io.BufferedReader;
import java.io.FileReader;

public class GCodeLoader {
	
	public Trajectory Load (String filePath) {
		Trajectory traj = new Trajectory();
		
		try {
			
			FileReader inputFile = new FileReader(filePath);
			BufferedReader bufferReader = new BufferedReader(inputFile);
			
			String line;
			
			while ((line = bufferReader.readLine()) != null) {
				
				
			}
			
			bufferReader.close();
			inputFile.close();
			
		} catch (Exception e) {			
			return null;
		}
						
		return traj;
	}

}
