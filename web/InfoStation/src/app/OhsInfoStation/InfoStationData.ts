
export class InfoStationData {

        public validity                 = false; // content of the forecast is valid
        public tmpInPath                = '';
        public tmpOutPath               = '';

        constructor() {

        }

        fillFromJSON(json: any) {

            for (var propName in json) {
                this[propName] = json[propName];
            }
        }
        
    }