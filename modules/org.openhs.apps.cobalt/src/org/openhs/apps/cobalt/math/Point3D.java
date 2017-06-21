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

	public void set (Point3D pt) {
		this.x = pt.x;
		this.y = pt.y;
		this.z = pt.z;
	}		
	
	public void setZero () {
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
	}
}
