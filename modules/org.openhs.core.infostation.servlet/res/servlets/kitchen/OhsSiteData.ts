/**
 * Module with data structure...
 */

module OhsSiteData {
     
    export class SiteData {
                       
        private fastTimerGetData;
        private slowTimerGetData;
        
        private floors: Array <Floor> = null;
        private rooms: Array <Room> = null;
        public tempSensors: Array <TemperatureSensor> = null;
        public switches: Array <Switch> = null;
        public doors: Array <Door> = null;
        
        public timeString: string = "---";
        public dateString: string = "---";
        
        constructor () {            
            this.floors = new Array<Floor>();
            this.rooms = new Array<Room>(); 
            this.tempSensors = new Array<TemperatureSensor>(); 
            this.switches = new Array<Switch>();
            this.doors = new Array<Door>();    
                        
            this.slowTimerGetDataEvent(5000);            
            this.fastTimerGetDataEvent(100);
        }
        
        private fastTimerGetDataEvent(step : number) {
            
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
        
        public getNumberFloors () {
            return this.floors.length;
        }
        
        public getNumberRooms () {
            return this.rooms.length;
        }        
        
        public getFloor (num:  number){
            if (num > this.floors.length || num < 1) {
                return null;
            }
            return this.floors[num - 1];
        }
       
        
        public setNumberFloors (num: number) {         
            if (num > this.floors.length) {            
                for (var i = this.floors.length; i < num; i++) {
                    this.floors.push(new Floor());
                }
            } else if (num < this.floors.length) {            
                this.floors.length = num;             
            }
        }
        
        public setNumberRooms (num: number) {         
            if (num > this.rooms.length) {            
                for (var i = this.rooms.length; i < num; i++) {
                    this.rooms.push(new Room());
                }
            } else if (num < this.rooms.length) {            
                this.rooms.length = num;             
            }
        }   
        
        public getNumberDoors () {
            return this.doors.length;
        }
        
        public getDoor (num:  number){
            if (num > this.doors.length || num < 1) {
                return null;
            }
            return this.doors[num - 1];
        }        
        
        public setNumberTempSensors (num: number) {         
            if (num > this.tempSensors.length) {            
                for (var i = this.tempSensors.length; i < num; i++) {
                    this.tempSensors.push(new TemperatureSensor());
                }
            } else if (num < this.tempSensors.length) {            
                this.tempSensors.length = num;             
            }
        }    
        
        public setNumberDoors(num: number) {         
            if (num > this.doors.length) {            
                for (var i = this.doors.length; i < num; i++) {
                    this.doors.push(new Door());
                }
            } else if (num < this.doors.length) {            
                this.doors.length = num;             
            }
        }         
        
        public setNumberSwitches (num: number) {         
            if (num > this.switches.length) {            
                for (var i = this.switches.length; i < num; i++) {
                    this.switches.push(new Switch());
                }
            } else if (num < this.switches.length) {            
                this.switches.length = num;             
            }
        }          

        public getNumberSwitches () {
            return this.switches.length;
        }
        
        public getSwitch (num:  number){
            if (num > this.switches.length || num < 1) {
                return null;
            }
            return this.switches[num - 1];
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
                this.setNumberFloors (parseInt(data['number_floors']));
                                        
                for (let id in this.floors) {                    
                    this.floors[id].setPath(data['floorPath_' + id]);
                }           
                
                // Rooms            
                this.setNumberRooms (parseInt(data['number_rooms']));
                
                for (let id in this.rooms) {                    
                    this.rooms[id].setPath(data['roomPath_' + id]);
                }             
                
                // TempSensors                              
                this.setNumberTempSensors (parseInt(data['number_tempsensors']));
                
                for (let id in this.tempSensors) {                                
                    this.tempSensors[id].setPath(data['tempSensorPath_' + id]);                   
                }     
                
                // Switches                     
                this.setNumberSwitches (parseInt(data['number_switches']));
                
                for (let id in this.switches) {                      
                    this.switches[id].setPath(data['switchPath_' + id]);
                }              
                
                // Door                     
                this.setNumberDoors (parseInt(data['number_doors']));
                            
                for (let id in this.doors) {           
                    this.doors[id].setPath(data['doorPath_' + id]);
                }                   
            }      
        }                        
    }
    
    export class Thing {
        
        public valid: boolean = false; //content of the forecast is valid        
        protected path:  string; //OpenHS path     
        
        constructor () {
            this.path = '';
        }
        
        public setPath (path: string) {
            this.path = path;
        }   
        
        public getPath() {
            return this.path;
        }
        
    }
        
    export class Floor extends Thing {
                   
    }
    
    export class Room extends Thing{
              
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
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.temp = parseFloat(data['temp']);  
                this.valid = true;
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
                this.stateInt = parseInt(data['state_sw']);
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                
                this.valid = true;
            }                            
        }
    }   
    
    export class Door extends Thing {
        
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
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.open = JSON.parse(data['open']);
                this.locked = JSON.parse(data['lock']);
                
                this.valid = true;
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