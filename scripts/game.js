import Player from './player';
import Opponent from './opponent';
import Ball from './ball';

const paddleSpeed = 0.35, ballSpeed = 0.5;
const minFrameTime = 14; // set just faster than 60fps
const topWall = 5, bottomWall = 445,
      leftWall = 0, rightWall = 800;

export default class Game { 
    constructor() {
        this.player = new Player(paddleSpeed, document.getElementsByClassName('left-player')[0]);
        this.opponent = new Opponent(paddleSpeed, document.getElementsByClassName('right-player')[0]);
        this.ball = new Ball(ballSpeed, document.getElementsByClassName('ball')[0]);
        this.inProgress = true;
        this.lastRender = -1;
        this.timeInFrame = 0;

        document.getElementsByClassName('instructions')[0].style.display = 'none';
    }

    mainLoop(currentTime) {
        if (this.lastRender === -1)
            this.lastRender = currentTime;

        this.timeInFrame += currentTime - this.lastRender;

        if (this.timeInFrame > minFrameTime) {
            this.player.update(this.timeInFrame, topWall, bottomWall);
            this.opponent.update(this.timeInFrame, topWall, bottomWall, this.getBallMovementData());
            this.ball.update(this.timeInFrame);

            this.player.draw();
            this.ball.draw();
            this.opponent.draw();

            this.handleIntersect();

            this.handleEndGame();

            this.timeInFrame = 0;
        }

        this.lastRender = currentTime;
        window.requestAnimationFrame(currentTime => this.mainLoop(currentTime));
    }

    getBallMovementData() {
        return { 
            approachingPaddle: this.ball.approachingOpponentPaddle,
            deproachingPaddle: this.ball.deproachingOpponentPaddle,
            verticalPosition: this.ball.yCoord
        };
    }

    handleIntersect() {
        let verticalChange = Math.abs(this.ball.xVelocity) * 0.25;

        if (this.ballIntersectLeftPaddle()) {
            if (this.player.upKeyPressed && this.ball.notExceedYVelocity)
                this.ball.yVelocity += verticalChange;
            if (this.player.downKeyPressed  && this.ball.notExceedYVelocity)
                this.ball.yVelocity -= verticalChange;
            this.ball.switchHorizontalDirection();
        }

        if (this.ballIntersectRightPaddle()) {
            if (this.opponent.reasonToMoveUp && this.ball.notExceedYVelocity)
                this.ball.yVelocity += verticalChange;
            if (this.opponent.reasonToMoveDown && this.ball.notExceedYVelocity)
                this.ball.yVelocity -= verticalChange;
            this.ball.switchHorizontalDirection();
        }

        if (this.ball.topYCoord <= topWall || this.ball.bottomYCoord >= bottomWall)
            this.ball.switchVerticalDirection();
    }

    ballIntersectLeftPaddle() {
        return this.ball.leftXCoord <= this.player.hitLine.xCoord &&
               this.ball.yCoord >= this.player.yCoord - 5 && 
               this.ball.yCoord <= this.player.yCoord + this.player.hitLine.length + 5;
    }

    ballIntersectRightPaddle() {
        return this.ball.rightXCoord >= this.opponent.hitLine.xCoord && 
               this.ball.yCoord >= this.opponent.yCoord - 5 && 
               this.ball.yCoord <= this.opponent.yCoord + this.opponent.hitLine.length + 5;
    }

    handleEndGame() {
        if (this.ball.leftXCoord <= leftWall || 
            this.ball.rightXCoord >= rightWall) {
            delete this.ball;
            document.getElementsByClassName('instructions')[0].style.display = 'block';
            this.inProgress = false;
        }
    }
}
