
module RobotMath {
    
    
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