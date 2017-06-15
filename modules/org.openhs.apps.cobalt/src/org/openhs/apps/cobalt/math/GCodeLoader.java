package org.openhs.apps.cobalt.math;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GCodeLoader {
	
	private Logger logger = LoggerFactory.getLogger(GCodeLoader.class);
	
	private Point3D pointPrew = new Point3D ();
	
	GCodeLoader () {
		pointPrew.set(0.0, 0.0, 0.0);
		
	}
	
	public Trajectory Load (String filePath) {
		Trajectory traj = new Trajectory();
		
		try {
			
			FileReader inputFile = new FileReader(filePath);
			BufferedReader bufferReader = new BufferedReader(inputFile);
			
			String line;
			
						
			while ((line = bufferReader.readLine()) != null) {
				
				Line3D ln = getLine(line);
				
				if (ln != null) {
					traj.segments.add(ln);
			//		logger.info("Line added to raj:" + line);
				}				
			}
			
			bufferReader.close();
			inputFile.close();
			
		} catch (Exception e) {			
			return null;
		}
		
		//Control array
		traj.controlPointsArray(2.0);
		
		
		
	//	logger.info(">>>>>>>>>>>>>>>>Control array size:" + traj.controlPoints.size());
						
		return traj;
	}
	
	private Line3D getLine (String command) {
		Line3D line = new Line3D ();
		
		if (command.contains("G1")) {			
			
			Point3D pt = getPoint (command);
			
			line.p1.set(pointPrew);
			line.p2.set(pointPrew.x + pt.x, pointPrew.y + pt.y, pointPrew.z + pt.z);	
			
			//logger.info("------------------*****p1: " + line.p1.x + line.p1.y + line.p1.z);
			//logger.info("------------------*****p2: " + line.p2.x + line.p2.y + line.p2.z);
			
			pointPrew.set(line.p2);
			
			//logger.info("Line: " + line.p1.x + " : " + line.p1.y + " : " + line.p1.z + " -> " + line.p2.x + " : " + line.p2.y + " : " + line.p2.z);
			
		} else {
			return null;
		}		
		
		return line;
	}
	
	private Point3D getPoint (String command) {
		Point3D pt = new Point3D ();
		pt.set(0.0, 0.0, 0.0);		
		
		StringTokenizer stringTokenizer = new StringTokenizer(command);

	//	int numberOfTokens = stringTokenizer.countTokens();
		  
	//	int iNum = 0;
						  
	    while (stringTokenizer.hasMoreElements()) {
	    	
	    	String s = stringTokenizer.nextElement().toString();
	    	
	    	if (s.equals("X")) {
	    		String num = stringTokenizer.nextElement().toString();
	    		
			    if (isNumber(num)){			   
			    	pt.x = Double.parseDouble(num);
			    }
			    
	    	} else if (s.equals("Y")) {
	    		String num = stringTokenizer.nextElement().toString();
	    		
			    if (isNumber(num)){			   
			    	pt.y = Double.parseDouble(num);
			    }	    		
	    	} else if (s.equals("Z")) {
	    		String num = stringTokenizer.nextElement().toString();
	    		
			    if (isNumber(num)){			   
			    	pt.z = Double.parseDouble(num);
			    }	    		
	    	}	    	
	    	
	    	//logger.info("TKN: " + s);
	    }
		
	    //logger.info("point: " + pt.x + " : " + pt.y + " : " + pt.z);
		//Integer.parseInt(s)
		
		return pt;
	}
	
	public static boolean isNumber(String string) {
	    try {
	        Double.parseDouble(string);
	    } catch (Exception e) {
	        return false;
	    }
	    return true;
	}	

}
