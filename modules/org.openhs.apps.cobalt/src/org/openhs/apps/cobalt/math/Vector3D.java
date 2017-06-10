package org.openhs.apps.cobalt.math;

public class Vector3D extends Point3D {
	public double length;
	
	Vector3D () {
		
	}
	
	Vector3D (double x, double y , double z){
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	public void set (Point3D p) {
		this.x = p.x;
		this.y = p.y;
		this.z = p.z;
	}

	public double getLenght () {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
	}

}
