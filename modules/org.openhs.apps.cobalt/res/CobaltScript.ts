/// <reference path="typings/tsd.d.ts" />  
/// <reference path='CobaltModel.ts'/>

import Cobalt = CobaltModel.Cobalt;
import Axis = CobaltModel.Axis;
import Trajectory = CobaltModel.Trajectory;
import Line3D = CobaltModel.Line3D;

class ThreeJSTest {        
    
    cobalt: Cobalt;
    
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    
    constructor(){
        
            this.cobalt = new Cobalt ();
        
            this.scene = new THREE.Scene();
            this.scene.add( new THREE.GridHelper( 2500, 30 ) );
        
            //Camera
            var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
            var VIEW_ANGLE = 50, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
            this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
            this.camera.position.set(2000, 2500, 2000);        
            this.camera.lookAt(new THREE.Vector3(0,0,0));        
            this.scene.add(this.camera);        
        
            //Lights
            var light = new THREE.PointLight(0xffffff, 2, 100);
            light.position.set(1000,1300,1000);
            this.scene.add(light);
        
            var light2  = new THREE.DirectionalLight(0xffffff, 1.0);
            light2.position.set(500, 500, 500);
            this.scene.add(light2);
        
            var light3  = new THREE.AmbientLight(0x404040);
            this.scene.add(light3);           

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.setClearColor( 0xeeeeee );
            document.body.appendChild( this.renderer.domElement );          
                    
            for (var ax of this.cobalt.m_axisArray){
                this.drawCS2(ax);
            }
        /*
            var axLast = this.cobalt.m_axisArray[this.cobalt.m_axisArray.length - 1];
        
            //Last point sphere....
            var gSphere = new THREE.SphereGeometry(20, 60, 80, 32);
            var material = new THREE.MeshBasicMaterial( {color: 0x862145 } );
            this.cobalt.sphere = new THREE.Mesh( gSphere, material );
            this.cobalt.sphere.position.set(axLast.cs.point.x, axLast.cs.point.y, axLast.cs.point.z );
            this.scene.add( this.cobalt.sphere );       
        */
                   
            this.renderer.render(this.scene, this.camera);   
    }
    
    render() {
        // Each frame we want to render the scene again
        // Use typescript Arrow notation to retain the thisocity passing render to requestAnimationFrame
        // It's possible I invented the word thisocity.
        
        if (!this.cobalt.updating_position) {
            
            this.renderer.clear();
            
            this.drawAxesGeometry();
            
            this.cobalt.m_endGrab.addScene(this.scene);
            
            this.drawTrajectories();
        }
                
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }    

    start() {
        //this.renderer.clear();
        this.render();
    }

