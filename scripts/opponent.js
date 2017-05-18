export default class Opponent {
    constructor(speed, html) {
        this.html = html;
        this.yCoord = 190;
        this.hitLine = { xCoord: 765, length: 70 };
        this.yVelocity = speed;
    }

    draw() {
        this.html.style.top = this.yCoord + 'px';
    }

    update(progress, topWall, bottomWall, ballMovementData) {
        if (this.reasonToMoveUp(ballMovementData) && this.yCoord >= topWall)
            this.yCoord -= Math.min(this.yVelocity * progress, Math.abs((this.yCoord + 32) - ballMovementData.verticalPosition));
        else if (this.reasonToMoveDown(ballMovementData) && this.yCoord + this.hitLine.length <= bottomWall)
            this.yCoord += Math.min(this.yVelocity * progress, Math.abs(ballMovementData.verticalPosition - (this.yCoord + 38)));
    }

    reasonToMoveUp(bmd) {
        if (bmd.deproachingPaddle && this.yCoord > 225)
            return true;
        if (bmd.approachingPaddle && bmd.verticalPosition < this.yCoord + 32)
            return true;

        return false;
    }

    reasonToMoveDown(bmd) {
        if (bmd.deproachingPaddle && this.yCoord < (225 - this.hitLine.length))
            return true;
        if (bmd.approachingPaddle && bmd.verticalPosition > this.yCoord + 38)
            return true;

        return false;
    }
}
