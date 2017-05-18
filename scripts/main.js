'use strict';
import Game from './game';

let game;
document.addEventListener('keypress', e => {
    const spaceKey = 32;
    if (e.which === spaceKey && (game == null || !game.inProgress)) {
        game = new Game();
        requestAnimationFrame(currentTime => game.mainLoop(currentTime));
    }
})
