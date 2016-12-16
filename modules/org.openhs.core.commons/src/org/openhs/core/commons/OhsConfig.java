package org.openhs.core.commons;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


public class OhsConfig {
			
	
	public int c = 22;
	
	String cc = "aaa";
	
	public ArrayList <String> adr = new ArrayList <String> ();

   public OhsConfig () {
	   
	   adr.add(new String ("lala"));
	   adr.add(new String ("lala2"));
	   adr.add(new String ("lala3"));
	   adr.add(new String ("lala4"));
	   
   }
	
}
