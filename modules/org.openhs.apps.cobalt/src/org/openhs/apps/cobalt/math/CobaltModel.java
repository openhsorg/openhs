package org.openhs.apps.cobalt.math;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openhs.apps.cobalt.CobaltServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CobaltModel {
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(CobaltModel.class);	
	
	protected MathEngine m_MathEngine = new MathEngine (); 
	
	public Point3D pt;
	
	public double h [] = new double [8];
	public ArrayList<Axis> m_axes = new ArrayList<Axis>();
	public CartesianSystem m_ep = new CartesianSystem();
	
	public CobaltModel () {
		
		h[0] = 0.0;
		h[1] = 719;
		h[2] = 300;
		h[3] = 600;
		h[4] = 140;
		h[5] = 12;
		h[6] = 573;
		h[7] = 127;
		
		this.setAxes();
		
		this.setEP();
		
	}
	
	protected void setAxes() {
		
		//Basic system 0
		Axis ax = new Axis();
		ax.cs.setUnitSystem();	
		ax.cs.point.set(0.0, 0.0, 0.0);
		ax.length = 50;		
		this.m_axes.add(ax);
		
		//System 1
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(0.0, 0.0, 0.0);
		ax.length = 50;		
		this.m_axes.add(ax);
		
		//System 2
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2], 0.0, h[1]);
		ax.length = 50;		
		this.m_axes.add(ax);		
		
		//System 3
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2], 0.0, h[1] + h[3]);
		ax.length = 50;		
		this.m_axes.add(ax);			
		
		//System 4
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2] + h[6], h[5], h[1] + h[3] + h[4]);
		ax.length = 50;		
		this.m_axes.add(ax);		
		
		//System 5
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2] + h[6], h[5], h[1] + h[3] + h[4]);
		ax.length = 50;		
		this.m_axes.add(ax);
		
		//System 6
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2] + h[6] + h[7], h[5], h[1] + h[3] + h[4]);
		ax.length = 50;		
		this.m_axes.add(ax);			
					
	}
	
	void setEP () {
		this.m_ep.setUnitSystem();
		this.m_ep.point.set(h[2] + h[6] +h[7], h[5], h[1] + h[3] + h[4]);
	}
	
	public String axesToJSON(){
		
		JSONObject json = new JSONObject();
		json.put("num_axes", String.format("%d", m_axes.size()));
		
		int i = 0;
		
		for (Axis ax : m_axes){			

			json.put(i + "cs_px", String.format("%.2f", ax.cs.point.x));
			json.put(i + "cs_py", String.format("%.2f", ax.cs.point.y));
			json.put(i + "cs_pz", String.format("%.2f", ax.cs.point.z));
			
			json.put(i + "cs_i_x", String.format("%.2f", ax.cs.i.x));
			json.put(i + "cs_i_y", String.format("%.2f", ax.cs.i.y));
			json.put(i + "cs_i_z", String.format("%.2f", ax.cs.i.z));
			
			json.put(i + "cs_j_x", String.format("%.2f", ax.cs.j.x));
			json.put(i + "cs_j_y", String.format("%.2f", ax.cs.j.y));
			json.put(i + "cs_j_z", String.format("%.2f", ax.cs.j.z));		
			
			json.put(i + "cs_k_x", String.format("%.2f", ax.cs.k.x));
			json.put(i + "cs_k_y", String.format("%.2f", ax.cs.k.y));
			json.put(i + "cs_k_z", String.format("%.2f", ax.cs.k.z));		
			
			json.put(i + "lenght", String.format("%.2f", ax.length));	
			
			
			i++;
			
		}
		
		
		//String str = array.toString();
		
		logger.info("\n\nSSSS:" + json.toString());
		
		return json.toString();
		
	}
	
	
	
}
