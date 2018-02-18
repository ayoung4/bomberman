import { serialize } from 'lance-gg';

interface IPlayerScheme extends serialize.IINetScheme { }

export class Player extends serialize.DynamicObject<IPlayerScheme> {

    playerId: string;
    class: typeof Player;

    constructor(id, position, velocity) {
        super(id, position, velocity);
        this.class = Player;
    };

}
