/// <reference path="typings/tsd.d.ts" />  

class ThreeJSTest {
    
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    
    constructor(){
        
        
            this.scene = new THREE.Scene();
            this.scene.add( new THREE.GridHelper( 1000, 100 ) );
        
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
            this.camera.position.set(500,500,500);
            this.camera.lookAt(new THREE.Vector3(0,0,0));
        
            this.scene.add(this.camera);

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.setClearColor( 0xeeeeee );
            document.body.appendChild( this.renderer.domElement );
                
            var geometry = new THREE.CylinderGeometry( 60, 60, 80, 32 );
            var material = new THREE.MeshBasicMaterial( { color: 0x862145 } );
            var cube = new THREE.Mesh( geometry, material );
            cube.position.set(0,40,0);
            this.scene.add( cube );

            this.camera.position.z = 5;   
            this.renderer.render(this.scene, this.camera);     


    }

    start() {
        //this.renderer.clear();
    }
}

window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};