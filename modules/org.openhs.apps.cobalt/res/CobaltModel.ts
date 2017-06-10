
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
        public m_trajArray:            Array <Trajectory> = new Array <Trajectory>();
        
        protected getCount:  number = 0;
        
        private fastTimerGetData;
        private fastTimerGetPositions;
        
        //public dataLoaded:  boolean = false;
      
        
        constructor () {
            this.getServerAxes();
            
            this.timerGetGeometry(500);
            
            this.getServerTrajectories();
            
            this.timerGetPositions(1000);
            
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
        
        private timerGetPositions(step : number) {
            
           this.getPositions();
                                               
           window.clearTimeout(this.fastTimerGetPositions);
           this.fastTimerGetPositions = window.setTimeout(() => this.timerGetPositions(step), step); 
        }           
        
        public getPositions(){
        
            var req: any = {                
            orderId : "Cobalt_AxesPositions"            
            } 
            
           var data: string = getAjax("robot", req); 
            
            if (data != null) {                
                var numAxes = parseInt(data['num_axes']);
                                                
                var i = 0;
            
                for(var ax of this.m_axisArray) {      
                           
                  if (i < numAxes) {
                   
                      ax.fi = parseFloat(data[i + 'fi']);
                      
                  //    window.alert("fi" + i + ": " + ax.fi );
                      
                  }                    
                    i ++;
                }     
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
        
        public getServerTrajectories () {
            var req: any = {                
            orderId : "Cobalt_Trajectories"            
            } 
            
           var data: string = getAjax("robot", req); 
            
            if (data != null) {                
                var numTrajs = parseInt(data['num_trajs']);
                                                
                this.m_trajArray.length = 0;
                                                
                for (var i = 0; i < numTrajs; i++) {
                    
                    let traj: Trajectory = new Trajectory ();
                    
                    traj.parseData(data, i);
                    
                    this.m_trajArray.push(traj);                        
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
                /*
                if (ax == 6) {
                    
                    this.dataLoaded = true;
                }
        */
            }            
        }        
        
        public allAxesLoaded () {            
            var loaded = 1; 
                        
            var i = 0;
            
            for(var ax of this.m_axisArray) {      
                       
              if (i != 0 && !ax.dataDone) {
                  loaded = 0;
              }
                
                i ++;
            }

            return loaded;
        }
        
                        
    }
    
    export class Axis {
        
        //Axis coord system
        public cs: CoordSystem = new CoordSystem();
        
        //Faces
        public faces:            Array <Face> = new Array <Face>();
        
        public length: number = 100;
        
        public dataLoaded:  boolean = false;
        public dataDone:  boolean = false;
        
        public mesh: THREE.Mesh = null;
        
        public fi: number = 0.0;  //Axis rotation...
                       
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
                     
            this.dataLoaded = true;
            this.dataDone = true;
        }        
        
    }
    
    export class Trajectory {
        
        public m_segments:            Array <Geometry3D> = new Array <Geometry3D>();
        
        public origin:  Point3D = new Point3D();
        
        public dataUpdated:  boolean = false;
        
//        public mesh: THREE.Mesh = null;
        
        constructor () {
        
            this.origin.x = 0.0;
            this.origin.y = 0.0;
            this.origin.z = 0.0;
            //this.m_segments.push(new Line3D());
            
            
        }
        
        public parseData (data: any, i: any) {
            
            var transform : TransformCobalt = new TransformCobalt ();
            
            var id: String = i + "_";
            
            var numSegments = parseInt(data[id + 'num_segments']);
            
            this.origin.x = parseFloat(data[id + 'origin_x']);
            this.origin.y = parseFloat(data[id + 'origin_y']);
            this.origin.z = parseFloat(data[id + 'origin_z']);
            
            this.origin = transform.transformPt(this.origin);
            
           // window.alert('numtraj ' + numSegments);
                      
            for (var j = 0; j < numSegments; j++) {
                
                var ids: String = id + "" + j + "_";
                
                let gtype = data[ids + 'seg_type']; 
                
              //  window.alert('segtype: ' + gtype);
                
                if (gtype != null && gtype === 'line') {
                    
                    var line: Line3D = new Line3D();
                    
                    line.pt1.x = parseFloat(data[ids + 'p1_x']);
                    line.pt1.y = parseFloat(data[ids + 'p1_y']);
                    line.pt1.z = parseFloat(data[ids + 'p1_z']);
                    
                    line.pt2.x = parseFloat(data[ids + 'p2_x']);
                    line.pt2.y = parseFloat(data[ids + 'p2_y']);
                    line.pt2.z = parseFloat(data[ids + 'p2_z']);      
                    
                    line.pt1 = transform.transformPt(line.pt1);
                    line.pt2 = transform.transformPt(line.pt2);
                    
                    this.m_segments.push(line);
                    
                } 
                   
            }   
                       
            this.dataUpdated = true;

        }        
        
        
    }
    
    export class Geometry3D {
  
    
    }
    
    export class Line3D extends Geometry3D {
        public pt1:            Point3D = new Point3D();
        public pt2:            Point3D = new Point3D();
        
        public line: THREE.Line = null;
    
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