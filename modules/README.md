#OpenHS Software modules.
##Modules:
1. **org.openhs.core.site.data:**
2. **org.openhs.core.remote.access:**
3. **org.openhs.core.sensor.units:**
4. **org.openhs.core.site.data:**
5. **org.openhs.core.site.service:**
6. **org.openhs.tester:**

##Other modules:
* javax.servlet
* org.apache.felix.gogo.command
* org.apache.felix.gogo.runtime
* org.apache.felix.gogo.shell
* org.eclipse.equinox.console
* org.eclipse.equinox.ds
* org.eclipse.equinox.http.jetty
* org.eclipse.equinox.http.servlet
* org.eclipse.equinox.util
* org.eclipse.jetty.continuation
* org.eclipse.jetty.http
* org.eclipse.jetty.io
* org.eclipse.jetty.security
* org.eclipse.jetty.server
* org.eclipse.jetty.servlet
* org.eclipse.jetty.util
* org.eclipse.osgi
* org.eclipse.osgi.services
* org.eclipse.osgi.util

##Run arguments:
* **Program arguments:**
          -os ${target.os}
	  -ws ${target.ws} 
	  -arch ${target.arch}
	  -nl ${target.nl}
	  -consoleLog
	  -console
* **VM arguments:**
          -Declipse.ignoreApp=true
          -Dosgi.noShutdown=true 
          -Dorg.osgi.service.http.port=7070
          -Dorg.eclipse.equinox.http.jetty.context.sessioninactiveinterval=0 -Xmx700m

##Local Browser address: http://localhost:7070/openhs
