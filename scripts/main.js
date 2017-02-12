'use strict';
import Game from './game';

document.addEventListener('keypress', e => {
    const spaceKey = 32;
    if (e.which === spaceKey) new Game();
})
