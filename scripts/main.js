'use strict';
import Game from './game';

let game;
document.addEventListener('keypress', e => {
    const spaceKey = 32;
    if (e.which === spaceKey) {
        game = new Game();
        requestAnimationFrame(game.mainLoop);
    }
})
