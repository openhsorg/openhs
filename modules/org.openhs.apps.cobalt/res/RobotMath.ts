
module RobotMath {
    
    
    export class GraphLib {
        
        public rotateObject (obj: THREE.Object3D, point: THREE.Vector3, axis: THREE.Vector3, angle: number) {
            
            if (obj != null) {
            
                var q1 = new THREE.Quaternion();
                
                q1.setFromAxisAngle( axis, angle );
    
                obj.quaternion.multiplyQuaternions( q1, obj.quaternion );
    
                obj.position.sub( point );
                obj.position.applyQuaternion( q1 );
                obj.position.add( point );
                
            }
        }     
        
        public rotatePoint (pt: THREE.Vector3, point: THREE.Vector3, axis: THREE.Vector3, angle: number) {

            pt.sub(point); // remove the offset
            pt.applyAxisAngle(axis, angle); // rotate the POSITION
            pt.add(point); // re-add the offset      
    
        }   
        
        public getPoint2D (p: THREE.Vector3, camera: THREE.PerspectiveCamera, width: number, height: number) {
            /*
        //    var p = new THREE.Vector3(x, y, z);
            var vector = new THREE.Vector3(p.project(camera).x, p.project(camera).y, p.project(camera).z);
            //var vector = p.project(camera);

            vector.x = (vector.x + 1) / 2 * width;
            vector.y = -(vector.y - 1) / 2 * height;

            return vector;
            */
            
            var pIn = new THREE.Vector3(p.x, p.y, p.z);
            var vector = new THREE.Vector3();
            
            vector.set( 1, 2, 3 );
            
            // map to normalized device coordinate (NDC) space
            pIn.project( camera );
            
            // map to 2D screen space
            vector.x = Math.round( (   pIn.x + 1 ) * width  / 2 );
            vector.y = Math.round( ( - pIn.y + 1 ) * height / 2 );
            vector.z = 0;    
            
            return vector;
        }
        
             
    }
    
    
    export class Point3D {        
        public x:  number = 0;
        public z:  number = 0;
        public y:  number = 0;
        
        constructor () {
                this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        }
        
    }
        
    export class Vector3D extends Point3D {
        
        constructor () {
            super();
        
        }        
    }  
    
    export class Face {
        public normal:       Vector3D = new Vector3D();
        public vertex:       Array <Point3D> = new Array <Point3D>();
    
    }
        
    export class CoordSystem {
        public i:       Vector3D = new Vector3D();
        public j:       Vector3D = new Vector3D();
        public k:       Vector3D = new Vector3D();
        public point:   Point3D = new Point3D();
                
    } 
    
    export class TransformCobalt {
        
        public transform (vec: Vector3D) {
        
            var vec2: Vector3D = new Vector3D ();
            
            vec2.x = vec.x;
            vec2.y = vec.z;
            vec2.z = -1 * vec.y;
                    
            return vec2;        
        }
        
        public transformPt (vec: Point3D) {
        
            var vec2: Point3D = new Point3D ();
            
            vec2.x = vec.x;
            vec2.y = vec.z;
            vec2.z = -1 * vec.y;
                    
            return vec2;        
        }        
                
        public transformCs (cs: CoordSystem) {
        
            var cs2: CoordSystem = new CoordSystem ();
            
            cs2.point = this.transform(cs.point);
            cs2.i = this.transform(cs.i);
            cs2.j = this.transform(cs.j);
            cs2.k = this.transform(cs.k);
                    
            return cs2;        
        }        
        
        public transformFace (fc: Face) {
        
            var fc2: Face = new Face ();
            
            fc2.normal = this.transform(fc.normal);
            
            /*
            for (let vt of fc.vertex) {
                var p: Point3D = this.transformPt(vt);    
                
                fc2.vertex.push(p);
            }
            */
            
            for (var i = 0; i < fc.vertex.length; i++) {
                let p: Point3D = this.transformPt(fc.vertex[i]);
                
                fc2.vertex.push(p);
            }
            
            /*
            cs2.point = this.transform(cs.point);
            cs2.i = this.transform(cs.i);
            cs2.j = this.transform(cs.j);
            cs2.k = this.transform(cs.k);
            */
                    
            return fc2;        
        }                
        
     }

}