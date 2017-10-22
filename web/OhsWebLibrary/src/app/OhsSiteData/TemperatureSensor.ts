import {Thing} from './Thing';
import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';

export class TemperatureSensor extends Thing {

    public temp:  number;

    constructor () {
        super();

        this.temp = 0.0;
    }
}
