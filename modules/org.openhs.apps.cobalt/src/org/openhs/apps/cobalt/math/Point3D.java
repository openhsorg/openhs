package org.openhs.apps.cobalt.math;

import org.json.JSONObject;

public class Point3D {
	public double x;
	public double y;
	public double z;
	
	Point3D () {
		
	}
	
	Point3D (double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	
	public void set (double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}	

}
