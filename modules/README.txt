OpenHS Software modules.

Pre-requisitions:
1. Eclipse Mars Java EE
2. JavaSE-1.8
3. Import Run Configuration from /eclipse_config/OpenHS_Test.launch
4. If you want to create Run Configuration manually insert these bundles:
  - Bundles
    -- Workspace
          --- org.openhs.core.meteostation
	  --- org.openhs.core.remote.access          
	  --- org.openhs.core.sensor.units
	  --- org.openhs.core.site.data
	  --- org.openhs.core.site.service
	  --- org.openhs.tester
    -- Target Platform
          --- javax.servlet
	  --- org.apache.felix.gogo.command
	  --- org.apache.felix.gogo.runtime
	  --- org.apache.felix.gogo.shell
	  --- org.eclipse.equinox.console
	  --- org.eclipse.equinox.ds
	  --- org.eclipse.equinox.http.jetty
	  --- org.eclipse.equinox.http.servlet
	  --- org.eclipse.equinox.util
	  --- org.eclipse.jetty.continuation
	  --- org.eclipse.jetty.http
	  --- org.eclipse.jetty.io
	  --- org.eclipse.jetty.security
	  --- org.eclipse.jetty.server
	  --- org.eclipse.jetty.servlet
	  --- org.eclipse.jetty.util
	  --- org.eclipse.osgi
	  --- org.eclipse.osgi.services
	  --- org.eclipse.osgi.util
  - Arguments
    -- Program arguments:
          -os ${target.os}
	  -ws ${target.ws} 
	  -arch ${target.arch}
	  -nl ${target.nl}
	  -consoleLog
	  -console
    -- VM arguments: 
          -Declipse.ignoreApp=true
          -Dosgi.noShutdown=true 
          -Dorg.osgi.service.http.port=7070
          -Dorg.eclipse.equinox.http.jetty.context.sessioninactiveinterval=0 -Xmx700m	  
5. Local Browser address: http://localhost:7070/openhs
