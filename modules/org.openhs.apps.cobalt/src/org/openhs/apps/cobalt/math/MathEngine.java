package org.openhs.apps.cobalt.math;

public class MathEngine {
	
	CobaltLimits lim = new CobaltLimits ();
	
	public Vector3D VectProduct(Vector3D a, Vector3D b) {
		Vector3D c = new Vector3D();
		
		c.x = (a.y * b.z) - (a.z * b.y);
		c.y = (a.z * b.x) - (a.x * b.z);
		c.z = (a.x * b.y) - (a.y * b.x);
		
		return c;
	}
	
	public int checkLimits(double number, double lim_min, double lim_max) {
		if(number >= lim_min && number <= lim_max) return 1;
		else return 0;
	}
	
	public Vector3D transformXYZ (Vector3D vec, double angle, Vector3D rotVec){
				
		Vector3D ret = new Vector3D(); 

		double s = Math.sin(angle);
		double c = Math.cos(angle);

		//normalizeVector(&rotX, &rotY, &rotZ);

		//transformation matrix
		double a1 = (rotVec.x * rotVec.x * (1 - c)) + c;
		double b1 = (rotVec.x * rotVec.y * (1 - c)) - (rotVec.z * s);
		double c1 = (rotVec.x * rotVec.z * (1 - c)) + (rotVec.y * s);

		double a2 = (rotVec.x * rotVec.y * (1 - c)) + (rotVec.z * s);
		double b2 = (rotVec.y * rotVec.y * (1 - c)) + c;
		double c2 = (rotVec.y * rotVec.z * (1 - c)) - (rotVec.x * s);

		double a3 = (rotVec.x * rotVec.z * (1 - c)) - (rotVec.y * s);
		double b3 = (rotVec.y * rotVec.z * (1 - c)) + (rotVec.x * s);
		double c3 = (rotVec.z * rotVec.z * (1 - c)) + c;

		ret.x = (a1 * vec.x) + (b1 * vec.y) + (c1 * vec.z);
		ret.y = (a2 * vec.x) + (b2 * vec.y) + (c2 * vec.z);
		ret.z = (a3 * vec.x) + (b3 * vec.y) + (c3 * vec.z);

		return ret;
	}	
		
