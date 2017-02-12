import Player from './player';
import Ball from './ball';

export default class Game { 
    constructor() {
        this.player = new Player(document.getElementsByClassName('left-player')[0]);
        this.ball = new Ball(document.getElementsByClassName('ball')[0]);
        this.lastRender = 0;
    }

    mainLoop(currentTime) {
        let progress = currentTime - this.lastRender;
        
        this.ball.update(progress);
        this.ball.draw();
        window.requestAnimationFrame(this.mainLoop);
    }
}
