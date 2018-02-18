import { ClientEngine } from 'lance-gg';
import { MyRenderer } from 'Client/MyRenderer';
import { MyGameEngine } from 'Common/MyGameEngine';
import { Controller } from 'Client/Controller';

import { Player } from 'Common/Player';
import { Bomb } from 'Common/Bomb';

export class MyClientEngine extends ClientEngine {

    renderer: MyRenderer;
    gameEngine: MyGameEngine;
    private controller: Controller;

    constructor(gameEngine, options) {

        super(gameEngine, options, MyRenderer);
        
        this.serializer.registerClass(Player);
        this.serializer.registerClass(Bomb);
        
        this.gameEngine.on('client__preStep', this.preStep.bind(this));
        
        this.controller = new Controller();

    }

    connect() {

        return super.connect().then(() => {

            this.socket.on('mapUpdate', (e) => {
                this.gameEngine.map = e;
                this.renderer.setReady();
            });
            
        });
        
    }

    preStep() {

        if (this.controller.keyStates.up.isDown) {
            this.sendInput('up', { movement: true });
        }

        if (this.controller.keyStates.down.isDown) {
            this.sendInput('down', { movement: true });
        }

        if (this.controller.keyStates.left.isDown) {
            this.sendInput('left', { movement: true });
        }

        if (this.controller.keyStates.right.isDown) {
            this.sendInput('right', { movement: true });
        }

        if (this.controller.keyStates.space.isDown) {
            this.sendInput('space', { movement: true });
        }

    }

}