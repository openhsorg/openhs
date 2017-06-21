package org.openhs.apps.cobalt.math;

public class Line3D extends Geometry3D {
	public Point3D p1 = new Point3D ();
	public Point3D p2 = new Point3D ();

	public double getLenght () {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2.0) + Math.pow(p2.y - p1.y, 2.0) + Math.pow(p2.z - p1.z, 2.0));
	}
	
	public Point6D getPointByLenght (double distance) {
		Point6D pt = new Point6D();
		
		double lenght = getLenght();
		
		if (distance < 0.0 || distance > lenght) {
			return pt;
		}
		
		Point3D pl = new Point3D();
		pl.set(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
						
		pt.point.x = (pl.x * (distance / lenght)) + p1.x;
		pt.point.y = (pl.y * (distance / lenght)) + p1.y;
		pt.point.z = (pl.z * (distance / lenght)) + p1.z;
		
		pt.validity = true;		
		
		return pt;
	}
	
	public Point6D getFirstPoint () {
		Point6D pt = new Point6D();
		
		pt.point.set(p1);
		pt.validity = true;
		
		return pt;
	}
	
	public Point6D getLastPoint () {
		Point6D pt = new Point6D();
		
		pt.point.set(p2);
		pt.validity = true;
		
		return pt;
	}		
}
