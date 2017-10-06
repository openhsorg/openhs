import {Thing} from './Thing';
import {Room} from './Room';

export class Floor extends Thing {

    public imagePath            = '/infores/servlets/kitchen/room_default.png';

    public dimX                 = 0.0;
    public dimY                 = 0.0;

    // Rooms belongs to this floor...
    public m_roomArray:             Array <Room> = null;

}
