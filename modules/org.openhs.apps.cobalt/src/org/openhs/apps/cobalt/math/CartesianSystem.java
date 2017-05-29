package org.openhs.apps.cobalt.math;

public class CartesianSystem {
	public Vector3D i = new Vector3D();
	public Vector3D j = new Vector3D();
	public Vector3D k = new Vector3D();
	
	public Point3D 			point = new Point3D ();
	
	public void setUnitSystem() {
		this.i.set(1.0, 0.0, 0.0);
		this.j.set(0.0, 1.0, 0.0);
		this.k.set(0.0, 0.0, 1.0);
	}

}

