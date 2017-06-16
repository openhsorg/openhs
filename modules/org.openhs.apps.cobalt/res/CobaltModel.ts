
/// <reference path="typings/tsd.d.ts" />  
/// <reference path='RobotMath.ts'/>

import Point3D = RobotMath.Point3D;
import Vector3D = RobotMath.Vector3D;
import CoordSystem = RobotMath.CoordSystem;
import TransformCobalt = RobotMath.TransformCobalt;
import Face = RobotMath.Face;
import GraphLib = RobotMath.GraphLib;

module CobaltModel {  

    export class Cobalt {
        
        //constants...
        public m_axisArray:            Array <Axis> = new Array <Axis>();
        public m_trajArray:            Array <Trajectory> = new Array <Trajectory>();
        public m_endGrab:              EndGrab = new EndGrab();
        
        protected getCount:  number = 0;
        
        private fastTimerGetData;
        private fastTimerGetPositions;
        
        public updating_position:  boolean = false; 
        
       // public sphere: THREE.Mesh = null;
        
        //public dataLoaded:  boolean = false;
        
        protected gLib: GraphLib = new GraphLib();
      
        
        constructor () {
            this.getServerAxes();
            
            this.timerGetGeometry(500);
            
            this.getServerEndpoint();
            
            this.getServerTrajectories();
            
            this.timerGetPositions(150);
            
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
                
                ////UPDATE....
                this.updatePosition();
            }            
        
        }   
        
        public getServerAxes () {
            var req: any = {                
            orderId : "Cobalt_Axes"            
            } 
            
           var data: string = getAjax("robot", req); 
            
            if (data != null) {                
                var numAxes = parseInt(data['num_axes']);
                
           //window.alert("axes" + numAxes);                
                                                
                this.m_axisArray.length = 0;
                
                for (var i = 0; i < numAxes; i++) {
                    
                    let ax: Axis = new Axis ();
                    
                    ax.parseData(data, i);
                    
                    this.m_axisArray.push(ax);                        
                }            
            }            
        }
        
