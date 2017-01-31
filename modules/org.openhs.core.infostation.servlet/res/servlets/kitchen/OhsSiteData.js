var OhsSiteData;
(function (OhsSiteData) {
    var SiteData = (function () {
        function SiteData() {
            this.floors = new Array();
            this.rooms = new Array();
            this.tempSensors = new Array();
            this.switches = new Array();
            this.doors = new Array();
        }
        SiteData.prototype.getNumberFloors = function () {
            return this.floors.length;
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
        /*
        public setFloorItem (num: number, data: string) {
            if (num + 1 > this.floors.length) {
                this.setNumberFloors (num + 1);
            }
            
            //this.floors[num].setWeather(data);
        }
        
        public getFloor (num: number) {
            if (num + 1 <= this.floors.length) {
                return this.floors[num];
            } else {
                return new Floor();
            }
        }
        */
        SiteData.prototype.setSiteData = function (data) {
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
            var numberTempSensors = parseInt(data['number_tempsensors']);
            this.setNumberTempSensors(numberTempSensors);
            //window.alert("Number temp sensors:" + numberTempSensors);
            for (var i = 1; i <= numberTempSensors; i++) {
                var tempSensorPath = data['tempSensorPath_' + i];
                this.tempSensors[i - 1].setPath(tempSensorPath);
                this.tempSensors[i - 1].x = parseInt(data['x_coordinate']);
                this.tempSensors[i - 1].y = parseInt(data['y_coordinate']);
            }
            // Door                     
            var numberDoors = parseInt(data['number_doors']);
            //window.alert("Number temp sensors:" + numberDoors);
            this.setNumberDoors(numberDoors);
            for (var i = 1; i <= numberDoors; i++) {
                var doorPath = data['doorPath_' + i];
                this.doors[i - 1].setPath(doorPath);
                this.doors[i - 1].x = parseInt(data['x_coordinate']);
                this.doors[i - 1].y = parseInt(data['y_coordinate']);
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
        }
        TemperatureSensor.prototype.setPath = function (path) {
            this.path = path;
        };
        return TemperatureSensor;
    }());
    OhsSiteData.TemperatureSensor = TemperatureSensor;
    var Switch = (function () {
        function Switch() {
            this.valid = false; //content of the forecast is valid       
        }
        Switch.prototype.setPath = function (path) {
            this.path = path;
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
