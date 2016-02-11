OpenHS Software modules.

Pre-requisitions:
1. Eclipse Mars
2. JavaSE-1.8
3. Run Configuration:
  - Bundles
    -- Workspace
	  --- org.openhs.core.site.data
	  --- org.openhs.core.site.service
	  --- org.openhs.tester
    -- Target Platform
	  --- org.apache.felix.gogo.command
	  --- org.apache.felix.gogo.runtime
	  --- org.apache.felix.gogo.shell
	  --- org.eclipse.equinox.console
	  --- org.eclipse.osgi
	  --- org.eclipse.osgi.compatibility.state
	  --- org.eclipse.osgi.services
	  --- org.eclipse.osgi.util
  - Arguments
    -- Program arguments: -os ${target.os} -ws ${target.ws} -arch ${target.arch} -nl ${target.nl} -consoleLog -console
    -- VM arguments: -Dosgi.requiredJavaVersion=1.7 -Declipse.ignoreApp=true -Dosgi.noShutdown=true	  
