export default class Ball {
    constructor(speed, html) {
        this.html = html;
        this.radius = 10;

        if (Math.random() > 0.5) speed *= -1;
        [this.xCoord, this.yCoord] = [400, 225];
        [this.xVelocity, this.yVelocity] = [speed, Math.random() * speed * ((Math.random() > 0.5) ? 1 : -1) * 0.7];
    }

    get leftXCoord() {
        return this.xCoord - this.radius;
    }

    get rightXCoord() {
        return this.xCoord + this.radius;
    }

    get topYCoord() {
        return this.yCoord - this.radius;
    }

    get bottomYCoord() {
        return this.yCoord + this.radius;
    }

    get approachingOpponentPaddle() {
        return (this.xVelocity > 0 && this.xCoord > 300) ||
               (this.xVelocity < 0 && this.xCoord > 700);
    }

    get deproachingOpponentPaddle() {
        return this.xVelocity < 0 && this.xCoord < 700;
    }

    get notExceedYVelocity() {
        return Math.abs(this.yVelocity) <= Math.abs(this.xVelocity * 1.5);
    }

    draw() {
        this.html.style.left = this.leftXCoord + 'px';
        this.html.style.top = this.topYCoord + 'px';
    }

    update(progress) {
        this.xCoord += this.xVelocity * progress;
        this.yCoord -= this.yVelocity * progress;
    }

    switchHorizontalDirection() {
        this.xVelocity = -this.xVelocity;
    }

    switchVerticalDirection() {
        this.yVelocity = -this.yVelocity;
    }
}
