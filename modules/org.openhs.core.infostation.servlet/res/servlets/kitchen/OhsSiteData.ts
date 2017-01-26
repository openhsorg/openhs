

module OhsSiteData {
    
    export class SiteData {
                       
        private floors: Array<Floor>;
        
        constructor () {            
            this.floors = new Array<Floor>(); 
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
        
        public setSiteData (data: string){
            
            var numberFloors = parseInt(data['number_floors']);
            
            this.setNumberFloors (numberFloors);
            
        }
    }
        
    export class Floor {
    
        public valid: boolean = false; //content of the forecast is valid
        
        
    }
    
    export class Room {
    
        public valid: boolean = false; //content of the forecast is valid
        
        
    }    
}