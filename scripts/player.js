export default class Player {
    constructor(speed, html) {
        this.html = html;
        this.upKeyPressed = false;
        this.downKeyPressed = false;
        this.yCoord = 190;
        this.hitLine = {xCoord: 35, length: 70};
        this.yVelocity = speed;

        document.addEventListener('keydown', e => {
            const upArrow = 38, downArrow = 40;
            if (e.which === upArrow) this.upKeyPressed = true;
            if (e.which === downArrow) this.downKeyPressed = true;
        });
        document.addEventListener('keyup', e => {
            this.upKeyPressed = false;
            this.downKeyPressed = false;
        });
    }

    draw() {
        this.html.style.top = this.yCoord + 'px';
    }

    update(progress, topWall, bottomWall) {
        if (this.upKeyPressed && this.yCoord >= topWall)
            this.yCoord -= this.yVelocity * progress;
        else if (this.downKeyPressed && this.yCoord + this.hitLine.length <= bottomWall)
            this.yCoord += this.yVelocity * progress;
    }
}
