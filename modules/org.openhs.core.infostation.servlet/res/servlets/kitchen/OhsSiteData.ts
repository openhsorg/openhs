

module OhsSiteData {
 
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
    
    
    export class SiteData {
                       
        private fastTimerGetData;
        private slowTimerGetData;
        
        private floors: Array <Floor>;
        private rooms: Array <Room>;
        public tempSensors: Array <TemperatureSensor>;
        public switches: Array <Switch>;
        public doors: Array <Door>;
        
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
            
            this.setSiteData2(data);           
        }        
        
        public setSiteData2 (data:  string){
            
           // var data: string = this.getData("kitchen", "SiteData"); 
            
            if (data != null) {
            
                // Floors
                var numberFloors = parseInt(data['number_floors']);
                
                //window.alert("Number floors:" + numberFloors );                        
                this.setNumberFloors (numberFloors);
                                        
                for (var i = 1; i <= numberFloors; i++) {
                    var floorPath: string = data['floorPath_' + i];
                    
                    this.floors[i - 1].setPath(floorPath);
                }           
                
                // Rooms            
                var numberRooms = parseInt(data['number_rooms']);
                this.setNumberRooms (numberRooms);
                //window.alert("Number rooms:" + numberRooms);
                
                for (var i = 1; i <= numberRooms; i++) {
                    var roomPath: string = data['roomPath_' + i];
                    
                    this.rooms[i - 1].setPath(roomPath);
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
                var numberDoors = parseInt(data['number_doors']);
                this.setNumberDoors (numberDoors);
                
              //  window.alert("Number doors:" + this.getNumberDoors());            
                            
                for (let id in this.doors) {
                    var doorPath: string = data['doorPath_' + id];                
                    this.doors[id].setPath(doorPath);
                    this.doors[id].x = parseInt(data['x_coordinate_door_' + id]);
                    this.doors[id].y = parseInt(data['y_coordinate_door_' + id]);
                    this.doors[id].open = JSON.parse(data['open_door_' + id]);
                    this.doors[id].locked = JSON.parse(data['lock_door_' + id]);
                }   
                
            }
        }
        /*
        public setSwitch (path: string){            
            for (let id in this.switches) {                
                if (this.switches[id].path.toString() == path) {
                    
                    this.switches[id].getServerData();
                      
                }                   
            }    
        }
        */
        /*
        public postSwitch (path: string){            
            for (let id in this.switches) {                
                if (this.switches[id].path.toString() == path) {
    
                    //postAjax('kitchen', "switchClicked", "switch1");
                    this.switches[id].userClick();                     
                }                   
            }    
        }        
        
        private getData(url: string, id: string) {    
            var data = getAjax(url, id);
            
            if (data != null) {
                return data;
            }
            return null;   
        }   
        */      
    }
        
    export class Floor {
    
        public valid: boolean = false; //content of the forecast is valid
        
        public path:  string; //OpenHS path
        
        public setPath (path: string) {
            this.path = path;
        }                
    }
    
    export class Room {
    
        public valid: boolean = false; //content of the forecast is valid     
        
        public path:  string; //OpenHS path
        
        public setPath (path: string) {
            this.path = path;
        }                
    }    
    
    export class TemperatureSensor {
    
        protected valid: boolean = false; //content of the forecast is valid              
        protected path:  string; //OpenHS path
        
        public temp:  number;        
        public x:   number;
        public y:   number;      
        
        constructor () {            
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }        
        
        public getPath () {
            return this.path;
        }   
        
        public setPath (path: string) {
            this.path = path;
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
    
    export class Switch {
    
        protected      valid:  boolean = false; //content of the forecast is valid       
        protected   stateInt:  number; //        
        protected path:  string; //OpenHS path
        
        public x:   number;
        public y:   number;        
        
        constructor () {            
            this.x = 0;
            this.y = 0;
            
            this.stateInt = 0;
        }        
        
        public isValid() {
            return this.valid;
        }
        
        public setPath (path: string) {
            this.path = path;
        }  
        
        public getPath () {
            return this.path;
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
    
    export class Door {
    
        public valid: boolean = false; //content is valid       
        
        public path:  string; //OpenHS path
        
        public open:       boolean; //Open
        public locked:     boolean; //Door lock
        
        public x:   number;
        public y:   number;
        
        constructor () {
            this.open = false;
            this.locked = false;
            
            this.x = 0;
            this.y = 0;
        }
        
        public setPath (path: string) {
            this.path = path;
        }    
        
        public getState () {                                   
            if (!this.valid) return 0;
            if (this.open) return 1;                        
            if (this.locked) return 3;
            
            return 2;                                    
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
    
}