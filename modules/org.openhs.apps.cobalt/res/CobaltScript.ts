/// <reference path="typings/tsd.d.ts" />  
/// <reference path='CobaltModel.ts'/>

import Cobalt = CobaltModel.Cobalt;
import Axis = CobaltModel.Axis;

class ThreeJSTest {        
    
    cobalt: Cobalt;
    
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    
    numAxes: number = 0;
    
    constructor(){
        
            this.cobalt = new Cobalt ();
        
            this.scene = new THREE.Scene();
            this.scene.add( new THREE.GridHelper( 2500, 30 ) );
        
            //Camera
            var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
            var VIEW_ANGLE = 50, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
            this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
            this.camera.position.set(2000, 2000, 2000);
        
            this.camera.lookAt(new THREE.Vector3(0,0,0));
            //this.camera.lookAt(this.scene.position);  
        
            this.scene.add(this.camera);
        
        
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
          
                
            //Cylinder
            var geometry = new THREE.CylinderGeometry( 60, 60, 80, 32 );
            var material = new THREE.MeshBasicMaterial( { color: 0x862145 } );
            var cube = new THREE.Mesh( geometry, material );
            cube.position.set(0,40,0);
            this.scene.add( cube );
        
            //Line X
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(0, 0, 0), new THREE.Vector3(500, 0, 0) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);
        
            //Line Y
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 500, 0) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0x009933 } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);    
        
            //Line Z
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 500) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0066ff } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);        
                
            var sphereGeometry = new THREE.SphereGeometry( 10, 32, 16 ); 
            // use a "lambert" material rather than "basic" for realistic lighting.
            //   (don't forget to add (at least one) light!)
            var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} ); 
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(780, 1000, 0);
            this.scene.add(sphere);                
        
            this.drawCS(780, 1000, 0, 50);
        
             //window.alert("xxxxxxxx:" + this.cobalt.m_axisArray.length);
        
            //Robot axes
            for (var i = 0; i < this.cobalt.m_axisArray.length; i++) {
                
                var ax = this.cobalt.m_axisArray[i];
                
                this.drawCS(ax.cs.point.x, ax.cs.point.y, ax.cs.point.z, 50);
                
            //    window.alert("xxxxxxxx:" + ax.cs.point.x);
            
            }
        /*
            var triangleGeometry = new THREE.Geometry(); 
            triangleGeometry.vertices.push(new THREE.Vector3( 60.0,  60.0, 0.0)); 
            triangleGeometry.vertices.push(new THREE.Vector3(60.0, 400.0, 0.0)); 
            triangleGeometry.vertices.push(new THREE.Vector3( 400.0, 400.0, 0.0)); 
            triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));         
        
            triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000); 
            triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0xFF0000); 
            triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0xFF0000); 
        
            var triangleMaterial = new THREE.MeshBasicMaterial({ 
                     vertexColors:THREE.VertexColors, 
                     side:THREE.DoubleSide 
             });         
        
            var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 
            triangleMesh.position.set(0.0, 0.0, 0.0); 
            this.scene.add(triangleMesh);        
        */
                    
            this.renderer.render(this.scene, this.camera);   

          //  requestAnimationFrame(()=>this.paint());  

   
    }
    
    render() {
        // Each frame we want to render the scene again
        // Use typescript Arrow notation to retain the thisocity passing render to requestAnimationFrame
        // It's possible I invented the word thisocity.
        
        this.renderer.clear();
        
        this.drawAxesGeometry();
        
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }    

    start() {
        //this.renderer.clear();
        this.render();
    }
    
    public paint () {
        this.renderer.clear();
        
    }

    public drawCS (x: number, y: number, z: number, lenght: number) {
            //Line X
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(x, y, z), new THREE.Vector3(x + lenght, y, z) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);
        
            //Line Y
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(x, y, z), new THREE.Vector3(x, y + lenght, z) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0x009933 } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);    
        
            //Line Z
            var lineGeometry = new THREE.Geometry();
            var vertArray = lineGeometry.vertices;
            vertArray.push( new THREE.Vector3(x, y, z), new THREE.Vector3(x, y, z + lenght) );
            lineGeometry.computeLineDistances();
            var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0066ff } );
            var line = new THREE.Line( lineGeometry, lineMaterial );
            this.scene.add(line);    
    }
    
    public drawAxesGeometry () {
        

        if (this.cobalt.dataLoaded) {                          
            
            for(let ax of this.cobalt.m_axisArray) {               
                               
                
                this.drawAxisGeometry(ax);                
              
            }
            
              this.cobalt.dataLoaded = false;
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
        
        
        
    }

}


window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};