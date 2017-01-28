var OhsSiteData;
(function (OhsSiteData) {
    class SiteData {
        constructor() {
            this.floors = new Array();
        }
        setNumberFloors(num) {
            if (num > this.floors.length) {
                for (var i = this.floors.length; i < num; i++) {
                    this.floors.push(new Floor());
                }
            }
            else if (num < this.floors.length) {
                this.floors.length = num;
            }
        }
        setFloorItem(num, data) {
            if (num + 1 > this.floors.length) {
                this.setNumberFloors(num + 1);
            }
            //this.floors[num].setWeather(data);
        }
        getFloor(num) {
            if (num + 1 <= this.floors.length) {
                return this.floors[num];
            }
            else {
                return new Floor();
            }
        }
        setSiteData(data) {
            var numberFloors = parseInt(data['number_floors']);
            this.setNumberFloors(numberFloors);
        }
    }
    OhsSiteData.SiteData = SiteData;
    class Floor {
        constructor() {
            this.valid = false; //content of the forecast is valid
        }
    }
    OhsSiteData.Floor = Floor;
    class Room {
        constructor() {
            this.valid = false; //content of the forecast is valid
        }
    }
    OhsSiteData.Room = Room;
})(OhsSiteData || (OhsSiteData = {}));