	public ReturnAxes GetAxesPositions(Point6D pt) {
				
		//angle in radians
		/*
		double N_angle_rad = N_angle_grad * deg2rad;
		double S_angle_rad = S_angle_grad * deg2rad;
		double A_angle_rad = A_angle_grad * deg2rad;
		*/

		//Reference position when N_angle, S_angle, A_angle are zero
		
		Vector3D A = new Vector3D(); 
		Vector3D S = new Vector3D(); 
		Vector3D N = new Vector3D();
		
		A.set(1.0, 0.0, 0.0);
		S.set(0.0, 1.0, 0.0);
		N.set(0.0, 0.0, 1.0);
	/*	
		*Ax = 1.0; *Ay = 0.0; *Az = 0.0;
		*Sx = 0.0; *Sy = 1.0; *Sz = 0.0;
		*Nx = 0.0; *Ny = 0.0; *Nz = 1.0;
*/
		//N-Transform
		//transformXYZ (*Ax, *Ay, *Az, N_angle_rad, *Nx, *Ny, *Nz, Ax, Ay, Az);
		//transformXYZ (*Sx, *Sy, *Sz, N_angle_rad, *Nx, *Ny, *Nz, Sx, Sy, Sz);
		
		A = transformXYZ (A, pt.orbit.z, N);
		S = transformXYZ (S, pt.orbit.z, N);

		//S-Transform
		//transformXYZ (*Ax, *Ay, *Az, S_angle_rad, *Sx, *Sy, *Sz, Ax, Ay, Az);
		//transformXYZ (*Nx, *Ny, *Nz, S_angle_rad, *Sx, *Sy, *Sz, Nx, Ny, Nz);
		
		A = transformXYZ (A, pt.orbit.y, S);
		N = transformXYZ (N, pt.orbit.y, S);		

		//A-Transform
		//transformXYZ (*Sx, *Sy, *Sz, A_angle_rad, *Ax, *Ay, *Az, Sx, Sy, Sz);
		//transformXYZ (*Nx, *Ny, *Nz, A_angle_rad, *Ax, *Ay, *Az, Nx, Ny, Nz);	
		
		S = transformXYZ (S, pt.orbit.x, A);
		N = transformXYZ (N, pt.orbit.x, A);			
		
		return GetAxesPositions (pt.point.x, pt.point.y, pt.point.z, A.x, A.y, A.z, S.x, S.y, S.z);
				
	}
	
	
	public ReturnAxes GetAxesPositions(double Px, double Py, double Pz, 
			double Ax, double Ay, double Az,
			double Sx, double Sy, double Sz){
		
		ReturnAxes ret = new ReturnAxes();
		
		ret.retval = 1;
		
		//Auxiliary point
		double Pax = Px - (lim.h7 * Ax);
		double Pay = Py - (lim.h7 * Ay);
		double Paz = Pz - (lim.h7 * Az);		

		//Check low limit
		if (Paz < lim.Pazmin) {
			ret.retval = -31;
			return ret;		  
			/*
			 * This means that input point is too low.
			 */
		}

		//Normal vector
		double Nx, Ny, Nz;
		
		Vector3D vn = VectProduct (new Vector3D(Ax, Ay, Az), new Vector3D(Sx, Sy, Sz));
		
		Nx = vn.x;
		Ny = vn.y;
		Nz = vn.z;
		
		//getNormalVector(Ax, Ay, Az, Sx, Sy, Sz, &Nx, &Ny, &Nz);

		//Calculation of fi1
		double r = Math.sqrt((Pax * Pax) + (Pay * Pay));

		ret.fi1 = Math.atan2(Pay, Pax) - Math.asin(lim.h5 / r);

		//Check axis limits
		if (checkLimits (ret.fi1, lim.fi1_min, lim.fi1_max) != 1) {
			ret.retval = -21;
			return ret;	
		}

		//Calculation of fi2
		double pazt = Paz - lim.h1;
		double past = (Math.sqrt((r * r) - (lim.h5 * lim.h5))) - lim.h2;
		double rt = Math.sqrt((past * past) + (pazt * pazt));
		double fiz = Math.acos(pazt / rt);
		double h4_6 = Math.sqrt((lim.h4 * lim.h4) + (lim.h6 * lim.h6));
		double omega = Math.acos(((lim.h3 * lim.h3) + (rt * rt) - (h4_6 * h4_6)) / (2 * lim.h3 *rt));

		ret.fi2 = fiz - omega;

		//Check axis limits
		if (checkLimits (ret.fi2, lim.fi2_min, lim.fi2_max) != 1) {
			ret.retval = -22;
			return ret;	
		}

		//Calculation of fi3
		double tau = Math.atan2(lim.h4, lim.h6);

		double delta = Math.acos(((lim.h3 * lim.h3) + (h4_6 * h4_6) - (rt * rt)) / (2 * lim.h3 * h4_6));
		double delta_min = (Math.PI/2) + tau - lim.fi3_max;
		double delta_max = (Math.PI/2) + tau - lim.fi3_min;

		ret.fi3 = Math.PI - delta;

		if (checkLimits (delta, delta_min, delta_max) != 1) {
			ret.retval = -32;
			return ret;	
			/*
			 * This means that input point is not achievable.  Too far or too close to mechanics.
			 */
		}

		//Calculation of fi4
		double c1 = Math.cos(ret.fi1);
		double s1 = Math.sin(ret.fi1);
		double c2 = Math.cos(ret.fi2);
		double s2 = Math.sin(ret.fi2);
		double ctau3 = Math.cos(tau + ret.fi3);
		double stau3 = Math.sin(tau + ret.fi3);
		double ctau2 = (ctau3 * c2) - (stau3 *s2);
		double stau2 = (stau3 * c2) + (ctau3 * s2);

		double Awx = (Ax * c1 * ctau2) + (Ay * s1 * ctau2) - (Az * stau2);
		double Awy = (-Ax * s1) + (Ay * c1);
		double Awz = (Ax * c1 * stau2) + (Ay * s1 * stau2) + (Az * ctau2);

		if (!(Math.abs(Awy) < 1E-8 && Math.abs(Awx) < 1E-8)) {
			
			
		    ret.fi4 = Math.atan2(Awy, Awx);
		    //if (fpclassify(Awy) != FP_ZERO || fpclassify(Awx) != FP_ZERO) {
		    //*fi4 = atan2(Awy, Awx);

		    //Check axis limits
		    if (checkLimits (ret.fi4, lim.fi4_min, lim.fi4_max) != 1) {
				ret.retval = -24;
				return ret;	
		    }
		} else {						  
		    /* handle domain error */
		    ret.retval = 2;
			/*
			 * This indicates that axis 4 has not updated value...
			 */
		}

		//Calculation of fi5
		ret.fi5 = Math.atan2(Math.sqrt((Awx * Awx) + (Awy * Awy)), Awz);

		//Check axis limits
		if (checkLimits (ret.fi5, lim.fi5_min, lim.fi5_max) != 1) {			
		    ret.retval = -25;
		    return ret;	
		}

		//Calculation of fi6
		double Nwz = (Nx * c1 * stau2) + (Ny * s1 * stau2) + (Nz * ctau2);
		double Swz = (Sx * c1 * stau2) + (Sy * s1 * stau2) + (Sz * ctau2);

		if (!(Math.abs(Swz) < 1E-8 && Math.abs(Nwz) < 1E-8)) {			
		    ret.fi6 = Math.atan2(Swz, Nwz);
		  //if (fpclassify(Swz) != FP_ZERO || fpclassify(Nwz) != FP_ZERO) {
		    //*fi6 = atan2(Swz, Nwz);

		    //Check axis limits
		    if (checkLimits (ret.fi6, lim.fi6_min, lim.fi6_max) != 1) {
			    ret.retval = -26;
			    return ret;	
		    }
		} else
		{			
		    /* handle domain error */
		    if (ret.retval == 2) ret.retval = 4;
		    /*
			   * This indicates that axes 4 and 6 have not updated values.
			   */
			  else ret.retval = 3;
			  /*
			   * This indicates that axis 6 has not updated value.
			   */
		}

		//*fi3 = *fi3 - 1.331163;
		ret.fi3 = ret.fi3 - ((Math.PI / 2) - tau);

		//Check axis limits
		if (checkLimits (ret.fi3, lim.fi3_min, lim.fi3_max) != 1) {
		    ret.retval = -23;
		    return ret;	
		}		  		
		
		return ret;
	}

}
