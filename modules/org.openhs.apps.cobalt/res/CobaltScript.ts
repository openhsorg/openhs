/// <reference path="typings/tsd.d.ts" />  

class ThreeJSTest {
    
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    
    constructor(){
        
        
            this.scene = new THREE.Scene();
            this.scene.add( new THREE.GridHelper( 2000, 30 ) );
        
            //Camera
            var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
            var VIEW_ANGLE = 50, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
            this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
            this.camera.position.set(1800, 1800, 1800);
        
            this.camera.lookAt(new THREE.Vector3(0,0,0));
            //this.camera.lookAt(this.scene.position);  
        
            this.scene.add(this.camera);

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
        
        
            this.drawEndCS(780, 1000, 0, 50);

            this.renderer.render(this.scene, this.camera);     


   
    }

    start() {
        //this.renderer.clear();
    }
    
    public drawEndCS (x: number, y: number, z: number, lenght: number) {
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

}


window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};