

module OhsSiteData {
    
    export class SiteData {
                       
        private floors: Array <Floor>;
        private rooms: Array <Room>;
        private tempSensors: Array <TemperatureSensor>;
        private switches: Array <Switch>;
        private doors: Array <Door>;
        
        constructor () {            
            this.floors = new Array<Floor>();
            this.rooms = new Array<Room>(); 
            this.tempSensors = new Array<TemperatureSensor>(); 
            this.switches = new Array<Switch>();
            this.doors = new Array<Door>();    
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
            
            for (var i = 1; i <= numberTempSensors; i++) {
                var tempSensorPath: string = data['tempSensorPath_' + i];                
                this.tempSensors[i - 1].setPath(tempSensorPath);
                this.tempSensors[i - 1].x = parseInt(data['x_coordinate']);
                this.tempSensors[i - 1].y = parseInt(data['y_coordinate']);                
            }     
            
            // Door                     
            var numberDoors = parseInt(data['number_doors']);
            //window.alert("Number temp sensors:" + numberDoors);
            this.setNumberDoors (numberDoors);
                        
            for (var i = 1; i <= numberDoors; i++) {
                var doorPath: string = data['doorPath_' + i];                
                this.doors[i - 1].setPath(doorPath);
                this.doors[i - 1].x = parseInt(data['x_coordinate']);
                this.doors[i - 1].y = parseInt(data['y_coordinate']);
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
    
    export class Switch {
    
        public valid: boolean = false; //content of the forecast is valid       
        
        public path:  string; //OpenHS path
        
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