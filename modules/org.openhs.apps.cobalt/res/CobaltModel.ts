
/// <reference path="typings/tsd.d.ts" />  
/// <reference path='RobotMath.ts'/>

import Point3D = RobotMath.Point3D;
import Vector3D = RobotMath.Vector3D;
import CoordSystem = RobotMath.CoordSystem;
import TransformCobalt = RobotMath.TransformCobalt;
import Face = RobotMath.Face;

module CobaltModel {  

    export class Cobalt {
        
        //constants...
        public m_axisArray:            Array <Axis> = new Array <Axis>();
        
        protected getCount:  number = 0;
        
        private fastTimerGetData;
        
        public dataLoaded:  boolean = false;
      
        
        constructor () {
            this.getServerAxes();
            
            this.timerGetGeometry(500);
            
        }
        
        private timerGetGeometry(step : number) {
            
           this.loadGeometry();
                                               
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.timerGetGeometry(step), step); 
        }              
        
        public loadGeometry () {
            
            if (this.getCount < this.m_axisArray.length) {                
                var ax = this.m_axisArray[this.getCount];
                
                this.getServerAxesGeometry(this.getCount + 1);
                
                this.getCount++;
            }                              
        }
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "Cobalt_Axes"
               // path:   "test"                
            } 
            
           var data: string = getAjax("robot", req); 
            
            //this.parseServerData(data);                                            
        }        
        
        public getServerAxes () {
            var req: any = {                
            orderId : "Cobalt_Axes"            
            } 
            
           var data: string = getAjax("robot", req); 
            
            if (data != null) {                
                var numAxes = parseInt(data['num_axes']);
                
                this.m_axisArray.length = 0;
                
                for (var i = 0; i < numAxes; i++) {
                    
                    let ax: Axis = new Axis ();
                    
                    ax.parseData(data, i);
                    
                    this.m_axisArray.push(ax);                        
                }            
            }            
        }
        
        public getServerAxesGeometry (ax: number) {
            var req: any = {                
            orderId : "Cobalt_AxesGeometry" + ax          
            } 
            
           var data: string = getAjax("robot", req); 
            
            if (data != null) {                                                        
                    
               let axis = this.m_axisArray[ax];
                
               axis.parseGeomData(data);                        
                
                if (ax == 6) {
                    
                    this.dataLoaded = true;
                }
        
            }            
        }        
                        
    }
    
    export class Axis {
        
        //Axis coord system
        public cs: CoordSystem = new CoordSystem();
        
        //Faces
        public faces:            Array <Face> = new Array <Face>();
        
        public length: number = 100;
                       
        public parseData (data: any, i: any) {
            
            var transform : TransformCobalt = new TransformCobalt ();
            
            this.length = parseFloat(data[i + 'lenght']);
            
            this.cs.point.x = parseFloat(data[i + 'cs_px']);
            this.cs.point.y = parseFloat(data[i + 'cs_py']);
            this.cs.point.z = parseFloat(data[i + 'cs_pz']);
                        
            this.cs.i.x = parseFloat(data[i + 'cs_i_x']);
            this.cs.i.y = parseFloat(data[i + 'cs_i_y']);
            this.cs.i.z = parseFloat(data[i + 'cs_i_z']);     
            
            this.cs.j.x = parseFloat(data[i + 'cs_j_x']);
            this.cs.j.y = parseFloat(data[i + 'cs_j_y']);
            this.cs.j.z = parseFloat(data[i + 'cs_j_z']);    
            
            this.cs.k.x = parseFloat(data[i + 'cs_k_x']);
            this.cs.k.y = parseFloat(data[i + 'cs_k_y']);
            this.cs.k.z = parseFloat(data[i + 'cs_k_z']);     
            
            this.cs = transform.transformCs(this.cs);
            
            var numFaces = parseInt(data[i + 'num_faces']);            

        }
             
        
        public parseGeomData (data: any) {

            var numFaces = parseInt(data['num_faces']);  
            
           // window.alert('Faces: ' + numFaces);
            var transform : TransformCobalt = new TransformCobalt ();
            
             for (var i = 0; i < numFaces; i++) {
                 
                 var fc: Face = new Face ();
                            
                 fc.normal.x = parseFloat(data[i + 'fc_n_x']);
                 fc.normal.y = parseFloat(data[i + 'fc_n_y']);
                 fc.normal.z = parseFloat(data[i + 'fc_n_z']);
                 
                // window.alert('Normal: ' + fc.normal.x + ' : ' + fc.normal.y + ' : ' + fc.normal.z);;
                 
                 var v0: Point3D = new Point3D();
                 var v1: Point3D = new Point3D();
                 var v2: Point3D = new Point3D();      
                 
                 v0.x = parseFloat(data[i + "_v:0" + "fc_v_x"]);
                 v0.y = parseFloat(data[i + "_v:0" + "fc_v_y"]);
                 v0.z = parseFloat(data[i + "_v:0" + "fc_v_z"]);                    
      
                 v1.x = parseFloat(data[i + "_v:1" + "fc_v_x"]);
                 v1.y = parseFloat(data[i + "_v:1" + "fc_v_y"]);
                 v1.z = parseFloat(data[i + "_v:1" + "fc_v_z"]);               
                 
                 v2.x = parseFloat(data[i + "_v:2" + "fc_v_x"]);
                 v2.y = parseFloat(data[i + "_v:2" + "fc_v_y"]);
                 v2.z = parseFloat(data[i + "_v:2" + "fc_v_z"]);   
                 
                 fc.vertex.push(v0);
                 fc.vertex.push(v1);
                 fc.vertex.push(v2);
                 
                 var fc2: Face = transform.transformFace(fc);
                 
                 this.faces.push(fc2);
                 
            }
            
            //this.dataLoaded = true;
        }        
        
    }
    
    
    function getAjax(urlAdr: string, dataIn: string) {
       
        var result = null;
    
        $.ajaxSetup ({
            // Disable caching of AJAX responses
            cache: false
        });
            
        $.ajax({async: false, url: urlAdr, data: dataIn, dataType: "json", success: function(data) {
        
            result = data;
                                      
        }});
    
        return result;    
    }    
}