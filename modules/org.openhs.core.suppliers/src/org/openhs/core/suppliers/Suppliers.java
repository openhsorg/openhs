package org.openhs.core.suppliers;

import java.io.File;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Supplier;
import org.openhs.core.commons.Thing;
import org.openhs.core.suppliers.api.ISuppliers;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Suppliers implements ISuppliers {
	
	private Logger logger = LoggerFactory.getLogger(Suppliers.class);	
	private Map<String, Object> m_properties = null;
	
	/*
	 * List of suppliers...
	 */
	public TreeMap<String, Supplier> suppliers = 
            new TreeMap<String, Supplier>();	
	
	
	public void activate (ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("Activating: org.openhs.core.suppliers");
		
		updated(properties);
		
		LoadData();
	}

	public void deractivate () {
		logger.info("De-Activating: org.openhs.core.suppliers");
	}	
	
	public void updated(Map<String, Object> properties) {
		m_properties = properties;
	//	String xmlFileName = (String) m_properties.get("openhsHome");
		//logger.info("\n\n" + xmlFileName);
	}	
	
	public void LoadData () {
		
		String xmlLoadEnable = (String) m_properties.get("xmlLoadEnable");
		
		if (xmlLoadEnable.contains("yes")){
			LoadXML();
		} else {
			
		}
		
	}
	
	public void LoadXML () {
		String xmlFileName = (String) m_properties.get("xmlFileName");
		String openhsHome = (String) m_properties.get("openhsHome");
		String xmlFileNamePath = openhsHome + xmlFileName;
		
		File xml = new File(xmlFileNamePath);
		
		if (xml.exists()) {			
			try {
				LoadXML_Parse(xmlFileNamePath);
			
			} catch (Exception ex) {

			}
			
		} else {
			CreateDemoList();
			
			try {
				SaveXML(xmlFileNamePath);
			} catch (Exception ex) {
				logger.info("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
				
			} finally {
				logger.info("Site XML not found ---> Created basic config and saved: " + xmlFileNamePath);
				
			}
		}				
	}
	
	public void LoadXML_Parse (String filePath) {		
		logger.info ("\n\nPARSER: " + filePath);
		
		suppliers.clear();
		
		try {
			File inputFile = new File(filePath);
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(inputFile);
			doc.getDocumentElement().normalize();

			NodeList listSuppliers = doc.getElementsByTagName("supplier");
			
			for (int i = 0; i < listSuppliers.getLength(); i++) {
				Node nodeSupplier = listSuppliers.item(i);
				//System.out.println("\n+>Current Element:" + nFloor.getNodeName());

				if (nodeSupplier.getNodeType() == Node.ELEMENT_NODE) {

					Element elementSupplier = (Element) nodeSupplier;
					
					Supplier  suppl = new Supplier ();																																	
					
					if (suppl != null) {
						
						String name = elementSupplier.getAttribute("name");
						String www = elementSupplier.getAttribute("www");
						String address = elementSupplier.getAttribute("address");
						String logo = elementSupplier.getAttribute("logo");
						
						suppl.address = address;
						suppl.www = www;
						suppl.logo = logo;
						
						suppliers.put(name, suppl);
						
						/*
						logger.info("\n\n-----------");
						logger.info(name);
						logger.info(www);
						*/
										

					}
					
				}
				
			}
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}			
	}
	
	public void SaveXML (String filePath) {
		
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.newDocument();

			// root element
			Element rootElement = doc.createElement("suppliers");
			doc.appendChild(rootElement);
			
			Set<String> paths = suppliers.keySet();
			
			for (String path : paths) {
				
				// Element supplier
				Element element = doc.createElement("supplier");
				rootElement.appendChild(element);
								
				// name
				Attr name = doc.createAttribute("name");
				name.setValue(path);
				element.setAttributeNode(name);
				
				Supplier sup = suppliers.get(path);
							
				// www
				Attr www = doc.createAttribute("www");
				www.setValue(sup.www);
				element.setAttributeNode(www);
				
				// address
				Attr address = doc.createAttribute("address");
				address.setValue(sup.address);
				element.setAttributeNode(address);		
				
				// logo
				Attr logo = doc.createAttribute("logo");
				logo.setValue(sup.logo);
				element.setAttributeNode(logo);					
				
			}
			
			// write the content into xml file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");			
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File(filePath));
			transformer.transform(source, result);			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void CreateDemoList() {
		
		Supplier suppl = new Supplier ();
		suppl.www = "www.openhs.org";
		suppl.address = "Street1, Brno";
		suppl.logo = "";
		
		suppliers.put("openhsorg",  suppl);
		
		suppl = new Supplier ();
		suppl.www = "www.htdvere.cz";
		suppl.address = "Street1, Brno";
		suppl.logo = "res/servlets/kitchen/logo_htdvere.png";
		
		suppliers.put("htdvere",  suppl);		
	}
	
	public Supplier getSupplier (String name) throws SiteException {		
		Supplier obj = suppliers.get(name);
		
		if (obj == null) {
			throw new SiteException("Supplier does not exist...: " + name);
		}		

		return obj;		
	}
}
