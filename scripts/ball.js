export default class Ball {
    constructor(html) {
        this.html = html;
        this.leftPosition = 390;
        this.topPosition = 215;
        [this.xVelocity, this.yVelocity] = [5, 0];
    }

    draw() {
        this.html.style.left = this.leftPosition + 'px';
        this.html.style.top = this.topPosition + 'px';
    }

    update(progress) {
        this.leftPosition += this.xVelocity * progress;
        this.topPosition += this.yVelocity * progress;

        if (this.leftPosition >= 600 || this.leftPosition <= 0)
            this.xVelocity = -this.xVelocity;
    }
}