package org.openhs.apps.cobalt.math;

public class Point6D {
	public Point3D point = new Point3D ();
	public Point3D orbit = new Point3D (); //rad
	
	public boolean validity = false; 
	
	Point6D () {
		point.setZero();
		orbit.setZero();
	}

}
