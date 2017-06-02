package org.openhs.apps.cobalt.math;

public class Vector3D extends Point3D {
	public double length;
	
	public void set (Point3D p) {
		this.x = p.x;
		this.y = p.y;
		this.z = p.z;
	}


}
