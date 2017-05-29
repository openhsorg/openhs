
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
                
        public transformCs (cs: CoordSystem) {
        
            var cs2: CoordSystem = new CoordSystem ();
            
            cs2.point = this.transform(cs.point);
            cs2.i = this.transform(cs.i);
            cs2.j = this.transform(cs.j);
            cs2.k = this.transform(cs.k);
                    
            return cs2;        
        }        
        
     }

}