    public drawCS2 (ax: Axis) {
            //Line X
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(ax.cs.point.x, ax.cs.point.y, ax.cs.point.z), new THREE.Vector3(ax.cs.point.x + 100, ax.cs.point.y, ax.cs.point.z) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
            ax.xLine = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(ax.xLine);
        
            //Line Y
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(ax.cs.point.x, ax.cs.point.y, ax.cs.point.z), new THREE.Vector3(ax.cs.point.x, ax.cs.point.y + 100, ax.cs.point.z) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0x009933 } );
            ax.yLine = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(ax.yLine);    
        
            //Line Z
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(ax.cs.point.x, ax.cs.point.y, ax.cs.point.z), new THREE.Vector3(ax.cs.point.x, ax.cs.point.y, ax.cs.point.z + 100) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0066ff } );
            ax.zLine = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(ax.zLine);    
        
            //Rotation       
        /*   
            var rotGeom = new THREE.Geometry();
            var rotVertArray = lineGeometry.vertices;
            var rotP1 = new THREE.Vector3(ax.cs.point.x, ax.cs.point.y, ax.cs.point.z);
            var rotP2 = new THREE.Vector3(ax.cs.point.x + ax.rot.x, ax.cs.point.y + ax.rot.y, ax.cs.point.z + ax.rot.z)
            vertArray.push( rotP1, rotP2 );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc6600 } );
            ax.rLine = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(ax.rLine);          
                */
          //  ax.axVec = new THREE.Vector3 (ax.rot.x, ax.rot.y, ax.rot.z);
          //  ax.axVec.normalize();
        
        //var tg: THREE.Geometry = ax.zLine.getWorldRotation(
    }    
    
    public drawAxesGeometry () {
                                                      
            for(let ax of this.cobalt.m_axisArray) {   
                if (ax.dataLoaded) {                                                           
                    this.drawAxisGeometry(ax);
                    ax.dataLoaded = false;
                }                              
            }                
    }
   
    public drawAxisGeometry (ax: Axis) {
        
          //window.alert("-+");
        
        var triangleMaterial = new THREE.MeshBasicMaterial({ 
                 vertexColors:THREE.VertexColors, 
                 side:THREE.DoubleSide 
         });
        
        var solidMatA = new THREE.MeshLambertMaterial({
            color: 0x00cc99 
        })
        solidMatA.side = THREE.DoubleSide;        
        
        var triangleGeometry = new THREE.Geometry(); 
        
        var i = 0;
        
        for(let fc of ax.faces) {
            
          //  window.alert("-+");
            
            var ct = i * 3;
                        
            triangleGeometry.vertices.push(new THREE.Vector3( fc.vertex[0].x,  fc.vertex[0].y, fc.vertex[0].z)); 
            triangleGeometry.vertices.push(new THREE.Vector3( fc.vertex[1].x,  fc.vertex[1].y, fc.vertex[1].z)); 
            triangleGeometry.vertices.push(new THREE.Vector3( fc.vertex[2].x,  fc.vertex[2].y, fc.vertex[2].z));
            
           // window.alert("<:>" + fc.vertex[0].x);
            
            var f3 = new THREE.Face3(0 + ct, 1 + ct, 2 + ct);
          //  f3.vertexColors[0] = new THREE.Color(0xFF0000);
        //    f3.vertexColors[1] = new THREE.Color(0xFF0000); 
        //    f3.vertexColors[2] = new THREE.Color(0xFF0000);  
            
            triangleGeometry.faces.push(f3);   

            i++;
                                  
            
        }
        
            //        triangleGeometry.computeFaceNormals(); 
        
        triangleGeometry.computeFaceNormals();
      //  triangleGeometry.computeVertexNormals();
       
            var triangleMesh = new THREE.Mesh(triangleGeometry, solidMatA); 
          //  triangleMesh.position.set(0.0, 0.0, 0.0); 
            this.scene.add(triangleMesh);      
        
        ax.mesh = triangleMesh;
        
        //triangleMesh.rotateX( Math.PI / 2 );
        
        
    }
    
    public drawTrajectories () {
                                                      
            for(let tr of this.cobalt.m_trajArray) {   
                if (tr.dataUpdated) {                                                           
                    this.drawTrajectory(tr);
                    tr.dataUpdated = false;
                }                              
            }                
    }    
    
    public drawTrajectory (tr: Trajectory) {
        
        for(let seg of tr.m_segments) {
            
            if (seg instanceof Line3D) {
                
                var segment = <Line3D> seg;
                
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push( new THREE.Vector3(tr.origin.x + segment.pt1.x, tr.origin.y + segment.pt1.y, tr.origin.z + segment.pt1.z), new THREE.Vector3(tr.origin.x + segment.pt2.x, tr.origin.y + segment.pt2.y, tr.origin.z + segment.pt2.z) );
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
                segment.line = new THREE.Line( lineGeometry, lineMaterial );
                this.scene.add(segment.line);                                                
            }            
        }
        
        /*
                    //Line X
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(x, y, z), new THREE.Vector3(x + lenght, y, z) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);
        */
    
    }

}


window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};