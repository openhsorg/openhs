## File Structure
### Site.properties
It is properties passed to activation of **org.openhs.core.site.services** component.

The property:
```
xmlFileName = site/<File>
```
specifies site mapping file to be loaded. The path has to be relative from ${HOME}/openhs

### ohs_site_dummy.xml
It uses just simulated devices implemented at **org.openhs.comm.dummy**.

 
### ohs_site_dummy_iqrf.xml
It uses devices implemented at **org.openhs.comm.dummy** and **org.openhs.comm.iqrf.json**

### ohs_site_dummy_iqrf_wmos.xml
It uses devices implemented at **org.openhs.comm.dummy**, **org.openhs.comm.iqrf.json** and **org.openhs.comm.wmos.json**

### ohs_site_dummy_wmos.xml
It uses devices implemented at **org.openhs.comm.dummy** and **org.openhs.comm.wmos.json**

### ohs_site_mqtt.xml
It uses just simulated devices implemented at **org.openhs.comm.iqrf.json**. It is obsolete and will be removed soon

## Launchers
If you want to launch one of the configurations above, edit **Site.properties **accordingly, e.g:

```
# This file stores basic properties, which serves for configuring of Site service
xmlLoadEnable = yes
#xmlFileName = site/ohs_site_dummy.xml
#xmlFileName = site/ohs_site_dumy_iqrf.xml
#xmlFileName = site/ohs_site_dumy_iqrf_wmos.xml
xmlFileName = site/ohs_site_dummy_wmos.xml
```
makes **org.openhs.core.site.services** to load device mapping declared at *ohs_site_dummy_wmos.xml*
To start correctly it is necessary to use appropriate launcher file in IDE:

*OpenHS_dummy_wmos.launch*

Similarly for other configurations 