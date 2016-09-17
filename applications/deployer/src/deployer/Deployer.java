package deployer;

import java.io.File;
import java.util.*;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class Deployer {
	
	public static void main(String[] args)
	{ 
		System.out.println("Hello to you!");
		System.out.println(49);
		
		if (args.length <= 0) {
			System.out.println("Error: Enter path to folder with Eclipse!!!");
			
			return;
		}
		
		String path = args[0];
		
		File f = new File(path);
		
		if (!(f.exists() && f.isDirectory())) 
		{
			System.out.println("Error: Not valid directory...");
			
			return;
		}	
		
		List<String> results = new ArrayList<String>();

		File[] files = new File(path).listFiles();
		//If this pathname does not denote a directory, then listFiles() returns null. 

		for (File file : files) {
		    if (file.isFile()) {
		        results.add(file.getName());
		    }
		}

		for (String item : results)		{
			System.out.println("File:" + item);	
		}
		
		//Create directory
		
		System.out.println("\nCreate directory...");
		
		String fileSep = System.getProperty( "file.separator"); 
		
	    File dir=new File(path + fileSep + "configuration");
	    
	    if(dir.exists()){
	       System.out.println("Folder exists, but that's OK...: " + path);
	       
	    }
	    else{
	    	dir.mkdir();
	    }
	    
	    //Write ini file
        try {
        	        	        	
        	File fini = new File(path + fileSep + "configuration" + fileSep + "config.ini");
        	
            FileOutputStream is = new FileOutputStream(fini);
            OutputStreamWriter osw = new OutputStreamWriter(is);    
            Writer w = new BufferedWriter(osw);
            
            //write...
            w.write("eclipse.ignoreApp=true\n");
            w.write("eclipse.exitOnError=false\n");
            w.write("osgi.noShutdown=true\n");
            w.write("org.osgi.service.http.port=7070\n");
            w.write("osgi.bundles.defaultStartLevel=4\n");
            w.write("osgi.bundles=");
            
            int i = 0;
                                    
            for (String fname : results){
            
            	i ++;
            	
            	w.write("./" + fname + "@start");
            	     
            	if (i < results.size()){
            		w.write(",\\");
            		w.write("\n");
            	}
            	
            }
            
            w.close();
        } catch (IOException e) {
            System.err.println("ERROR: Problem writing to the file :(");
        }	    
	   
		
	//	System.out.println("Path:" + path);
		
	}

}
