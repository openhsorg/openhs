/**
 * Module with data structure...
 */

module OhsSiteData {
     
    export class SiteData {

        //---Timers---
        private fastTimerGetData;
        private slowTimerGetData;
        
        //---Site data---
        public floors: Array <Floor> = null;
        public rooms: Array <Room> = null;
        public tempSensors: Array <TemperatureSensor> = null;
        public switches: Array <Switch> = null;
        public doors: Array <Door> = null;
        
        //---Other data---
        public timeString: string = "---";
        public dateString: string = "---";
        
        constructor () {            
            this.floors = new Array<Floor>();
            this.rooms = new Array<Room>(); 
            this.tempSensors = new Array<TemperatureSensor>(); 
            this.switches = new Array<Switch>();
            this.doors = new Array<Door>();    
                        
            this.slowTimerGetDataEvent(1000);            
            this.fastTimerGetDataEvent(100);
        }
        
        private fastTimerGetDataEvent(step : number) {
            
            for (let id in this.rooms) {
                this.rooms[id].getServerData();
            }            
            
            for (let id in this.switches) {
                this.switches[id].getServerData();
            }
            
            for (let id in this.tempSensors) {
                this.tempSensors[id].getServerData();
            }      
            
            for (let id in this.doors) {
                this.doors[id].getServerData();
            }             
                      
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step); 
        }           
        
