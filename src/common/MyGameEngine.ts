import { serialize, GameEngine } from 'lance-gg';
import { Player } from 'Common/Player';
import { Bomb } from 'Common/Bomb';
import * as _ from 'lodash';
import * as shortid from 'shortid';


export class MyGameEngine extends GameEngine {

    map: number[][];

    constructor(options) {
        super(options);
    }

    start() {

        super.start();

        this.worldSettings = {
            width: 40,
            height: 40,
        };

        this.map = [];

        this.newMap();
    }

    step(isReenact, t, dt) {

        super.step(isReenact, t, dt);

    }

    newMap() {
        this.map = []
        for (let x = 0; x < this.worldSettings.height; x++) {
            this.map.push([]);
            for (let y = 0; y < this.worldSettings.width; y++) {
                if (x === 0 || x === this.worldSettings.height - 1
                    || y === 0 || y === this.worldSettings.width - 1) {
                    this.map[x].push(1);
                } else {
                    this.map[x].push(0);
                }
            }
        }
    }

    addPlayer(playerId: string) {

        const position = new serialize.TwoVector(_.random(this.worldSettings.width), _.random(this.worldSettings.height));
        const velocity = new serialize.TwoVector(0, 0);
        const player = new Player(this.world.idCount++, position, velocity);
        player.playerId = playerId;

        this.world.idCount++;

        this.addObjectToWorld(player);
        console.log(`player added: ${player.id} ${player.playerId}`);

        return player;

    }

    addBomb(playerId: string) {

        const player = this.world.getPlayerObject<Player>(playerId);

        const position = new serialize.TwoVector(player.position.x, player.position.y);
        const velocity = new serialize.TwoVector(0, 0);
        const bomb = new Bomb(shortid.generate(), playerId, position, velocity);

        this.addObjectToWorld(bomb);
        console.log(`bomb added: ${bomb.id}`);

        _.delay(() => this.removeBomb(bomb.id), 1000);

        return bomb;

    }

    removeBomb(bombId) {

        if (this.world.objects[bombId]) {
            console.log('removing bomb', this.world.objects[bombId].id);
            this.removeObjectFromWorld(bombId);
        }

    }

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        const player = this.world.getPlayerObject<Player>(playerId);

        if (player) {

            if (inputData.input === 'up') {
                player.position.y -= 1;
            } else if (inputData.input === 'down') {
                player.position.y += 1;
            } else if (inputData.input === 'right') {
                player.position.x += 1;
            } else if (inputData.input === 'left') {
                player.position.x -= 1;
            } else if (inputData.input === 'space') {
                this.addBomb(player.id);
            }

        }
    }
}