package org.openhs.apps.cobalt.math;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.StringTokenizer;

import org.json.JSONObject;

public class Axis {
	
	public String id = "";
	
	public CartesianSystem 	cs = new CartesianSystem();
	
	double length = 0.0;
	
	public ArrayList<Face> m_faces = new ArrayList<Face>();
	
	public double fi;
	
	Axis () {
		fi = 0.0;
	}
	
	public void loadGeometry (String filePath) {
				
		  try{

	          //Create object of FileReader
	          FileReader inputFile = new FileReader(filePath);

	          //Instantiate the BufferedReader Class
	          BufferedReader bufferReader = new BufferedReader(inputFile);

	          //Variable to hold the one line data
	          String line;
	          
	          boolean facetIn = false;
		          
	          Face face = null;

	          // Read file line by line and print on the console
	          while ((line = bufferReader.readLine()) != null)   {
	            //System.out.println(line);
	        	  if (line.contains("facet")) {
	        		  facetIn = true;	 
	        		  face = new Face ();
	        		  m_faces.add(face);
	        	  } else if (line.contains("endfacet")) {
	        		  facetIn = false;
	        	  }
	        	  
	        	  //Facet enabled...
	        	  if (facetIn) {
	        		  if (line.contains("normal")) {	        			  
	        			  Point3D pt = this.readPoint(line);
	        			  face.normal.set(pt);	        			  
	        			  //System.out.println(">>PointN: " + pt.x + " : " + pt.y + " : " + pt.z);  
	        			  	        				        			    
	        		  } else if (line.contains("vertex")){
	        			  Point3D pt = this.readPoint(line);	        			  	        			  
	        			  face.vertex.add(pt);
	        			 // System.out.println(">>PointF: " + pt.x + " : " + pt.y + " : " + pt.z);
	        		  }	        		  
	        	  }	        	  
	          }
	          //Close the buffer reader
	          bufferReader.close();
	       }catch(Exception e){
	          System.out.println("Error while reading file line by line:" + e.getMessage());                      
	       }
	
		
	}
	
	protected Point3D readPoint (String line) {
		
		Point3D p = new Point3D();
				  
		StringTokenizer stringTokenizer = new StringTokenizer(line);

		int numberOfTokens = stringTokenizer.countTokens();
		  
		int iNum = 0;
						  
	    while (stringTokenizer.hasMoreElements()) {
	    	     
		    String s = stringTokenizer.nextElement().toString();
		    
		    if (isNumber(s)){
		    			    	
		    	double num = Double.parseDouble(s);
			  
		    	if (iNum == 0) p.x = num;
		    	else if (iNum == 1) p.y = num;
		    	else if (iNum == 2) p.z = num;
					  				
		    	//System.out.println(">>>>>i:" + iNum + "   ...num:" + num[iNum]);
		    	iNum++;	        					  
		    }
		}
		
		return p;
	}
	
	public static boolean isNumber(String string) {
	    try {
	        Double.parseDouble(string);
	    } catch (Exception e) {
	        return false;
	    }
	    return true;
	}	
	
	
}
