package org.openhs.apps.cobalt.math;

public class PointControl {	
	
	public boolean validity;
	public Point6D position = new Point6D ();
	
	public double f0, f1, f2, f3, f4, f5, f6;
	
	PointControl() {
		validity = false;
		
		f0 = 0.0;
		f1 = 0.0;
		f2 = 0.0;
		f3 = 0.0;
		f4 = 0.0;
		f5 = 0.0;
		f6 = 0.0;
	}
		

}
