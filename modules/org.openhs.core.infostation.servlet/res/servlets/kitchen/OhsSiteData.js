/**
 * Module with data structure...
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OhsSiteData;
(function (OhsSiteData) {
    var SiteData = (function () {
        function SiteData() {
            this.floors = null;
            this.rooms = null;
            this.tempSensors = null;
            this.switches = null;
            this.doors = null;
            this.timeString = "---";
            this.dateString = "---";
            this.floors = new Array();
            this.rooms = new Array();
            this.tempSensors = new Array();
            this.switches = new Array();
            this.doors = new Array();
            this.slowTimerGetDataEvent(5000);
            this.fastTimerGetDataEvent(100);
        }
        SiteData.prototype.fastTimerGetDataEvent = function (step) {
            var _this = this;
            for (var id in this.rooms) {
                this.rooms[id].getServerData();
            }
            for (var id in this.switches) {
                this.switches[id].getServerData();
            }
            for (var id in this.tempSensors) {
                this.tempSensors[id].getServerData();
            }
            for (var id in this.doors) {
                this.doors[id].getServerData();
            }
            window.clearTimeout(this.fastTimerGetData);
            this.fastTimerGetData = window.setTimeout(function () { return _this.fastTimerGetDataEvent(step); }, step);
        };
        SiteData.prototype.slowTimerGetDataEvent = function (step) {
            var _this = this;
            this.getServerData();
            window.clearTimeout(this.slowTimerGetData);
            this.slowTimerGetData = window.setTimeout(function () { return _this.slowTimerGetDataEvent(step); }, step);
        };
        SiteData.prototype.getNumberFloors = function () {
            return this.floors.length;
        };
        SiteData.prototype.getNumberRooms = function () {
            return this.rooms.length;
        };
        SiteData.prototype.getFloor = function (num) {
            if (num > this.floors.length || num < 1) {
                return null;
            }
            return this.floors[num - 1];
        };
        SiteData.prototype.setNumberFloors = function (num) {
            if (num > this.floors.length) {
                for (var i = this.floors.length; i < num; i++) {
                    this.floors.push(new Floor());
                }
            }
            else if (num < this.floors.length) {
                this.floors.length = num;
            }
        };
        SiteData.prototype.setNumberRooms = function (num) {
            if (num > this.rooms.length) {
                for (var i = this.rooms.length; i < num; i++) {
                    this.rooms.push(new Room());
                }
            }
            else if (num < this.rooms.length) {
                this.rooms.length = num;
            }
        };
        SiteData.prototype.getNumberDoors = function () {
            return this.doors.length;
        };
        SiteData.prototype.getDoor = function (num) {
            if (num > this.doors.length || num < 1) {
                return null;
            }
            return this.doors[num - 1];
        };
        SiteData.prototype.setNumberTempSensors = function (num) {
            if (num > this.tempSensors.length) {
                for (var i = this.tempSensors.length; i < num; i++) {
                    this.tempSensors.push(new TemperatureSensor());
                }
            }
            else if (num < this.tempSensors.length) {
                this.tempSensors.length = num;
            }
        };
        SiteData.prototype.setNumberDoors = function (num) {
            if (num > this.doors.length) {
                for (var i = this.doors.length; i < num; i++) {
                    this.doors.push(new Door());
                }
            }
            else if (num < this.doors.length) {
                this.doors.length = num;
            }
        };
        SiteData.prototype.setNumberSwitches = function (num) {
            if (num > this.switches.length) {
                for (var i = this.switches.length; i < num; i++) {
                    this.switches.push(new Switch());
                }
            }
            else if (num < this.switches.length) {
                this.switches.length = num;
            }
        };
        SiteData.prototype.getSwitches = function () {
            return this.switches;
        };
        SiteData.prototype.getParentPath = function (thing) {
            if (thing == null) {
                return null;
            }
            else {
                var path = thing.getPath();
                if (path == null) {
                    return null;
                }
                var path2 = path
                    .replace(/(^\s+|\s+$)/g, '') //remove leading and trailing whitespaces
                    .replace(/(^\/+|\/+$)/g, ''); //remove leading and trailing slashes
                // window.alert("*** getParent ***, Path: " + path + "  \n\nPath2:" + path2 +"|");
                var parts = path2.split('/'); //split string
                parts.pop();
                parts.pop();
                var newPath = parts.join('/');
                //  window.alert("*** getParent ***, newPath: " + newPath);
                return newPath;
            }
        };
        SiteData.prototype.getThing = function (path) {
            for (var id in this.floors) {
                if (this.floors[id].getPath() == path) {
                    return this.floors[id];
                }
            }
            for (var id in this.rooms) {
                if (this.rooms[id].getPath() == path) {
                    return this.rooms[id];
                }
            }
            for (var id in this.tempSensors) {
                if (this.tempSensors[id].getPath() == path) {
                    return this.tempSensors[id];
                }
            }
            for (var id in this.switches) {
                if (this.switches[id].getPath() == path) {
                    return this.switches[id];
                }
            }
            for (var id in this.doors) {
                if (this.doors[id].getPath() == path) {
                    return this.doors[id];
                }
            }
            return null;
        };
        SiteData.prototype.getServerData = function () {
            var req = {
                orderId: "SiteData"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.dateString = data['date'];
                this.timeString = data['time'];
                // Floors                  
                this.setNumberFloors(parseInt(data['number_floors']));
                //  window.alert("floors:   " + this.getNumberFloors());
                for (var id_1 in this.floors) {
                    this.floors[id_1].setPath(data['floorPath_' + id_1]);
                }
                // Rooms            
                this.setNumberRooms(parseInt(data['number_rooms']));
                for (var id = 0; id < this.rooms.length; id++) {
                    this.rooms[id].setPath(data['roomPath_' + id]);
                    if (id == 0)
                        this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room0.png";
                    if (id == 1)
                        this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room1.png";
                    if (id == 2)
                        this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room2.png";
                    if (id == 3)
                        this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room3.png";
                }
                // TempSensors                              
                this.setNumberTempSensors(parseInt(data['number_tempsensors']));
                for (var id_2 in this.tempSensors) {
                    this.tempSensors[id_2].setPath(data['tempSensorPath_' + id_2]);
                }
                // Switches                     
                this.setNumberSwitches(parseInt(data['number_switches']));
                for (var id_3 in this.switches) {
                    this.switches[id_3].setPath(data['switchPath_' + id_3]);
                }
                // Door                     
                this.setNumberDoors(parseInt(data['number_doors']));
                for (var id_4 in this.doors) {
                    this.doors[id_4].setPath(data['doorPath_' + id_4]);
                }
            }
        };
        return SiteData;
    }());
    OhsSiteData.SiteData = SiteData;
    var Thing = (function () {
        function Thing() {
            this.valid = false; //content of the forecast is valid        
            this.path = null; //OpenHS path     
        }
        Thing.prototype.setPath = function (path) {
            this.path = path;
        };
        Thing.prototype.getPath = function () {
            return this.path;
        };
        return Thing;
    }());
    OhsSiteData.Thing = Thing;
    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor() {
            _super.apply(this, arguments);
        }
        return Floor;
    }(Thing));
    OhsSiteData.Floor = Floor;
    var Room = (function (_super) {
        __extends(Room, _super);
        function Room() {
            _super.call(this);
            this.imageBkgPath = "/infores/servlets/kitchen/room_default.png";
            this.name = "no name :(";
        }
        Room.prototype.getServerData = function () {
            var req = {
                orderId: "Room",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.name = data['name'];
                this.valid = true;
            }
        };
        return Room;
    }(Thing));
    OhsSiteData.Room = Room;
    var TemperatureSensor = (function (_super) {
        __extends(TemperatureSensor, _super);
        function TemperatureSensor() {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }
        TemperatureSensor.prototype.getServerData = function () {
            var req = {
                orderId: "TempSensor",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.temp = parseFloat(data['temp']);
                this.valid = true;
            }
        };
        return TemperatureSensor;
    }(Thing));
    OhsSiteData.TemperatureSensor = TemperatureSensor;
    var Switch = (function (_super) {
        __extends(Switch, _super);
        function Switch() {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.stateInt = 0;
        }
        Switch.prototype.isValid = function () {
            return this.valid;
        };
        Switch.prototype.getState = function () {
            return this.stateInt;
        };
        Switch.prototype.postServerClick = function () {
            var req = {
                postId: "SwitchS",
                path: this.path
            };
            postAjax("kitchen", req);
        };
        Switch.prototype.getServerData = function () {
            var req = {
                orderId: "SwitchS",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.stateInt = parseInt(data['state_sw']);
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.valid = true;
            }
        };
        return Switch;
    }(Thing));
    OhsSiteData.Switch = Switch;
    var Door = (function (_super) {
        __extends(Door, _super);
        function Door() {
            _super.call(this);
            this.open = false;
            this.locked = false;
            this.x = 0;
            this.y = 0;
        }
        Door.prototype.getState = function () {
            if (!this.valid)
                return 0;
            if (this.open)
                return 1;
            if (this.locked)
                return 3;
            return 2;
        };
        Door.prototype.postServerClick = function () {
            var req = {
                postId: "DoorD",
                path: this.path
            };
            postAjax("kitchen", req);
        };
        Door.prototype.getServerData = function () {
            var req = {
                orderId: "DoorD",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.open = JSON.parse(data['open']);
                this.locked = JSON.parse(data['lock']);
                this.valid = true;
            }
        };
        return Door;
    }(Thing));
    OhsSiteData.Door = Door;
    var Window = (function () {
        function Window() {
            this.valid = false; //content is valid       
        }
        Window.prototype.setPath = function (path) {
            this.path = path;
        };
        return Window;
    }());
    OhsSiteData.Window = Window;
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
    function postAjax(urlAdr, json) {
        var result = null;
        $.ajax({ async: false, type: "POST", url: urlAdr, data: json, dataType: "json", success: function (response) {
                result = response;
            } });
        return result;
    }
})(OhsSiteData || (OhsSiteData = {}));
