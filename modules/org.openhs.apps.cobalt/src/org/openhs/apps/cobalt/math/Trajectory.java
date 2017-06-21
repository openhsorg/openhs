package org.openhs.apps.cobalt.math;

import java.util.ArrayList;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Trajectory {
	
	private Logger logger = LoggerFactory.getLogger(Trajectory.class);	
	
	protected MathEngine math = new MathEngine();

	public ArrayList<Geometry3D> segments = new  ArrayList<Geometry3D>();
	public ArrayList<Point3D> defPoints = new  ArrayList<Point3D>();
	
	//Points for control of trajectory
	public ArrayList<PointControl> controlPoints = new  ArrayList<PointControl>();	
	
	//Origin of trajectory...
	public Point3D origin = new Point3D ();
	
	//Realtime pointer to control array
	public int ptrPoint = 0; 
	
	Trajectory () {
		origin.set(0.0, 0.0, 0.0);
	}
	
	public double getLenght () {
		double ln = 0.0;
		
		for (Geometry3D seg: segments) {
			ln = ln + seg.getLenght();
		}
				
		return ln;
	}
	
	public Point6D getControlPoint (double dist) {
		Point6D pt = new Point6D ();
		pt.validity = false;
				
		if (dist < 0 || dist > getLenght()) {
			return pt;
		}
		
		double dl = 0.0;
		
		for (Geometry3D seg : segments) {						
			
			if (dl + seg.getLenght() < dist) {
			//	logger.info("------------------SWITCH: " + " dl: " + dl + " Seg lg.: " + seg.getLenght() + " : " + dist);
				dl = dl + seg.getLenght();
			} else {
				//logger.info("------------------XXXXX: " + " dl: " + dl + " Seg lg.: " + seg.getLenght() + " : " + dist);
				pt = seg.getPointByLenght (dist - dl);
				break;
			}			
		}
				
		return pt;													
	}
	
	public void controlPointsArray (double inc) {
		
		double lenght = getLenght();
		
		double dl = 0.0;

		//Add first point of trajectory
		//Point6D ptf = segments.get(segments.size() - 1).getFirstPoint();
		PointControl pct1 = new PointControl();
		pct1.position = segments.get(0).getFirstPoint();
		
		//logger.info("------------------*****: " + pct1.position.point.x + " : " + pct1.position.point.y + " : " + pct1.position.point.z);
		
		controlPoints.add(pct1);
		
		dl = dl + inc;
		
		while (dl < lenght ) {
			
			PointControl pct = new PointControl();
			pct.position = getControlPoint (dl);			
			
		//	logger.info("------------------*****: " + " dl: " + dl + " : " + pct.position.point.x + " : " + pct.position.point.y + " : " + pct.position.point.z);	
			
			if (pct.position.validity) {
				controlPoints.add(pct);
			}
			
			dl = dl + inc;
		}
		
		//Add last point of trajectory
		PointControl pct2 = new PointControl();
		pct2.position = segments.get(segments.size() - 1).getLastPoint();
		
		controlPoints.add(pct2);
				
	}
		
	public void controlPointsRobotArray () {
				
		for (PointControl cp: controlPoints) {
			
			if (cp.position.validity) {
				
				//relative movement...
				cp.position.point.x = cp.position.point.x + origin.x;
				cp.position.point.y = cp.position.point.y + origin.y;
				cp.position.point.z = cp.position.point.z + origin.z;
				
				ReturnAxes ret = math.GetAxesPositions(cp.position);
				
			//	logger.info("robot retval---->: " + ret.retval + "pt:" + cp.position.point.x + " : " + cp.position.point.y + " : " + cp.position.point.z);
				
				if (ret.retval == 1) {
					cp.f1 = ret.fi1;
					cp.f2 = ret.fi2;
					cp.f3 = ret.fi3;
					cp.f4 = ret.fi4;
					cp.f5 = ret.fi5;
					cp.f6 = ret.fi6;
					
					cp.validity = true;
					
				//	logger.info("robot---->: " + cp.f1 + " : " + cp.f2 + " : " + cp.f3 + " : " + cp.f4 + " : " + cp.f5 + " : " + cp.f6);
				}				
			}
		}		
	}
	
	
	/*
	public String trajToJSON (String id) {
		JSONObject json = new JSONObject();
		
		json.put(id + "num_segments", String.format("%d", segments.size()));
		
		for (Geometry3D seg : segments) {
			
			if (seg instanceof Line3D) {
				
				json.put(id + "seg_type", "line");
				
				json.put(id + "p1_x", String.format("%.2f", ((Line3D) seg).p1.x));
				json.put(id + "p1_y", String.format("%.2f", ((Line3D) seg).p1.y));
				json.put(id + "p1_z", String.format("%.2f", ((Line3D) seg).p1.z));
				
				json.put(id + "p2_x", String.format("%.2f", ((Line3D) seg).p2.x));
				json.put(id + "p2_y", String.format("%.2f", ((Line3D) seg).p2.y));
				json.put(id + "p2_z", String.format("%.2f", ((Line3D) seg).p2.z));																				
			}
		}
		
		
		return json.toString();
	}
	*/
	
}
