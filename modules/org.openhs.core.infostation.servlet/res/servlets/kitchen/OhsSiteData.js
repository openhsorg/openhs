var OhsSiteData;
(function (OhsSiteData) {
    var SiteData = (function () {
        function SiteData() {
            this.floors = new Array();
        }
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
        SiteData.prototype.setFloorItem = function (num, data) {
            if (num + 1 > this.floors.length) {
                this.setNumberFloors(num + 1);
            }
            //this.floors[num].setWeather(data);
        };
        SiteData.prototype.getFloor = function (num) {
            if (num + 1 <= this.floors.length) {
                return this.floors[num];
            }
            else {
                return new Floor();
            }
        };
        SiteData.prototype.setSiteData = function (data) {
            var numberFloors = parseInt(data['number_floors']);
            this.setNumberFloors(numberFloors);
        };
        return SiteData;
    }());
    OhsSiteData.SiteData = SiteData;
    var Floor = (function () {
        function Floor() {
            this.valid = false; //content of the forecast is valid
        }
        return Floor;
    }());
    OhsSiteData.Floor = Floor;
    var Room = (function () {
        function Room() {
            this.valid = false; //content of the forecast is valid
        }
        return Room;
    }());
    OhsSiteData.Room = Room;
})(OhsSiteData || (OhsSiteData = {}));
