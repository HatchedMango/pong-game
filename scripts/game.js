import Player from './player';

export default class Game {
    constructor() {
        const player = new Player(document.getElementsByClassName('left-player')[0]);
    }
}
