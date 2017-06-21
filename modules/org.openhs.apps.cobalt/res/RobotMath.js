var RobotMath;
(function (RobotMath) {
    class GraphLib {
        rotateObject(obj, point, axis, angle) {
            if (obj != null) {
                var q1 = new THREE.Quaternion();
                q1.setFromAxisAngle(axis, angle);
                obj.quaternion.multiplyQuaternions(q1, obj.quaternion);
                obj.position.sub(point);
                obj.position.applyQuaternion(q1);
                obj.position.add(point);
            }
        }
        rotatePoint(pt, point, axis, angle) {
            pt.sub(point); // remove the offset
            pt.applyAxisAngle(axis, angle); // rotate the POSITION
            pt.add(point); // re-add the offset      
        }
        getPoint2D(p, camera, width, height) {
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
            vector.set(1, 2, 3);
            // map to normalized device coordinate (NDC) space
            pIn.project(camera);
            // map to 2D screen space
            vector.x = Math.round((pIn.x + 1) * width / 2);
            vector.y = Math.round((-pIn.y + 1) * height / 2);
            vector.z = 0;
            return vector;
        }
    }
    RobotMath.GraphLib = GraphLib;
    class Point3D {
        constructor() {
            this.x = 0;
            this.z = 0;
            this.y = 0;
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
        }
    }
    RobotMath.Point3D = Point3D;
    class Vector3D extends Point3D {
        constructor() {
            super();
        }
    }
    RobotMath.Vector3D = Vector3D;
    class Face {
        constructor() {
            this.normal = new Vector3D();
            this.vertex = new Array();
        }
    }
    RobotMath.Face = Face;
    class CoordSystem {
        constructor() {
            this.i = new Vector3D();
            this.j = new Vector3D();
            this.k = new Vector3D();
            this.point = new Point3D();
        }
    }
    RobotMath.CoordSystem = CoordSystem;
    class TransformCobalt {
        transform(vec) {
            var vec2 = new Vector3D();
            vec2.x = vec.x;
            vec2.y = vec.z;
            vec2.z = -1 * vec.y;
            return vec2;
        }
        transformPt(vec) {
            var vec2 = new Point3D();
            vec2.x = vec.x;
            vec2.y = vec.z;
            vec2.z = -1 * vec.y;
            return vec2;
        }
        transformCs(cs) {
            var cs2 = new CoordSystem();
            cs2.point = this.transform(cs.point);
            cs2.i = this.transform(cs.i);
            cs2.j = this.transform(cs.j);
            cs2.k = this.transform(cs.k);
            return cs2;
        }
        transformFace(fc) {
            var fc2 = new Face();
            fc2.normal = this.transform(fc.normal);
            /*
            for (let vt of fc.vertex) {
                var p: Point3D = this.transformPt(vt);
                
                fc2.vertex.push(p);
            }
            */
            for (var i = 0; i < fc.vertex.length; i++) {
                let p = this.transformPt(fc.vertex[i]);
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
    RobotMath.TransformCobalt = TransformCobalt;
})(RobotMath || (RobotMath = {}));
