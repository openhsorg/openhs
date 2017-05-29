package org.openhs.apps.cobalt.math;

public class MathEngine {
	
	public Vector3D VectProduct(Vector3D a, Vector3D b) {
		Vector3D c = new Vector3D();
		
		c.x = (a.y * b.z) - (a.z * b.y);
		c.y = (a.z * b.x) - (a.x * b.z);
		c.z = (a.x * b.y) - (a.y * b.x);
		
		return c;
	}

}
