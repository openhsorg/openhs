package org.openhs.apps.cobalt.math;

import java.util.ArrayList;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CobaltModel {
	
	GCodeLoader m_GCodeLoader = new GCodeLoader ();
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(CobaltModel.class);	
	
	protected MathEngine m_MathEngine = new MathEngine (); 
	
	private int m_period = 120;
	public Run m_run;
	public Thread m_myThd;	
	
	public Point3D pt;
	
	public double h [] = new double [8];
	public ArrayList<Axis> m_axes = new ArrayList<Axis>();
	public CartesianSystem m_ep = new CartesianSystem();	
	public ArrayList<Trajectory> m_trajectories = new ArrayList<Trajectory>();
		
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

		m_run = new Run();
		m_myThd = new Thread(m_run);
	}
	
	public void StartRun () {
		m_myThd.start();
	}
	
	protected void setAxes() {
		
		//Basic system 0
		Axis ax = new Axis();
		ax.cs.setUnitSystem();	
		ax.cs.point.set(0.0, 0.0, 0.0);
		ax.rot.set(0, 0, 50);
		ax.length = 50;		
		this.m_axes.add(ax);
		
		//System 1
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(0.0, 0.0, 0.0);
		ax.rot.set(0, 0, 1000);
		ax.length = 50;		
		this.m_axes.add(ax);
		
		//System 2
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2], 0.0, h[1]);
		ax.rot.set(0, 1000, 0);
		ax.length = 50;		
		this.m_axes.add(ax);		
		
		//System 3
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2], 0.0, h[1] + h[3]);
		ax.rot.set(0, 1000, 0);
		ax.length = 50;		
		this.m_axes.add(ax);			
		
		//System 4
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2] + h[6], h[5], h[1] + h[3] + h[4]);
		ax.rot.set(1000, 0.0, 0.0);
		ax.length = 50;		
		this.m_axes.add(ax);		
		
		//System 5
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2] + h[6], h[5], h[1] + h[3] + h[4]);
		ax.rot.set(0, 1000, 0);
		ax.length = 50;		
		this.m_axes.add(ax);
		
		//System 6
		ax = new Axis();		
		ax.cs.setUnitSystem();	
		ax.cs.point.set(h[2] + h[6] + h[7], h[5], h[1] + h[3] + h[4]);
		ax.rot.set(1000, 0, 0);
		ax.length = 50;		
		this.m_axes.add(ax);			
					
	}
	
	void setEP () {
		this.m_ep.setUnitSystem();
		this.m_ep.point.set(h[2] + h[6] +h[7], h[5], h[1] + h[3] + h[4]);
		
		//logger.info("------------------*****: " + this.m_ep.point.x + this.m_ep.point.y + this.m_ep.point.z);
	}
	
	public Point3D getEP () {		
		return this.m_ep.point;
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
			
			json.put(i + "rot_x", String.format("%.2f", ax.rot.x));
			json.put(i + "rot_y", String.format("%.2f", ax.rot.y));
			json.put(i + "rot_z", String.format("%.2f", ax.rot.z));				
			
			json.put(i + "lenght", String.format("%.2f", ax.length));	
			
			json.put(i + "num_faces", String.format("%d", ax.m_faces.size()));			
						
			i++;			
		}
				
		//String str = array.toString();
		
	//	logger.info("\n\nSSSS:" + json.toString());
		
		return json.toString();
		
	}
	
	public String axesPositionsToJSON(){
		
		JSONObject json = new JSONObject();
		json.put("num_axes", String.format("%d", m_axes.size()));
		
		int i = 0;
		
		for (Axis ax : m_axes){			

			json.put(i + "fi", String.format("%.2f", ax.fi));
		//	logger.info("\n\n--->ax: " + i + " fi: "+ ax.fi);
						
			i++;			
		}
				
		//String str = array.toString();
		
	//	logger.info("\n\nSSSS:" + json.toString());
		
		return json.toString();
		
	}	
	
	public String trajsToJSON(){
		
		JSONObject json = new JSONObject();
		json.put("num_trajs", String.format("%d", m_trajectories.size()));
		
		int i = 0;
		
		for (Trajectory tr : m_trajectories){			

			//tr.trajToJSON(i + "_");
			
			String id = i + "_";
			
			json.put(id + "origin_x", String.format("%.2f", tr.origin.x));
			json.put(id + "origin_y", String.format("%.2f", tr.origin.y));
			json.put(id + "origin_z", String.format("%.2f", tr.origin.z));
			json.put(id + "num_segments", String.format("%d", tr.segments.size()));
			
			int j = 0;
			
			for (Geometry3D seg : tr.segments) {
				
				String id2 = id + j + "_";
				
				if (seg instanceof Line3D) {
					
					json.put(id2 + "seg_type", String.format("line"));
					
					json.put(id2 + "p1_x", String.format("%.2f", ((Line3D) seg).p1.x));
					json.put(id2 + "p1_y", String.format("%.2f", ((Line3D) seg).p1.y));
					json.put(id2 + "p1_z", String.format("%.2f", ((Line3D) seg).p1.z));
					
					json.put(id2 + "p2_x", String.format("%.2f", ((Line3D) seg).p2.x));
					json.put(id2 + "p2_y", String.format("%.2f", ((Line3D) seg).p2.y));
					json.put(id2 + "p2_z", String.format("%.2f", ((Line3D) seg).p2.z));
																				
				}		
				
				j++;
			}
			
			i++;			
		}
				
		//String str = array.toString();
		
	//	logger.info("\n\nSSSS:" + json.toString());
		
		return json.toString();
		
	}	
	
	public String axesGeometryToJSON(int nAxis){
		
		JSONObject json = new JSONObject();
		
		Axis ax = m_axes.get(nAxis);
		
		json.put("num_faces", String.format("%d", ax.m_faces.size()));		
						
		int i = 0;						
		
		for (Face fc: ax.m_faces) {
			
			int nV = 0;
			
			for (Point3D vertex: fc.vertex) {
				
				json.put(i + "_v:" + nV + "fc_v_x", String.format("%.2f", vertex.x));
				json.put(i + "_v:" + nV + "fc_v_y", String.format("%.2f", vertex.y));
				json.put(i + "_v:" + nV + "fc_v_z", String.format("%.2f", vertex.z));
				
				nV ++;
			}			
			
			i++;
		}
		
	//	logger.info("\n\nSSSS:" + json.toString());
		
		return json.toString();		
	}		
	
	public boolean loadGCode(String path) {
		boolean res = false;
		
		Trajectory traj = m_GCodeLoader.Load(path);
		
		if (traj != null) {
			traj.origin.set(this.getEP());
			
			//Interpolation points
			traj.controlPointsRobotArray();
						
			m_trajectories.add(traj);
			res = true;
		}
		
		return res;
	}
	
	class Run implements Runnable {

		Trajectory traj;
		int ptr = 0;
		
		@Override
		public void run() {
			
			traj = m_trajectories.get(0);
			
			if (m_period > 0) {
				while (true) {
				//	updateVal();
					int nAx = 0;
					for (Axis ax: m_axes) {
						
						if (nAx == 1) {
							ax.fi = traj.controlPoints.get(ptr).f1;
						} else if (nAx == 2) {
							ax.fi = traj.controlPoints.get(ptr).f2;
						} else if (nAx == 3) {
							ax.fi = traj.controlPoints.get(ptr).f3;
						} else if (nAx == 4) {
							ax.fi = traj.controlPoints.get(ptr).f4;
						} else if (nAx == 5) {
							ax.fi = traj.controlPoints.get(ptr).f5;
						} else if (nAx == 6) {
							ax.fi = traj.controlPoints.get(ptr).f6;
						}
						
						nAx ++;
					}
					
					ptr ++;
					
					if (ptr >= traj.controlPoints.size()) {
						ptr = 0;
					}
					
					try {
						Thread.sleep(m_period);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
				}
			}
		}
	};	
}
