define([
        'states/actionClasses/Arc',
        'states/actionClasses/GameArc',
        'states/actionClasses/ActionStateManager'
    ], (Arc, GameArc, ActionStateManager) => {
    class Avatar {
        constructor (reactionTime, color = 0x22cc22) {
            let graphics = game.add.graphics(0, 0);

            let start = this.headRad / 2,
                end = - start,
                segs = 6,
                anticlockwise = true,
                radius = game.globals.radius;

            graphics.lineStyle(0);
            graphics.beginFill(color);
            graphics.arc(0, 0, radius, start + (start - end) / segs, end, anticlockwise, segs + 1);
            graphics.endFill();
            graphics.boundsPadding = 0;

            this.graphics = graphics;

            this.sprite = game.add.sprite(0, 0, null);
            this.sprite.alpha = 0;                              //0.75;
            this.sprite.addChild(graphics);
            this.sprite.rotation = game.math.degToRad(90);

            this.started = false;
            this.actionPhase = false;
            this.direction = null;

            this.reactionTime = reactionTime;
        }

        checkQueueArc (idx) {
            let a = game.action,
                PI2 = 2 * Math.PI,
                end = a.arcs.queue[idx].end - a.arcs.queue[idx].start;

            let avtAngle = (this.group.rotation
                + game.math.degToRad(90)
                - a.groups.arcs.rotation
                - a.arcs.queue[idx].start)
                % PI2;
            if (avtAngle < 0) avtAngle += PI2;

            return avtAngle >= this.headRad / 2 && avtAngle <= end - this.headRad / 2;
        }

        resolve () {
            let a = game.action,
                PI2 = 2 * Math.PI;

            ActionStateManager.initState(a.arcs.total);

            let angles = Arc.getAngles(a.arcs.segProbs, a.arcs.equalDist);
            createArc(a.arcs.lifeSpan, a.arcs.color, 0, 0, game.globals.radius, angles.start, angles.end, true, 12);

            this.actionPhase = false;

            this.event = game.time.events.add(this.reactionTime, () => {
                this.actionPhase = true;
                this.direction = null;

                let end = angles.start - angles.end,
                    start = 0;

                let avtAngle = (this.group.rotation
                    + game.math.degToRad(90)
                    - a.groups.arcs.rotation
                    - angles.end)
                    % PI2;
                if (avtAngle < 0) avtAngle += PI2;

                let cwTime = -1,
                    counterCwTime = -1;

                if (avtAngle >= this.headRad / 2 && avtAngle <= end - this.headRad / 2) {
                    this.resolve();
                    console.log('included');
                    return;
                }

                if (avtAngle + this.headRad / 2 > end) start = PI2;

                let cwSpeed = a.crab.fRotationSpeed - a.groups.arcs.rSpeed;
                if (cwSpeed <= 0)
                    this.direction = 'counter-clockwise';
                else
                    cwTime = (start + this.headRad / 2 - avtAngle) / cwSpeed;

                if (avtAngle - this.headRad / 2 < 0) end -= PI2;

                let counterCwSpeed = a.crab.bRotationSpeed + a.groups.arcs.rSpeed;
                if (counterCwSpeed <= 0)
                    this.direction = 'clockwise';
                else
                    counterCwTime = (avtAngle + this.headRad / 2 - end) / counterCwSpeed;

                if (!this.direction)
                    if (cwTime < counterCwTime)
                        this.direction = 'clockwise';
                    else
                        this.direction = 'counter-clockwise';
            })
        }

        get headRad () {
           return game.action.crab.headRad;
        }
    }

    function createArc(lifeSpan, ...arcArgs) {
        let arc = new GameArc(lifeSpan, ...arcArgs);
        game.action.arcs.queue.push(arc);
        game.action.groups.arcs.add(arc.sprite);
    }

    return Avatar;
});