        private slowTimerGetDataEvent(step : number) {
                                  
           this.getServerData();
             
           window.clearTimeout(this.slowTimerGetData);
           this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step); 
        }         

        public setNumber<T>(num:  number, arg: Array<T>, types: { new(): T ;}) {
            if (num > arg.length) {            
                for (var i = arg.length; i < num; i++) {                    
                    var ss = new types();
                    arg.push(ss);
                }
            } else if (num < arg.length) {            
                arg.length = num;             
            }   
        }
        
        public getFilteredThings<T>(arg: Array<T>, filterPath: string):T[] {
            
            if (filterPath == null) {
                return arg;
                
            } else {
   
                 return arg.filter(function(element){
                     
                     var thing: Thing = (<Thing><any>element);
                     
                     //if (mark.thing == null) {
                       //  return true;
                         
                     //} else {
                         
                         return thing.getPath().indexOf(filterPath) >= 0;                         
                     //}
                 });                               
             }
        }          
  
        public getParentPath (thing: Thing) {                        
            if (thing == null) {
                return null;
                
            } else {
                                                
                var path: string = thing.getPath();                                                
                
                if (path == null) {
                    return null;
                }                                
                
                var path2 = path
                    .replace(/(^\s+|\s+$)/g,'') //remove leading and trailing whitespaces
                    .replace(/(^\/+|\/+$)/g,''); //remove leading and trailing slashes
                
               // window.alert("*** getParent ***, Path: " + path + "  \n\nPath2:" + path2 +"|");
                         
                var parts = path2.split('/'); //split string
                
                parts.pop();
                parts.pop();                
                
                let newPath: string = parts.join('/');
                
              //  window.alert("*** getParent ***, newPath: " + newPath);
                
                return newPath;                
            }            
        }
        
        public getThing (path: string){ 
        
            for (let id in this.floors) {                
                if (this.floors[id].getPath() == path) {
                    return <Thing>this.floors[id];
                }                    
            }
            
            for (let id in this.rooms) {                
                if (this.rooms[id].getPath() == path) {
                    return <Thing>this.rooms[id];
                }                    
            }  
            
            for (let id in this.tempSensors) {                
                if (this.tempSensors[id].getPath() == path) {
                    return <Thing>this.tempSensors[id];
                }                    
            } 
            
            for (let id in this.switches) {                
                if (this.switches[id].getPath() == path) {
                    return <Thing>this.switches[id];
                }                    
            }   
            
            for (let id in this.doors) {                
                if (this.doors[id].getPath() == path) {
                    return <Thing>this.doors[id];
                }                    
            }               
        
            return null;
        }
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "SiteData"
//                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                
                this.dateString = data['date'];
                this.timeString = data['time'];
            
                // Floors                  
                this.setNumber(parseInt(data['number_floors']), this.floors, Floor);                                
                                        
                for (let id in this.floors) {                    
                    this.floors[id].setPath(data['floorPath_' + id]);
                    
                //     window.alert("path:   " + this.floors[id].getPath() + "  id:" + id);
                }           
                
                // Rooms            
                this.setNumber(parseInt(data['number_rooms']), this.rooms, Room);
                
                for (var id = 0; id < this.rooms.length; id ++) {                    
                    this.rooms[id].setPath(data['roomPath_' + id]);
                }             
                
                // TempSensors                                             
                this.setNumber(parseInt(data['number_tempsensors']), this.tempSensors, TemperatureSensor);
                
                for (let id in this.tempSensors) {                                
                    this.tempSensors[id].setPath(data['tempSensorPath_' + id]);                   
                }     
                
                // Switches                                     
                this.setNumber(parseInt(data['number_switches']), this.switches, Switch);
                
                for (let id in this.switches) {                      
                    this.switches[id].setPath(data['switchPath_' + id]);
                }              
                
                // Door                                     
                this.setNumber(parseInt(data['number_doors']), this.doors, Door);
                            
                for (let id in this.doors) {           
                    this.doors[id].setPath(data['doorPath_' + id]);
                    
                //    window.alert("Path:" + this.doors[id].getPath());
                }                   
            }      
        }                        
    }
    
    export class Thing {
        
        public valid: boolean = false; //content of the forecast is valid        
        protected path:  string = null; //OpenHS path     
        
        constructor () {
        }
        
        public setPath (path: string) {
            this.path = path;
        }   
        
        public getPath() {
            return this.path;
        }
        
    }
        
    export class Floor extends Thing {
        
        public imageBkgPath: string = "/infores/servlets/kitchen/room_default.png"; 
                   
    }
    
    export class Room extends Thing{
        
        public imageBkgPath: string = "/infores/servlets/kitchen/room_default.png"; 
        
        public name: string = "no name :(";
        
        constructor () {
            super ();
                                    
        }        
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "Room",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid) {
                    this.name = data['name'];
                    this.imageBkgPath = data['imgBkg'];
                }  
                
            }                                      
        }                    
    }    
    
    export class TemperatureSensor extends Thing{
        
        public temp:  number;        
        public x:   number;
        public y:   number;      
        
        constructor () { 
            super();           
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }             
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "TempSensor",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.valid = JSON.parse(data['validity']);

                if (this.valid) {
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                    this.temp = parseFloat(data['temp']);  
                }
            }                            
        }        
    } 
    
    export class Switch extends Thing{
    
 
        protected   stateInt:  number; //        
        
        public x:   number;
        public y:   number;        
        
        constructor () {     
            super ();       
            this.x = 0;
            this.y = 0;
            
            this.stateInt = 0;
        }        
        
        public isValid() {
            return this.valid;
        }       
 
        public getState () {
            return this.stateInt;
        }
        
        public postServerClick () {            
            var req: any = {
                postId : "SwitchS",
                path:   this.path                
            }
            
            postAjax("kitchen", req);
        }                
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "SwitchS",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid){
                    this.stateInt = parseInt(data['state_sw']);
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                }                                
            }                            
        }
    }   
    
    export class Door extends Thing {
        
        public name: string = "no name";
        public image_open: string = "/infores/servlets/kitchen/room_default.png";
        public image_close: string = "/infores/servlets/kitchen/room_default.png"; 
        
        public open:       boolean; //Open
        public locked:     boolean; //Door lock
        
        public x:   number;
        public y:   number;
        
        constructor () {
            super();
            this.open = false;
            this.locked = false;
            
            this.x = 0;
            this.y = 0;
        } 
        
        public getState () {                                   
            if (!this.valid) return 0;
            if (this.open) return 1;                        
            if (this.locked) return 3;
            
            return 2;                                    
        }
        
        public postServerClick () {            
            var req: any = {
                postId : "DoorD",
                path:   this.path                
            }
            
            postAjax("kitchen", req);
        }                
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "DoorD",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid){
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                    this.open = JSON.parse(data['open']);
                    this.locked = JSON.parse(data['lock']);  
                    this.image_open = data['image_open'];
                    this.image_close = data['image_close'];          
                }                                
            }                                                       
        }        
    }    
    
    export class Window {
    
        public valid: boolean = false; //content is valid       
        
        public path:        string; //OpenHS path        
        public open:        boolean; //Open
        
        public setPath (path: string) {
            this.path = path;
        }                
    }    
    
    
    function getAjax(urlAdr: string, dataIn: string) {
       
        var result = null;
    
        $.ajaxSetup ({
            // Disable caching of AJAX responses
            cache: false
        });
            
        $.ajax({async: false, url: urlAdr, data: dataIn, dataType: "json", success: function(data) {
        
            result = data;
                                      
        }});
    
        return result;    
    }     
    
    
    function postAjax(urlAdr: string, json: string) {
       
        var result = null;
            
        $.ajax({async: false, type: "POST", url: urlAdr, data: json, dataType: "json", success: function(response) {
        
            result = response;
                                      
        }});
    
        return result;    
    }      
        
    
}