/// <reference path="typings/tsd.d.ts" />  
/// <reference path='RobotMath.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point3D = RobotMath.Point3D;
var Vector3D = RobotMath.Vector3D;
var CoordSystem = RobotMath.CoordSystem;
var TransformCobalt = RobotMath.TransformCobalt;
var Face = RobotMath.Face;
var GraphLib = RobotMath.GraphLib;
var CobaltModel;
(function (CobaltModel) {
    var Cobalt = (function () {
        function Cobalt() {
            //constants...
            this.m_axisArray = new Array();
            this.m_trajArray = new Array();
            this.m_endGrab = new EndGrab();
            this.getCount = 0;
            this.updating_position = false;
            this.c = 0;
            // public sphere: THREE.Mesh = null;
            //public dataLoaded:  boolean = false;
            this.gLib = new GraphLib();
            this.getServerAxes();
            this.timerGetGeometry(500);
            this.getServerEndpoint();
            this.getServerTrajectories();
            this.timerGetPositions(150);
        }
        Cobalt.prototype.timerGetGeometry = function (step) {
            var _this = this;
            this.loadGeometry();
            window.clearTimeout(this.fastTimerGetData);
            this.fastTimerGetData = window.setTimeout(function () { return _this.timerGetGeometry(step); }, step);
        };
        Cobalt.prototype.loadGeometry = function () {
            if (this.getCount < this.m_axisArray.length) {
                var ax = this.m_axisArray[this.getCount];
                this.getServerAxesGeometry(this.getCount + 1);
                this.getCount++;
            }
        };
        Cobalt.prototype.timerGetPositions = function (step) {
            var _this = this;
            this.getPositions();
            window.clearTimeout(this.fastTimerGetPositions);
            this.fastTimerGetPositions = window.setTimeout(function () { return _this.timerGetPositions(step); }, step);
        };
        Cobalt.prototype.getPositions = function () {
            var req = {
                orderId: "Cobalt_AxesPositions"
            };
            var data = getAjax("robot", req);
            if (data != null) {
                var numAxes = parseInt(data['num_axes']);
                var i = 0;
                for (var _i = 0, _a = this.m_axisArray; _i < _a.length; _i++) {
                    var ax = _a[_i];
                    if (i < numAxes) {
                        ax.fi = parseFloat(data[i + 'fi']);
                    }
                    i++;
                }
                ////UPDATE....
                this.updatePosition();
            }
        };
        Cobalt.prototype.getServerAxes = function () {
            var req = {
                orderId: "Cobalt_Axes"
            };
            var data = getAjax("robot", req);
            if (data != null) {
                var numAxes = parseInt(data['num_axes']);
                //window.alert("axes" + numAxes);                
                this.m_axisArray.length = 0;
                for (var i = 0; i < numAxes; i++) {
                    var ax = new Axis();
                    ax.parseData(data, i);
                    this.m_axisArray.push(ax);
                }
            }
        };
        Cobalt.prototype.getServerEndpoint = function () {
            var req = {
                orderId: "Cobalt_Endpoint"
            };
            var data = getAjax("robot", req);
            if (data != null) {
                this.m_endGrab.parseData(data);
            }
        };
        Cobalt.prototype.getServerTrajectories = function () {
            var req = {
                orderId: "Cobalt_Trajectories"
            };
            var data = getAjax("robot", req);
            if (data != null) {
                var numTrajs = parseInt(data['num_trajs']);
                this.m_trajArray.length = 0;
                for (var i = 0; i < numTrajs; i++) {
                    var traj = new Trajectory();
                    traj.parseData(data, i);
                    this.m_trajArray.push(traj);
                }
            }
        };
        Cobalt.prototype.getServerAxesGeometry = function (ax) {
            var req = {
                orderId: "Cobalt_AxesGeometry" + ax
            };
            var data = getAjax("robot", req);
            if (data != null) {
                var axis = this.m_axisArray[ax];
                axis.parseGeomData(data);
            }
        };
        Cobalt.prototype.allAxesLoaded = function () {
            var loaded = 1;
            var i = 0;
            for (var _i = 0, _a = this.m_axisArray; _i < _a.length; _i++) {
                var ax = _a[_i];
                if (i != 0 && !ax.dataDone) {
                    loaded = 0;
                }
                i++;
            }
            return loaded;
        };
        Cobalt.prototype.rotateAllAxes = function (back) {
            if (this.allAxesLoaded() == 1) {
                //Rotate by axis
                for (var i = 1; i < this.m_axisArray.length; i++) {
                    var axr = this.m_axisArray[i];
                    var rad;
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
                    for (var j = i + 1; j < this.m_axisArray.length; j++) {
                        var ax = this.m_axisArray[j];
                        //rotate axis
                        ax.rotateAll(rad, rotPt1, rotVect);
                    }
                    this.m_endGrab.rotate(rad, rotPt1, rotVect);
                }
            }
        };
        Cobalt.prototype.updatePosition = function () {
            this.updating_position = true;
            this.rotateAllAxes(false);
            this.m_endGrab.drawEndpointText();
            this.updating_position = false;
        };
        return Cobalt;
    }());
    CobaltModel.Cobalt = Cobalt;
    var EndGrab = (function () {
        function EndGrab() {
            this.dataLoaded = false; //Loaded from server
            this.dataDisplayed = false; //Added to scene
            this.point = null;
            this.i = null;
            this.j = null;
            this.k = null;
            this.iLine = null;
            this.jLine = null;
            this.kLine = null;
            this.sphere = null;
            this.gLib = new GraphLib();
        }
        EndGrab.prototype.parseData = function (data) {
            var transform = new TransformCobalt();
            var pt = new Point3D();
            pt.x = parseFloat(data['ep_px']);
            pt.y = parseFloat(data['ep_py']);
            pt.z = parseFloat(data['ep_pz']);
            pt = transform.transformPt(pt);
            this.point = new THREE.Vector3(pt.x, pt.y, pt.z);
            pt.x = parseFloat(data['ep_i_x']);
            pt.y = parseFloat(data['ep_i_y']);
            pt.z = parseFloat(data['ep_i_z']);
            pt = transform.transformPt(pt);
            this.i = new THREE.Vector3(pt.x, pt.y, pt.z);
            pt.x = parseFloat(data['ep_j_x']);
            pt.y = parseFloat(data['ep_j_y']);
            pt.z = parseFloat(data['ep_j_z']);
            pt = transform.transformPt(pt);
            this.j = new THREE.Vector3(pt.x, pt.y, pt.z);
            pt.x = parseFloat(data['ep_k_x']);
            pt.y = parseFloat(data['ep_k_y']);
            pt.z = parseFloat(data['ep_k_z']);
            pt = transform.transformPt(pt);
            this.k = new THREE.Vector3(pt.x, pt.y, pt.z);
            this.dataLoaded = true;
        };
        EndGrab.prototype.addScene = function (scene, camera, renderer) {
            if (this.dataLoaded && !this.dataDisplayed) {
                var size = 100.0;
                //Line i
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push(new THREE.Vector3(this.point.x, this.point.y, this.point.z), new THREE.Vector3(this.point.x + (size * this.i.x), this.point.y + (size * this.i.y), this.point.z + (size * this.i.z)));
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
                this.iLine = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(this.iLine);
                //Line j
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push(new THREE.Vector3(this.point.x, this.point.y, this.point.z), new THREE.Vector3(this.point.x + (size * this.j.x), this.point.y + (size * this.j.y), this.point.z + (size * this.j.z)));
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial({ color: 0x33cc33 });
                this.jLine = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(this.jLine);
                //Line k
                var lineGeometry = new THREE.Geometry();
                var vertArray = lineGeometry.vertices;
                vertArray.push(new THREE.Vector3(this.point.x, this.point.y, this.point.z), new THREE.Vector3(this.point.x + (size * this.k.x), this.point.y + (size * this.k.y), this.point.z + (size * this.k.z)));
                lineGeometry.computeLineDistances();
                var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
                this.kLine = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(this.kLine);
                var gSphere = new THREE.SphereGeometry(20, 60, 80, 32);
                var material = new THREE.MeshBasicMaterial({ color: 0xcc66ff });
                this.sphere = new THREE.Mesh(gSphere, material);
                this.sphere.position.set(this.point.x, this.point.y, this.point.z);
                scene.add(this.sphere);
                this.text2 = document.createElement('div');
                this.text2.style.position = 'absolute';
                //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                this.text2.style.width = '100';
                this.text2.style.height = '100';
                this.text2.style.backgroundColor = "transparent";
                //text2.style.t
                this.text2.innerHTML = "";
                this.text2.style.top = 300 + 'px';
                this.text2.style.left = 500 + 'px';
                this.text2.style.fontSize = '16px';
                this.text2.style.fontFamily = 'Lucida Sans Unicode, Lucida Grande, sans-serif';
                document.body.appendChild(this.text2);
                this.camera = camera;
                this.renderer = renderer;
                this.dataDisplayed = true;
            }
        };
        EndGrab.prototype.rotate = function (rad, point, axis) {
            this.gLib.rotateObject(this.iLine, point, axis, rad);
            this.gLib.rotateObject(this.jLine, point, axis, rad);
            this.gLib.rotateObject(this.kLine, point, axis, rad);
            this.gLib.rotateObject(this.sphere, point, axis, rad);
            this.gLib.rotatePoint(this.point, point, axis, rad);
        };
        EndGrab.prototype.getEndpoint2D = function () {
            return this.gLib.getPoint2D(this.point, this.camera, this.renderer.context.canvas.width, this.renderer.context.canvas.height);
        };
        EndGrab.prototype.drawEndpointText = function () {
            if (this.dataDisplayed) {
                //  var pt2D = this.getEndpoint2D();
                var pt2D = this.getEndpoint2D();
                this.text2.style.left = pt2D.x + 10 + 'px';
                this.text2.style.top = pt2D.y + 10 + 'px';
                this.text2.innerHTML = "X: " + this.point.x.toPrecision(7) + "<br>  Y: " + this.point.y.toPrecision(7) + "<br>  Z: " + this.point.z.toPrecision(7);
            }
        };
        return EndGrab;
    }());
    CobaltModel.EndGrab = EndGrab;
    var Axis = (function () {
        function Axis() {
            //Axis coord system
            this.cs = new CoordSystem();
            this.rot = new Vector3D();
            //Faces
            this.faces = new Array();
            this.length = 100;
            this.dataLoaded = false;
            this.dataDone = false;
            this.mesh = null;
            this.xLine = null;
            this.yLine = null;
            this.zLine = null;
            this.axPt1 = null;
            this.axPt2 = null;
            this.fi = 0.0; //Axis rotation...
            this.oldAngle1 = 0.0; //Remember axis rotation
            this.gLib = new GraphLib();
        }
        Axis.prototype.parseData = function (data, i) {
            var transform = new TransformCobalt();
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
            this.axPt1 = new THREE.Vector3(this.cs.point.x, this.cs.point.y, this.cs.point.z);
            this.axPt2 = new THREE.Vector3(this.cs.point.x + this.rot.x, this.cs.point.y + this.rot.y, this.cs.point.z + this.rot.z);
            var numFaces = parseInt(data[i + 'num_faces']);
        };
        Axis.prototype.parseGeomData = function (data) {
            var numFaces = parseInt(data['num_faces']);
            // window.alert('Faces: ' + numFaces);
            var transform = new TransformCobalt();
            for (var i = 0; i < numFaces; i++) {
                var fc = new Face();
                var v0 = new Point3D();
                var v1 = new Point3D();
                var v2 = new Point3D();
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
                var fc2 = transform.transformFace(fc);
                this.faces.push(fc2);
            }
            this.dataLoaded = true;
            this.dataDone = true;
        };
        Axis.prototype.rotateAll = function (rad, point, axis) {
            this.gLib.rotateObject(this.mesh, point, axis, rad);
            this.gLib.rotateObject(this.xLine, point, axis, rad);
            this.gLib.rotateObject(this.yLine, point, axis, rad);
            this.gLib.rotateObject(this.zLine, point, axis, rad);
            this.gLib.rotatePoint(this.axPt1, point, axis, rad);
            this.gLib.rotatePoint(this.axPt2, point, axis, rad);
        };
        return Axis;
    }());
    CobaltModel.Axis = Axis;
    var Trajectory = (function () {
        //        public mesh: THREE.Mesh = null;
        function Trajectory() {
            this.m_segments = new Array();
            this.origin = new Point3D();
            this.dataUpdated = false;
            this.origin.x = 0.0;
            this.origin.y = 0.0;
            this.origin.z = 0.0;
        }
        Trajectory.prototype.parseData = function (data, i) {
            var transform = new TransformCobalt();
            var id = i + "_";
            var numSegments = parseInt(data[id + 'num_segments']);
            this.origin.x = parseFloat(data[id + 'origin_x']);
            this.origin.y = parseFloat(data[id + 'origin_y']);
            this.origin.z = parseFloat(data[id + 'origin_z']);
            this.origin = transform.transformPt(this.origin);
            // window.alert('numtraj ' + numSegments);
            for (var j = 0; j < numSegments; j++) {
                var ids = id + "" + j + "_";
                var gtype = data[ids + 'seg_type'];
                //  window.alert('segtype: ' + gtype);
                if (gtype != null && gtype === 'line') {
                    var line = new Line3D();
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
        };
        return Trajectory;
    }());
    CobaltModel.Trajectory = Trajectory;
    var Geometry3D = (function () {
        function Geometry3D() {
        }
        return Geometry3D;
    }());
    CobaltModel.Geometry3D = Geometry3D;
    var Line3D = (function (_super) {
        __extends(Line3D, _super);
        function Line3D() {
            _super.apply(this, arguments);
            this.pt1 = new Point3D();
            this.pt2 = new Point3D();
            this.line = null;
        }
        return Line3D;
    }(Geometry3D));
    CobaltModel.Line3D = Line3D;
    function getAjax(urlAdr, dataIn) {
        var result = null;
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        $.ajax({ async: false, url: urlAdr, data: dataIn, dataType: "json", success: function (data) {
                result = data;
            } });
        return result;
    }
})(CobaltModel || (CobaltModel = {}));
