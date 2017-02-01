

module OhsSiteData {
    
    export class SiteData {
                       
        private floors: Array <Floor>;
        private rooms: Array <Room>;
        public tempSensors: Array <TemperatureSensor>;
        private switches: Array <Switch>;
        public doors: Array <Door>;
        
        constructor () {            
            this.floors = new Array<Floor>();
            this.rooms = new Array<Room>(); 
            this.tempSensors = new Array<TemperatureSensor>(); 
            this.switches = new Array<Switch>();
            this.doors = new Array<Door>();    
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
        
        public setSiteData (data: string){
            
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
            var numberTempSensors = parseInt(data['number_tempsensors']);
            this.setNumberTempSensors (numberTempSensors);
            //window.alert("Number temp sensors:" + numberTempSensors);
            
            for (let id in this.tempSensors) {
                var tempSensorPath: string = data['tempSensorPath_' + id];                
                this.tempSensors[id].setPath(tempSensorPath);
                this.tempSensors[id].x = parseInt(data['x_coordinate_ts' + id]);
                this.tempSensors[id].y = parseInt(data['y_coordinate_ts' + id]);
                this.tempSensors[id].temp = parseFloat(data['temp_ts' + id]);      
                
               // window.alert("\n--->ID:" + id + " Path: " + tempSensorPath + " X: " + parseInt(data['x_coordinate']) + "Y: " + this.tempSensors[id].y);
            }     
            
            // Switches                     
            var numberSwitches = parseInt(data['number_switches']);
            this.setNumberSwitches (numberSwitches);
            //window.alert("Number switches:" + numberSwitches);
            
            for (let id in this.switches) {         
                this.switches[id].setPath(data['switchPath_' + id]);
                this.switches[id].x = parseInt(data['x_coordinate_sw' + id]);
                this.switches[id].y = parseInt(data['y_coordinate_sw' + id]);
               // this.tempSensors[id].temp = parseFloat(data['temp_ts' + id]);      
                
               // window.alert("\n--->ID:" + id + " Path: " + tempSensorPath + " X: " + parseInt(data['x_coordinate']) + "Y: " + this.tempSensors[id].y);
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
    
        public valid: boolean = false; //content of the forecast is valid      
        
        public path:  string; //OpenHS path
        
        public temp:  number;
        
        public x:   number;
        public y:   number;      
        
        constructor () {            
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }        
        
        public setPath (path: string) {
            this.path = path;
        }                
    } 
    
    export class Switch {
    
        public valid: boolean = false; //content of the forecast is valid       
        
        public path:  string; //OpenHS path
        
        public x:   number;
        public y:   number;        
        
        constructor () {            
            this.x = 0;
            this.y = 0;
        }        
        
        public setPath (path: string) {
            this.path = path;
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