
export class KidEvents {

    public goToSchool = false;
    public bathTime = false;
    public sleepTime = false;
    public lunchTime = false;

    fillFromJSON(json: any) {

            for (var propName in json) {
                this[propName] = json[propName];
            }
    }

}