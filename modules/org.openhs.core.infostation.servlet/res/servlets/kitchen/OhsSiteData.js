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
    var servletUrl = 'kitchen';
    var switchId = 'SwitchS';
    var contactSensorId = 'ContactSensor';
    var SiteData = (function () {
        function SiteData() {
            //---Site data---
            this.m_floorArray = null;
            this.m_roomArray = null;
            this.m_tempSensorArray = null;
            this.m_switchArray = null;
            this.m_doorArray = null;
            this.m_contactSensorArray = null;
            //---Other data---
            this.timeString = "---";
            this.dateString = "---";
            this.m_floorArray = new Array();
            this.m_roomArray = new Array();
            this.m_tempSensorArray = new Array();
            this.m_switchArray = new Array();
            this.m_doorArray = new Array();
            this.m_contactSensorArray = new Array();
            this.slowTimerGetDataEvent(1000);
            this.fastTimerGetDataEvent(100);
        }
        SiteData.prototype.fastTimerGetDataEvent = function (step) {
            var _this = this;
            for (var id in this.m_roomArray) {
                this.m_roomArray[id].getServerData();
            }
            for (var id in this.m_switchArray) {
                this.m_switchArray[id].getServerData();
            }
            for (var id in this.m_tempSensorArray) {
                this.m_tempSensorArray[id].getServerData();
            }
            for (var id in this.m_doorArray) {
                this.m_doorArray[id].getServerData();
            }
            for (var id in this.m_contactSensorArray) {
                this.m_contactSensorArray[id].getServerData();
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
        SiteData.prototype.setNumber = function (num, arg, types) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types();
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        };
        SiteData.prototype.getFilteredThings = function (arg, filterPath) {
            if (filterPath == null) {
                return arg;
            }
            else {
                return arg.filter(function (element) {
                    var thing = element;
                    //if (mark.thing == null) {
                    //  return true;
                    //} else {
                    return thing.getPath().indexOf(filterPath) >= 0;
                    //}
                });
            }
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
            for (var id in this.m_floorArray) {
                if (this.m_floorArray[id].getPath() == path) {
                    return this.m_floorArray[id];
                }
            }
            for (var id in this.m_roomArray) {
                if (this.m_roomArray[id].getPath() == path) {
                    return this.m_roomArray[id];
                }
            }
            for (var id in this.m_tempSensorArray) {
                if (this.m_tempSensorArray[id].getPath() == path) {
                    return this.m_tempSensorArray[id];
                }
            }
            for (var id in this.m_switchArray) {
                if (this.m_switchArray[id].getPath() == path) {
                    return this.m_switchArray[id];
                }
            }
            for (var id in this.m_doorArray) {
                if (this.m_doorArray[id].getPath() == path) {
                    return this.m_doorArray[id];
                }
            }
            for (var id in this.m_contactSensorArray) {
                if (this.m_contactSensorArray[id].getPath() == path) {
                    return this.m_contactSensorArray[id];
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
                this.setNumber(parseInt(data['number_floors']), this.m_floorArray, Floor);
                for (var id_1 in this.m_floorArray) {
                    this.m_floorArray[id_1].setPath(data['floorPath_' + id_1]);
                }
                // Rooms            
                this.setNumber(parseInt(data['number_rooms']), this.m_roomArray, Room);
                for (var id = 0; id < this.m_roomArray.length; id++) {
                    this.m_roomArray[id].setPath(data['roomPath_' + id]);
                }
                // TempSensors                                             
                this.setNumber(parseInt(data['number_tempsensors']), this.m_tempSensorArray, TemperatureSensor);
                for (var id_2 in this.m_tempSensorArray) {
                    this.m_tempSensorArray[id_2].setPath(data['tempSensorPath_' + id_2]);
                }
                // Switches                                     
                this.setNumber(parseInt(data['number_switches']), this.m_switchArray, Switch);
                for (var id_3 in this.m_switchArray) {
                    this.m_switchArray[id_3].setPath(data['switchPath_' + id_3]);
                }
                // ContactSensors                                                     
                this.setNumber(parseInt(data['number_contactSensors']), this.m_contactSensorArray, ContactSensor);
                //window.alert("Num:" + parseInt(data['number_contactSensors']));
                for (var id_4 in this.m_contactSensorArray) {
                    this.m_contactSensorArray[id_4].setPath(data['contactSensorPath_' + id_4]);
                }
                // Door                                     
                this.setNumber(parseInt(data['number_doors']), this.m_doorArray, Door);
                for (var id_5 in this.m_doorArray) {
                    this.m_doorArray[id_5].setPath(data['doorPath_' + id_5]);
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
        Thing.prototype.isValid = function () {
            return this.valid;
        };
        return Thing;
    }());
    OhsSiteData.Thing = Thing;
    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor() {
            _super.apply(this, arguments);
            this.imageBkgPath = "/infores/servlets/kitchen/room_default.png";
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
                this.valid = JSON.parse(data['validity']);
                if (this.valid) {
                    this.name = data['name'];
                    this.imageBkgPath = data['imgBkg'];
                }
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
                this.valid = JSON.parse(data['validity']);
                if (this.valid) {
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                    this.temp = parseFloat(data['temp']);
                }
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
        Switch.prototype.getState = function () {
            return this.stateInt;
        };
        Switch.prototype.postServerClick = function () {
            var req = {
                postId: switchId,
                path: this.path
            };
            postAjax(servletUrl, req);
        };
        Switch.prototype.getServerData = function () {
            var req = {
                orderId: switchId,
                path: this.path
            };
            var data = getAjax(servletUrl, req);
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                if (this.valid) {
                    this.stateInt = parseInt(data['state_sw']);
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                }
            }
        };
        return Switch;
    }(Thing));
    OhsSiteData.Switch = Switch;
    var ContactSensor = (function (_super) {
        __extends(ContactSensor, _super);
        function ContactSensor() {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.state = false;
        }
        ContactSensor.prototype.getState = function () {
            return this.state;
        };
        ContactSensor.prototype.getServerData = function () {
            var req = {
                orderId: contactSensorId,
                path: this.path
            };
            var data = getAjax(servletUrl, req);
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                if (this.valid) {
                    this.state = JSON.parse(data['state']);
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                }
            }
        };
        return ContactSensor;
    }(Thing));
    OhsSiteData.ContactSensor = ContactSensor;
    var Door = (function (_super) {
        __extends(Door, _super);
        function Door() {
            _super.call(this);
            this.name = "no name";
            this.image_open = "/infores/servlets/kitchen/room_default.png";
            this.image_close = "/infores/servlets/kitchen/room_default.png";
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
                this.valid = JSON.parse(data['validity']);
                if (this.valid) {
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                    this.open = JSON.parse(data['open']);
                    this.locked = JSON.parse(data['lock']);
                    this.image_open = data['image_open'];
                    this.image_close = data['image_close'];
                }
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
