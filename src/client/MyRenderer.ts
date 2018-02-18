import { render } from 'lance-gg';
import { MyGameEngine } from 'Common/MyGameEngine';
import * as _ from 'lodash';
import * as p5 from 'p5';

const RES = 10;


declare class p5Sketch {
    setup();
    draw();
    mousePressed(): void;
    createCanvas(w: number, h: number): void;
    background(r: number, g?: number, b?: number, a?: number): void;
    clear(): void;
    colorMode(mode: 'RGB' | 'HSB' | 'HSL', m1?: number, m2?: number, m3?: number, mA?: number): void;
    fill(r: number, g?: number, b?: number, a?: number): void;
    noFill(): void;
    noStroke(): void;
    stroke(r: number, g: number, b: number, a: number): void;
    arc(a: number, b: number, c: number, d: number, start: number, stop: number, mode?: 'OPEN' | 'CHORD' | 'PIE'): void;
    rect(x: number, y: number, w: number, h: number): void;
    ellipse(x: number, y: number, w: number, h: number): void;
    // TODO: complete typings
}

export class MyRenderer extends render.Renderer {

    renderer: p5Sketch;
    gameEngine: MyGameEngine;
    ready: boolean

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.ready = false;
    }

    setReady() {
        this.renderer = new p5((sketch) => {
            this.renderer = sketch;
            sketch.setup = () => {
                sketch.createCanvas(this.gameEngine.map.length * RES, this.gameEngine.map[0].length * RES);
            }
        });
        this.ready = true;
    }

    draw() {
        super.draw();
        if (this.ready) {
            this.drawTiles(this.gameEngine.map);
            const gameObjects = this.gameEngine.world.forEachObject((id, obj: any) => {
                this.renderer.fill(255, 0, 0);
                this.renderer.noStroke();
                this.renderer.rect(obj.position.x * RES, obj.position.y * RES, RES, RES);
            });
        }
    }

    drawTiles(tiles: number[][]) {
        _.forEach(tiles, (row, x) => {
            _.forEach(row, (tile, y) => {
                if (tiles[x][y]) {
                    this.renderer.fill(0);
                } else {
                    this.renderer.fill(255);
                }
                this.renderer.noStroke();
                this.renderer.rect(x * RES, y * RES, RES, RES);
            });
        });
    }

}