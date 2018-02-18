import { serialize } from 'lance-gg';

interface IBombScheme extends serialize.IINetScheme { }

export class Bomb extends serialize.DynamicObject<IBombScheme> {

    class: typeof Bomb;
    ownerId: string;

    constructor(id, ownerId, position, velocity) {
        super(id, position, velocity);
        this.class = Bomb;
        this.ownerId = ownerId;
    };

    // get netScheme() {
    //     return Object.assign({
    //         age: { type: serialize.Serializer.TYPES.INT32 },
    //     }, super.netScheme);
    // }


}
