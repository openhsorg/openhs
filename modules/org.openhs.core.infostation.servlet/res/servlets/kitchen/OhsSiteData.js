var OhsSiteData;
(function (OhsSiteData) {
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
    var SiteData = (function () {
        function SiteData() {
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
            for (var id in this.switches) {
                this.switches[id].getServerData();
            }
            for (var id in this.tempSensors) {
                this.tempSensors[id].getServerData();
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
        SiteData.prototype.getNumberSwitches = function () {
            return this.switches.length;
        };
        SiteData.prototype.getSwitch = function (num) {
            if (num > this.switches.length || num < 1) {
                return null;
            }
            return this.switches[num - 1];
        };
        SiteData.prototype.getServerData = function () {
            var req = {
                orderId: "SiteData"
            };
            var data = getAjax("kitchen", req);
            this.setSiteData2(data);
        };
        SiteData.prototype.setSiteData2 = function (data) {
            // var data: string = this.getData("kitchen", "SiteData"); 
            if (data != null) {
                // Floors
                var numberFloors = parseInt(data['number_floors']);
                //window.alert("Number floors:" + numberFloors );                        
                this.setNumberFloors(numberFloors);
                for (var i = 1; i <= numberFloors; i++) {
                    var floorPath = data['floorPath_' + i];
                    this.floors[i - 1].setPath(floorPath);
                }
                // Rooms            
                var numberRooms = parseInt(data['number_rooms']);
                this.setNumberRooms(numberRooms);
                //window.alert("Number rooms:" + numberRooms);
                for (var i = 1; i <= numberRooms; i++) {
                    var roomPath = data['roomPath_' + i];
                    this.rooms[i - 1].setPath(roomPath);
                }
                // TempSensors                              
                this.setNumberTempSensors(parseInt(data['number_tempsensors']));
                for (var id in this.tempSensors) {
                    this.tempSensors[id].setPath(data['tempSensorPath_' + id]);
                }
                // Switches                     
                this.setNumberSwitches(parseInt(data['number_switches']));
                for (var id in this.switches) {
                    this.switches[id].setPath(data['switchPath_' + id]);
                }
                // Door                     
                var numberDoors = parseInt(data['number_doors']);
                this.setNumberDoors(numberDoors);
                //  window.alert("Number doors:" + this.getNumberDoors());            
                for (var id in this.doors) {
                    var doorPath = data['doorPath_' + id];
                    this.doors[id].setPath(doorPath);
                    this.doors[id].x = parseInt(data['x_coordinate_door_' + id]);
                    this.doors[id].y = parseInt(data['y_coordinate_door_' + id]);
                    this.doors[id].open = JSON.parse(data['open_door_' + id]);
                    this.doors[id].locked = JSON.parse(data['lock_door_' + id]);
                }
            }
        };
        return SiteData;
    }());
    OhsSiteData.SiteData = SiteData;
    var Floor = (function () {
        function Floor() {
            this.valid = false; //content of the forecast is valid
        }
        Floor.prototype.setPath = function (path) {
            this.path = path;
        };
        return Floor;
    }());
    OhsSiteData.Floor = Floor;
    var Room = (function () {
        function Room() {
            this.valid = false; //content of the forecast is valid     
        }
        Room.prototype.setPath = function (path) {
            this.path = path;
        };
        return Room;
    }());
    OhsSiteData.Room = Room;
    var TemperatureSensor = (function () {
        function TemperatureSensor() {
            this.valid = false; //content of the forecast is valid              
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }
        TemperatureSensor.prototype.getPath = function () {
            return this.path;
        };
        TemperatureSensor.prototype.setPath = function (path) {
            this.path = path;
        };
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
    }());
    OhsSiteData.TemperatureSensor = TemperatureSensor;
    var Switch = (function () {
        function Switch() {
            this.valid = false; //content of the forecast is valid       
            this.x = 0;
            this.y = 0;
            this.stateInt = 0;
        }
        Switch.prototype.isValid = function () {
            return this.valid;
        };
        Switch.prototype.setPath = function (path) {
            this.path = path;
        };
        Switch.prototype.getPath = function () {
            return this.path;
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
    }());
    OhsSiteData.Switch = Switch;
    var Door = (function () {
        function Door() {
            this.valid = false; //content is valid       
            this.open = false;
            this.locked = false;
            this.x = 0;
            this.y = 0;
        }
        Door.prototype.setPath = function (path) {
            this.path = path;
        };
        Door.prototype.getState = function () {
            if (!this.valid)
                return 0;
            if (this.open)
                return 1;
            if (this.locked)
                return 3;
            return 2;
        };
        return Door;
    }());
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
})(OhsSiteData || (OhsSiteData = {}));