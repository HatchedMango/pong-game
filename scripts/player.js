export default class Player {
    constructor(html) {
        this.html = html;

        html.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        const upArrow = 38, downArrow = 40;

        if (e.which === upArrow) this.travelUp();
        if (e.which === downArrow) this.travelDown();
    }

    travelUp() {

    }

    travelDown() {

    }
}
