define(() => {
    class Arc {
        constructor (color, cx, cy, radius, start, end, anticlockwise, segments) {
            let graphics = game.add.graphics(cx, cy);
            graphics.lineStyle(0);
            graphics.beginFill(color);
            graphics.arc(cx, cy, radius, start + (start - end) / segments, end, anticlockwise, segments + 1);
            graphics.endFill();
            graphics.boundsPadding = 0;

            let sprite = game.add.sprite(0, 0, null);
            sprite.addChild(graphics);

            this.sprite = sprite;
            this.graphics = graphics;

            this.start = end;
            this.end = start;
        }

        destroy () {
            this.sprite.destroy();
        }

        // return object with end and start fields which match following conditions:
        // (-PI2, PI2) and [0, PI2) contain end and start respectively;
        // end and start points match some of segPoints each one;
        // start > end;
        // [end, start] sector does not overlap avatar;
        // equalDist defines if it is possible to create sector that has equal left-
        // and right-side distances from avatar (if true)
        static getAngles (segProbs, equalDist) {
            const a = game.action,
                segPoints = a.arcs.segPoints,
                PI2 = 2 * Math.PI;

            let avtAngle = (a.groups.avatar.rotation
                + Phaser.Math.degToRad(90)
                - a.groups.arcs.rotation)
                % PI2;
            if (avtAngle < 0) avtAngle += PI2;

            let lowerBound,
                upperBound,
                i = 0;

            while (segPoints[i] <= avtAngle)
                lowerBound = i++;

            upperBound = lowerBound + 1
                + (segPoints[lowerBound] !== avtAngle);
            lowerBound--;

            let idx = Math.floor(Math.random() * segProbs.length);
            let segAmount = parseInt(segProbs[idx]);        //has to belong [1..7]

            let startPoint = segPoints.length - 1 - segAmount,      //last start point
                startPoints = [];

            while (startPoint >= upperBound) {
                startPoints.push(startPoint);
                if (!equalDist
                    && Math.abs(2 * startPoint + segAmount - upperBound - lowerBound - 12) < 2)
                    startPoints.pop();
                startPoint--;
            }

            if (segPoints[lowerBound] >= 0) {
                startPoint = lowerBound - segAmount;
                while (startPoint + segAmount >= 11
                    && startPoint >= upperBound - 12) {
                    startPoints.push(startPoint);
                    if (!equalDist
                        && Math.abs(lowerBound + upperBound - 2 * startPoint - segAmount - 12) < 2)
                        startPoints.pop();
                    startPoint--;
                }
            }

            idx = Math.floor(Math.random() * startPoints.length);

            return {
                end: segPoints[startPoints[idx]],
                start: segPoints[startPoints[idx] + segAmount]
            }
        }
    }

    return Arc;
});