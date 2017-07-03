package org.openhs.core.commons;

import java.util.TreeMap;

public class Floor extends Thing {
	
	public String imagePath = "no path";
	
	//max dimensions of floor [m]
	public double dim_x = 0.000f; 
	public double dim_y = 0.000f;	
	
	public void setDimensions(float dimx, float dimy){		
		this.dim_x = dimx;
		this.dim_y = dimy;
	}
	
	public double getDimX () {
		return this.dim_x;
	}
	
	public double getDimY () {
		return this.dim_y;
	}	
	
	public void setDimX (double x) {
		this.dim_x = x;
	}
	
	public void setDimY (double y) {
		this.dim_y = y;
	}	
	
	public String getImagePath () {
		return this.imagePath;
	}
}
