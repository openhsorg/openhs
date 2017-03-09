package org.openhs.core.commons;

import java.util.TreeMap;

public class Floor extends Thing {
	
	public String imagePath = "no path";
	
	//max dimensions of floor [m]
	public double dim_x = 0.000f; 
	public float dim_y = 0.000f;	
	
	public void setDimensions(float dimx, float dimy){		
		this.dim_x = dimx;
		this.dim_y = dimy;
	}
	
	/*
	 * Rooms.
	 */
	/*
	public TreeMap<String, Room> rooms = 
            new TreeMap<String, Room>();	
	
	*/
}
