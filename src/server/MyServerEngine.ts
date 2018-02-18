import { ServerEngine } from 'lance-gg';
import { MyGameEngine } from 'Common/MyGameEngine';
import { Player } from 'Common/Player';
import { Bomb } from 'Common/Bomb';
import * as _ from 'lodash';
import * as shortid from 'shortid';

export class MyServerEngine extends ServerEngine {

    gameEngine: MyGameEngine;

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
        this.serializer.registerClass(Player);
        this.serializer.registerClass(Bomb);
    }

    start() {
        super.start();
    }

    updateMap() {
        this.gameEngine.newMap();
        _.delay(() => {
            this.io.sockets.emit('mapUpdate', this.gameEngine.map);
        }, 1000);
    }
    
    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);
        this.gameEngine.addPlayer(socket.playerId);
        this.updateMap();
    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);
        delete this.gameEngine.world.objects[playerId];
    }

}