        public getServerEndpoint () {
            
            var req: any = {                
            orderId : "Cobalt_Endpoint"            
            } 
            
           var data: string = getAjax("robot", req); 
            
            if (data != null) {                
                
                this.m_endGrab.parseData(data);
                 
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
        
        public rotateAllAxes (back: boolean) {

            if (this.allAxesLoaded() == 1) {
                
                //Rotate by axis
                for (var i = 1; i < this.m_axisArray.length; i++) {
                    
                    var axr : Axis = this.m_axisArray[i];
                    
                    var rad: number;
                    
                    rad = axr.fi - axr.oldAngle1;
                    axr.oldAngle1 = axr.fi;
                    
                    /*
                    if (back) {
                        rad = -1 * axr.oldAngle1;
                        axr.oldAngle1 = 0.0;
                        
                    } else {
                        rad = axr.fi;
                        axr.oldAngle1 = axr.fi;                                                
                    }   
                    */        
                                        
                    //Point od Axis
                    var rotPt1 = new THREE.Vector3(axr.axPt1.x, axr.axPt1.y, axr.axPt1.z);
                    var rotPt2 = new THREE.Vector3(axr.axPt2.x, axr.axPt2.y, axr.axPt2.z);
                    
                    //Vector of Axis
                   // var rotVect = new THREE.Vector3(axr.axVec2.x, axr.axVec2.y, axr.axVec2.z);
                     var rotVect = new THREE.Vector3(rotPt2.x - rotPt1.x, rotPt2.y - rotPt1.y, rotPt2.z - rotPt1.z);
                    rotVect.normalize();                    
                                        
                    //Rotate following axes
                    for (var j = i + 1 ; j < this.m_axisArray.length; j++  ) {
                        
                        var ax : Axis = this.m_axisArray[j];
                        
                        //rotate axis
                        ax.rotateAll(rad, rotPt1, rotVect);   
                                        
                    }
                    
                    this.m_endGrab.rotate(rad, rotPt1, rotVect);
         //           this.gLib.rotateObject(this.sphere, rotPt1, rotVect, rad);
                    
                    
                }  
                

            }                 
        
        }               
        
        public updatePosition () {
           
            this.updating_position = true;
            this.rotateAllAxes (false)     
            
            this.updating_position = false;                    
        }
                        
    }
    
    export class EndGrab {
        
        public dataLoaded: boolean = false; //Loaded from server
        public dataDisplayed: boolean = false; //Added to scene
        
        public point: THREE.Vector3 = null;
        public i: THREE.Vector3 = null;
        public j: THREE.Vector3 = null;
        public k: THREE.Vector3 = null;
        
        public iLine: THREE.Line = null;
        public jLine: THREE.Line = null;
        public kLine: THREE.Line = null;
        
        public sphere: THREE.Mesh = null;
        
        protected gLib: GraphLib = new GraphLib();
        
        public parseData (data: any) {
            
           // window.alert("----Parsinbg...-------------");
            
            var transform : TransformCobalt = new TransformCobalt ();
            
            var pt: Point3D = new Point3D ();
            
            pt.x = parseFloat(data['ep_px']);
            pt.y = parseFloat(data['ep_py']);
            pt.z = parseFloat(data['ep_pz']);
            
            pt = transform.transformPt(pt);
            
            this.point = new THREE.Vector3 (pt.x, pt.y, pt.z);
            
            pt.x = parseFloat(data['ep_i_x']);
            pt.y = parseFloat(data['ep_i_y']);
            pt.z = parseFloat(data['ep_i_z']);
            
            pt = transform.transformPt(pt);
            
            this.i = new THREE.Vector3 (pt.x, pt.y, pt.z);   
            
            pt.x = parseFloat(data['ep_j_x']);
            pt.y = parseFloat(data['ep_j_y']);
            pt.z = parseFloat(data['ep_j_z']);
            
            pt = transform.transformPt(pt);
            
            this.j = new THREE.Vector3 (pt.x, pt.y, pt.z);               
     
            pt.x = parseFloat(data['ep_k_x']);
            pt.y = parseFloat(data['ep_k_y']);
            pt.z = parseFloat(data['ep_k_z']);
            
            pt = transform.transformPt(pt);
            
            this.k = new THREE.Vector3 (pt.x, pt.y, pt.z);       
            
                        
            
            this.dataLoaded = true;
            
           // window.alert("----Parsed-------------" + this.point.x + this.point.y + this.point.z);
        }
        
        public addScene(scene: THREE.Scene) {

            if (this.dataLoaded && !this.dataDisplayed) {      
            
                var size: number = 100.0;
                
                //Line i
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push( new THREE.Vector3(this.point.x, this.point.y, this.point.z), new THREE.Vector3(this.point.x + (size * this.i.x), this.point.y + (size * this.i.y), this.point.z + (size * this.i.z)) );
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
                this.iLine = new THREE.Line( lineGeometry, lineMaterial );
                scene.add(this.iLine);       
                
                //Line j
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push( new THREE.Vector3(this.point.x, this.point.y, this.point.z), new THREE.Vector3(this.point.x + (size * this.j.x), this.point.y + (size * this.j.y), this.point.z + (size * this.j.z)) );
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial( { color: 0x33cc33 } );
                this.jLine = new THREE.Line( lineGeometry, lineMaterial );
                scene.add(this.jLine);   
                
                //Line k
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push( new THREE.Vector3(this.point.x, this.point.y, this.point.z), new THREE.Vector3(this.point.x + (size * this.k.x), this.point.y + (size * this.k.y), this.point.z + (size * this.k.z)) );
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
                this.kLine = new THREE.Line( lineGeometry, lineMaterial );
                scene.add(this.kLine);     
                
                var gSphere = new THREE.SphereGeometry(20, 60, 80, 32);
                var material = new THREE.MeshBasicMaterial( {color: 0xcc66ff } );
                this.sphere = new THREE.Mesh( gSphere, material );
                this.sphere.position.set(this.point.x, this.point.y, this.point.z );
                scene.add( this.sphere );                     
                                            
                this.dataDisplayed = true;
                
                //window.alert("----ADDed to display-------------");
            }        
        }
        
        public rotate(rad : number, point: THREE.Vector3, axis: THREE.Vector3) {
            
            
            this.gLib.rotateObject (this.iLine, point, axis, rad);
            this.gLib.rotateObject (this.jLine, point, axis, rad);  
            this.gLib.rotateObject (this.kLine, point, axis, rad);
            this.gLib.rotateObject (this.sphere, point, axis, rad);         
        }        
   }
    
    export class Axis {
        
        //Axis coord system
        public cs: CoordSystem = new CoordSystem();
        public rot: Vector3D = new Vector3D ();
                
        //Faces
        public faces:            Array <Face> = new Array <Face>();
        
        public length: number = 100;
        
        public dataLoaded:  boolean = false;
        public dataDone:  boolean = false;
        
        public mesh: THREE.Mesh = null;
      //  public sphere: THREE.Mesh = null;
        
        public xLine: THREE.Line = null;
        public yLine: THREE.Line = null;
        public zLine: THREE.Line = null;
       // public rLine: THREE.Line = null;
        public axPt1: THREE.Vector3 = null;
        public axPt2: THREE.Vector3 = null;       
        
        public fi: number = 0.0;            //Axis rotation...
        public oldAngle1: number = 0.0;     //Remember axis rotation
        
        protected gLib: GraphLib = new GraphLib();
                       
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
            
            this.rot.x = parseFloat(data[i + 'rot_x']);
            this.rot.y = parseFloat(data[i + 'rot_y']);
            this.rot.z = parseFloat(data[i + 'rot_z']);                                
            
            this.cs = transform.transformCs(this.cs);
            this.rot = transform.transform(this.rot);
            
  //          this.axVec2 = new THREE.Vector3 (this.rot.x, this.rot.y, this.rot.z);
    //        this.axVec2.normalize();
            
            this.axPt1 = new THREE.Vector3 (this.cs.point.x, this.cs.point.y, this.cs.point.z);
            this.axPt2 = new THREE.Vector3 (this.cs.point.x + this.rot.x, this.cs.point.y + this.rot.y, this.cs.point.z + this.rot.z);
            
         //   window.alert("je: " + i + "vec: "+ this.rot.x + " : " + this.rot.y + " : " + this.rot.z);
            
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
        
        public rotateAll(rad : number, point: THREE.Vector3, axis: THREE.Vector3) {
            
            this.gLib.rotateObject (this.mesh, point, axis, rad);         
            this.gLib.rotateObject (this.xLine, point, axis, rad);
            this.gLib.rotateObject (this.yLine, point, axis, rad);
            this.gLib.rotateObject (this.zLine, point, axis, rad);                
            this.gLib.rotatePoint(this.axPt1, point, axis, rad);
            this.gLib.rotatePoint(this.axPt2, point, axis, rad);                    
        
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