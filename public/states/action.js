define([
        'states/actionClasses/Crab',
        'states/actionClasses/Arc',
        'states/actionClasses/GameArc',
        'states/actionClasses/Avatar',
        'states/actionClasses/EquilateralFigure',
        'states/actionClasses/ColorSwapper',
        'states/actionClasses/CountPointer',
        'states/shared/NavigationMenu',
        'states/levels/0',
        'states/levels/1',
        'states/levels/2'
    ], (Crab, Arc, GameArc, Avatar, EqFigure, ColorSwapper, CountPointer, NavMenu, ...levels) => {
    let a,
        glRadius,
        glScale,
        crabDefaults,
        defaults,
        PI,
        PI2,
        cosPId5,
        sqrt2;

    class Action {
        init () {
            a = game.action;

            a.groups = {};
            a.arcs = {};
            a.arcs.segRad = Math.PI / 6;
            a.arcs.segPoints = [];
            a.arcs.queue = [];
            a.back = {};
            a.score = {};
            a.start = {};
            a.pause = {};
            a.end = {};

            glRadius = game.globals.radius;
            glScale = game.globals.scaleCoeff;

            crabDefaults = {
                fRotationSpeed: 0.025,
                bRotationSpeed: 0.025,
                cAnimSpeed: 100
            };

            defaults = {
                mainRotationSpeed: 0.0,
                arcsRotationSpeed: -0.005,
                arcLifeSpan: 7000,
                arcKillTime: 150,
                arcColor: 0x7d4ace,
                segProbs: '3',
                equalDist: false,
                avtReactionTime: 200,
                bPentagonRSpeed: 0,
                bSquareRSpeed: 0.005,
                bTriangleRSpeed: - 0.008,
                bCircleColor: 0x262626,
                bCircleLight: 0x939393,
                wrapCircleRotationSpeed: 0.0
            };

            PI = Math.PI;
            PI2 = 2 * Math.PI;
            cosPId5 = Math.cos(PI / 5);
            sqrt2 = Math.sqrt(2);

            game.time.advancedTiming = true;
        }

        create() {
            console.log('entering action state');

            a.level = getLevel();
            if (!levels[a.level].add.released) {
                this.state.start('comingsoon');
                return;
            }
            a.arcs.maxArcs = levels[a.level].add.maxArcs;

            this.stage.backgroundColor = 0x212223;

            a.groups.wrapCircle = this.add.group();
            a.groups.wrapCircle.x = this.world.centerX;
            a.groups.wrapCircle.y = this.world.centerY;

            let wc = a.back.wrapCircle = new ColorSwapper(
                createGapCircle(glRadius * 1.2, 10, PI / 5, glRadius / 3, 0xffffff, 1, 40)
                , createGapCircle(glRadius * 1.2, 10, PI / 5, glRadius / 3, 0xffffff, 1, 40)
                , 0xaaaaaa);
            a.groups.wrapCircle.add(wc.sprite);
            a.groups.wrapCircle.add(wc.nextSprite);

            let countPointer = new CountPointer(a.arcs.maxArcs, 1.6, glRadius * 1.03, 0x333333);
            a.arcs.countPointer = countPointer;
            a.groups.countPointer = this.add.group();
            a.groups.countPointer.x = this.world.centerX;
            a.groups.countPointer.y = this.world.centerY;
            a.groups.countPointer.add(countPointer.sprite);
            a.groups.countPointer.rotation = 0.8;

            let maxCountPointer = new CountPointer(0, 0, glRadius * 1.03, 0x333333);
            a.arcs.maxCountPointer = maxCountPointer;
            a.groups.maxCountPointer = this.add.group();
            a.groups.maxCountPointer.x = this.world.centerX;
            a.groups.maxCountPointer.y = this.world.centerY;
            maxCountPointer.sprite.x = - glRadius * 2.13;
            a.groups.maxCountPointer.add(maxCountPointer.sprite);
            a.groups.maxCountPointer.rotation = PI - 0.8;

            let minCountPointer = new CountPointer(0, 0, glRadius * 1.03, 0x333333);
            a.arcs.minCountPointer = minCountPointer;
            a.groups.minCountPointer = this.add.group();
            a.groups.minCountPointer.x = this.world.centerX;
            a.groups.minCountPointer.y = this.world.centerY;
            minCountPointer.sprite.x = - glRadius * 2.13;
            a.groups.minCountPointer.add(minCountPointer.sprite);
            a.groups.minCountPointer.rotation = PI + 0.8;

            a.groups.wrapCircle.rSpeed = defaults.wrapCircleRotationSpeed;

            a.groups.main = this.add.group();
            a.groups.main.x = this.world.centerX;
            a.groups.main.y = this.world.centerY;
            a.groups.main.rSpeed = defaults.mainRotationSpeed;

            a.groups.back = game.add.group();
            a.back.hexagon = new EqFigure(6, glRadius, 0x333333);
            let radius = glRadius * (905 / 1080);
            a.back.pentagon = new EqFigure(5, radius, 0x666666);
            radius = radius * cosPId5;
            a.back.square = new EqFigure(4, radius, 0x999999);
            radius /= sqrt2;
            a.back.triangle = new EqFigure(3, radius, 0xcccccc);

            a.back.pentagon.rSpeed = defaults.bPentagonRSpeed;
            a.back.square.rSpeed = defaults.bSquareRSpeed;
            a.back.triangle.rSpeed = defaults.bTriangleRSpeed;

            a.groups.back.add(a.back.hexagon.sprite);
            a.groups.back.add(a.back.pentagon.sprite);
            a.groups.back.add(a.back.square.sprite);
            a.groups.back.add(a.back.triangle.sprite);
            a.groups.main.add(a.groups.back);

            a.groups.arcs = this.add.group();
            a.groups.arcs.rSpeed = defaults.arcsRotationSpeed;
            a.groups.main.add(a.groups.arcs);

            a.crab = new Crab(crabDefaults);
            a.crab.anim.pivot.x = 0;
            a.crab.anim.pivot.y = - Math.floor(glRadius / glScale);

            a.groups.crab = this.add.group();
            a.groups.crab.add(a.crab.anim);
            a.groups.main.add(a.groups.crab);

            a.crab.group = a.groups.crab;

            a.avatar = new Avatar(defaults.avtReactionTime);

            a.groups.avatar = this.add.group();
            a.groups.avatar.add(a.avatar.sprite);
            a.groups.main.add(a.groups.avatar);

            a.avatar.group = a.groups.avatar;

            const BCThickness = glRadius * 0.162,
                BCRadius = glRadius - BCThickness / 2,
                circle = new ColorSwapper(
                    createGapCircle(BCRadius, 0, 0, BCThickness, 0xffffff)
                    , createGapCircle(BCRadius, 0, 0, BCThickness, 0xffffff)
                    , defaults.bCircleColor
                );
            a.back.circle = circle;

            const circleUnderlayer = createGapCircle(BCRadius, 0, 0, BCThickness, 0x666666);
            const CUSprite = game.add.sprite(0, 0, null);
            CUSprite.addChild(circleUnderlayer);
            a.groups.main.add(CUSprite);
            a.groups.main.add(circle.sprite);
            a.groups.main.add(circle.nextSprite);

            a.back.circleLight = new ColorSwapper(
                createGapCircle(BCRadius, 4, PI2 / 12, BCThickness * 0.514, 0xffffff)
                , createGapCircle(BCRadius, 4, PI2 / 12, BCThickness * 0.514, 0xffffff)
                , defaults.bCircleLight);
            a.groups.main.add(a.back.circleLight.sprite);
            a.groups.main.add(a.back.circleLight.nextSprite);

            let style = {
                font: `${Math.floor(radius * 0.5)}px Corbel`,
                fill: '#222222',
                align: 'center'
            };
            a.score.resolved = 0;
            a.score.text = game.add.text(game.world.centerX, game.world.centerY, `0`, style);
            a.score.text.anchor.set(0.5, 0.5);

            style = {
                font: `${Math.floor(radius)}px Xirod`,
                fill: '#eeeeee',
                align: 'center'
            };
            a.start.text = game.add.text(game.world.centerX, game.world.centerY, `start`, style);
            a.start.text.anchor.set(0.5, 0.5);
            a.start.text.alpha = 0;
            a.start.tween = game.add.tween(a.start.text).from({ alpha: 0.9 }, 500, Phaser.Easing.Linear.None, false);

            a.cursors = game.input.keyboard.createCursorKeys();
//--pause--------------------------------------------------------------------------------------------
            a.pause.invoker = game.input.keyboard.addKey(Phaser.Keyboard['ESC']);
            a.pause.accepter = game.input.keyboard.addKey(Phaser.Keyboard['ENTER']);
            a.pause.active = false;

            a.pause.shadowLayer = createFiller(0x222222);
            a.pause.shadowLayer.alpha = 0;

            let resume,
                resumeOnClick;
            resumeOnClick = () => {
                a.pause.active = false;
                game.paused = a.pause.active;
            };
            resume = game.add.button(game.world.centerX, game.world.centerY - glRadius * 0.3, 'resume', resumeOnClick);
            resume.anchor.setTo(0.5, 0.5);
            resume.scale.setTo(glScale, glScale);

            let retry,
                retryOnClick;
            retryOnClick = () => {
                a.pause.active = false;
                game.paused = a.pause.active;
                game.state.restart();
            };
            retry = game.add.button(game.world.centerX, resume.bottom + resume.height * 0.75, 'retry', retryOnClick);
            retry.anchor.setTo(0.5, 0.5);
            retry.scale.setTo(glScale, glScale);

            let mainMenu,
                mainMenuOnClick;
            mainMenuOnClick = () => {
                a.pause.active = false;
                game.paused = a.pause.active;
                game.state.start('menu');
            };
            mainMenu = game.add.button(game.world.centerX, retry.bottom + retry.height * 0.75, 'menu', mainMenuOnClick);
            mainMenu.anchor.setTo(0.5, 0.5);
            mainMenu.scale.setTo(glScale, glScale);

            a.pause.menu = new NavMenu({
                button: resume,
                startFrame: 0,
                overFrame: 1,       //over frame is used instead of animation when game is paused
                downFrame: 2,
                animation: null,
                onClick: resumeOnClick
            }, {
                button: retry,
                startFrame: 0,
                overFrame: 1,
                downFrame: 2,
                animation: null,
                onClick: retryOnClick
            }, {
                button: mainMenu,
                startFrame: 0,
                overFrame: 1,
                downFrame: 2,
                animation: null,
                onClick: mainMenuOnClick
            });

            a.pause.invoker.onDown.add(() => {
                a.pause.active = !a.pause.active;
                game.paused = a.pause.active;
            });

            game.state.onPausedCallback = () => {
                a.pause.shadowLayer.alpha = 0.7;
                a.pause.menu.open();
            };

            game.state.onResumedCallback = () => {
                a.pause.shadowLayer.alpha = 0;
                a.pause.menu.close();
            };

            game.state.onPauseUpdateCallback = () => {
                if (a.pause.active) {
                    if (a.cursors.down.justDown
                        && a.cursors.down.isDown)
                        a.pause.menu.nextState();
                    if (a.cursors.up.justDown
                        && a.cursors.up.isDown)
                        a.pause.menu.prevState();
                    if (a.pause.accepter.justDown
                        && a.pause.menu.state !== -1)
                        a.pause.menu.onClick();
                }

                let s = 2.5;
                a.groups.wrapCircle.rotation += a.groups.wrapCircle.rSpeed / s;
                a.back.pentagon.sprite.rotation += a.back.pentagon.rSpeed / s;
                a.back.square.sprite.rotation += a.back.square.rSpeed / s;
                a.back.triangle.sprite.rotation += a.back.triangle.rSpeed / s;
            };
//--gameEnd------------------------------------------------------------------------------------------
            a.end.state = false;

            retry = game.add.button(game.world.centerX, game.world.centerY + retry.height / 1.5, 'retry', retryOnClick);
            retry.anchor.setTo(0.5, 0.5);
            retry.scale.setTo(glScale, glScale);

            mainMenu = game.add.button(game.world.centerX, retry.bottom + mainMenu.height * 0.6, 'menu', mainMenuOnClick);
            mainMenu.anchor.setTo(0.5, 0.5);
            mainMenu.scale.setTo(glScale, glScale);

            a.end.menu = new NavMenu({
                button: retry,
                startFrame: 0,
                overFrame: 1,
                downFrame: 2,
                animation: null,
                onClick: retryOnClick
            }, {
                button: mainMenu,
                startFrame: 0,
                overFrame: 1,
                downFrame: 2,
                animation: null,
                onClick: mainMenuOnClick
            });
//---------------------------------------------------------------------------------------------------
            let i = - PI2 + a.arcs.segRad;
            while (i < PI2 - a.arcs.segRad / 2) {
                a.arcs.segPoints.push(i);
                i += a.arcs.segRad;
            }

            a.arcs.segProbs = defaults.segProbs;
            a.arcs.equalDist = defaults.equalDist;
            a.arcs.lifeSpan = defaults.arcLifeSpan;
            a.arcs.killTime = defaults.arcKillTime;
            a.arcs.color = defaults.arcColor;
            a.arcs.total = 0;

            game.time.events.add(1000, () => {
                let angles = Arc.getAngles(a.arcs.segProbs, a.arcs.equalDist);
                createArc(a.arcs.lifeSpan, a.arcs.color, 0, 0, glRadius, angles.start, angles.end, true, 12);
            });
        }

        update () {
            if (!levels[a.level].add.released)
                return;

            a.crab.curAnim = 2;

            if (a.cursors.right.isDown) {
                if (a.crab.prevAnim !== 0) {
                    a.crab.anim.playAnimationById(0);
                    a.crab.anim.setAnimationSpeedPercent(a.crab.bAnimSpeed);
                }
                a.crab.curAnim = 0;
                a.groups.crab.rotation -= a.crab.bRotationSpeed;

            } else if (a.cursors.left.isDown) {
                if (a.crab.prevAnim !== 1) {
                    a.crab.anim.playAnimationById(1);
                    a.crab.anim.setAnimationSpeedPercent(a.crab.fAnimSpeed);
                }
                a.crab.curAnim = 1;
                a.groups.crab.rotation += a.crab.fRotationSpeed;

            } else if (a.crab.prevAnim !== a.crab.curAnim) {
                a.crab.anim.playAnimationById(2);
                a.crab.anim.setAnimationSpeedPercent(a.crab.cAnimSpeed);
            }

            a.crab.prevAnim = a.crab.curAnim;

            if (a.end.occured) {
                if (a.cursors.down.justDown
                    && a.cursors.down.isDown)
                    a.end.menu.nextState();
                if (a.cursors.up.justDown
                    && a.cursors.up.isDown)
                    a.end.menu.prevState();
                if (a.end.accepter.justDown
                    && a.end.menu.state !== -1)
                    a.end.menu.onClick();
            }

            a.groups.countPointer.rotation -= a.arcs.countPointer.instantSpeed(a.arcs.queue.length);
            a.groups.wrapCircle.rotation += a.groups.wrapCircle.rSpeed;
            a.groups.main.rotation += a.groups.main.rSpeed;
            a.groups.arcs.rotation += a.groups.arcs.rSpeed;
            a.back.pentagon.sprite.rotation += a.back.pentagon.rSpeed;
            a.back.square.sprite.rotation += a.back.square.rSpeed;
            a.back.triangle.sprite.rotation += a.back.triangle.rSpeed;

            if (!a.avatar.started)
                a.avatar.group.rotation = a.crab.group.rotation;

            if (a.avatar.actionPhase && !a.end.occured) {
                if (a.avatar.direction === 'clockwise')
                    a.avatar.group.rotation += a.crab.fRotationSpeed;
                else if (a.avatar.direction === 'counter-clockwise')
                    a.avatar.group.rotation -= a.crab.bRotationSpeed;

                if (a.avatar.checkQueueArc(a.arcs.queue.length - 1))
                    a.avatar.resolve();
            }

            a.crab.anim.updateAnimation();

            if (!a.end.occured) {
                tryResolve();
                tryEnd();
            }
        }

        render () {
            game.debug.text(`${game.time.fps}`, 10, 20);
        }
    }

    function getLevel () {
        return game.levels.current;
    }

    function createArc(lifeSpan, ...arcArgs) {
        let arc = new GameArc(lifeSpan, ...arcArgs);
        a.arcs.queue.push(arc);
        a.groups.arcs.add(arc.sprite);
    }

    function tryResolve () {
        if (!a.arcs.queue.length) return;
        if (!a.crab.checkQueueArc(0)) return;

        a.score.text.text = `${++a.score.resolved}`;

        if (a.arcs.queue.length === 1) {
            if (!a.avatar.started) {
                a.avatar.started = true;
                a.start.tween.start();
            }
            a.avatar.group.rotation = a.crab.group.rotation;
            game.time.events.remove(a.avatar.event);
            a.avatar.resolve();
        }

        a.arcs.queue[0].destroy();
        a.arcs.queue.shift();

        if (a.arcs.queue.length) tryResolve();
    }

    function tryEnd () {
        if (a.arcs.queue.length <= a.arcs.maxArcs) return;

        a.end.occured = true;

        game.state.onPausedCallback = null;

        game.state.onResumedCallback = null;

        game.state.onPauseUpdateCallback = null;

        a.pause.invoker.onDown.removeAll();

        a.score.text.text = '';
        a.end.menu.open();

        a.end.accepter = a.pause.accepter;

        let size = Math.floor(glRadius * 0.2);
        a.end.text = game.add.bitmapText(game.world.centerX, game.world.centerY - glRadius * 0.3 - size
            , 'pixel-font', 'Game over!', size);
        a.end.text.anchor.setTo(0.5, 0.5);

        a.end.text = game.add.bitmapText(game.world.centerX, game.world.centerY - glRadius * 0.2
            , 'pixel-font', `Score : ${a.score.resolved}`, size);
        a.end.text.anchor.setTo(0.5, 0.5);
    }

    function createGapCircle (radius, gapsCount, gapsLength, thickness, color, alpha = 1, segments = 25) {
        let graphics = game.add.graphics(0, 0);

        let end,
            start;

        graphics.lineStyle(thickness, color, alpha);
        let gapLength = gapsLength / gapsCount,
            segLength = (PI2 - gapsLength) / gapsCount;
            i = 0;

        if (gapsCount === 0) {
            segLength = PI2;
            start = PI2;
            end = 0;
            segments = 110;
            graphics.arc(0, 0, radius, start + (start - end) / segments, end, true, segments + 1);
        }

        while (i++ < gapsCount) {
            end = i * (gapLength + segLength);
            start = segLength + i * (gapLength + segLength);
            graphics.arc(0, 0, radius, start + (start - end) / segments, end, true, segments + 1);
        }

        graphics.boundsPadding = 0;

        return graphics;
    }

    function createFiller (color) {
        let sprite = game.add.sprite(0, 0, null);

        let rect = game.add.graphics(0, 0);
        rect.beginFill(color);
        rect.drawRect(0, 0, game.width, game.height);
        rect.endFill();
        rect.boundsPadding = 0;

        sprite.addChild(rect);

        return sprite;
    }

    return Action;
});