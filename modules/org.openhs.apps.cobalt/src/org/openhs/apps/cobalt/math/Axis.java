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
	        			  
	        			  double[] num = new double[3];
	        			  
	        			  StringTokenizer stringTokenizer = new StringTokenizer(line);

	        			  int numberOfTokens = stringTokenizer.countTokens();
	        			  
	        			  int iNum = 0;
	        			  
	        			  while (stringTokenizer.hasMoreElements()) {
	        			      
	        				  String s = stringTokenizer.nextElement().toString();
	        				  if (this.isNumber(s)){
	        					  
	        					  num[iNum] = Double.parseDouble(s);
	        					  //System.out.println(">>>>>i:" + iNum + "   ...num:" + num[iNum]);
	        					  iNum++;	        					  
	        				  }

	        			  }
	        			  	        				        			    
	        		  } else if (line.contains("vertex")){
	        			  
	        		  }	        		  
	        	  }	        	  
	          }
	          //Close the buffer reader
	          bufferReader.close();
	       }catch(Exception e){
	          System.out.println("Error while reading file line by line:" + e.getMessage());                      
	       }
	
		
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
