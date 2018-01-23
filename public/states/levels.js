define([
        'states/shared/NavigationMenu',
        'states/levels/0',
        'states/levels/1',
        'states/levels/2'
    ], (NavMenu, ...levelList) => {
    let l,
        glScale,
        glRadius;

    class Boot {
        init() {
            l = game.levels;

            glScale = game.globals.scaleCoeff;
            glRadius = game.globals.radius;

            l.levelNum = {};
            l.level = {};
            l.arrows = {};

            l.current = 1;
        }

        create() {
            console.log('entering levels state');

            this.stage.backgroundColor = 0x111111;

            let sqW = game.width / 4.5,
                gap = game.width / 30,
                lvlContColor = levelList[l.current].add.lvlContColor,
                numContColor = levelList[l.current].add.numContColor,
                rimThickness = gap / 2,
                size = Math.min((game.height - sqW) / 4, game.width / 12);

            l.header = game.add.bitmapText(this.world.centerX, 0, 'menu-font', 'CHOOSE LEVEL', size);
            l.header.anchor.setTo(0.5, - 0.5);
            l.header.y = 0;
            l.header.tint = 0xe8b15a;

            l.levelNum.container = this.add.sprite(0, this.world.centerY, null);
            l.levelNum.container.addChild(createRect(sqW, sqW, gap, - sqW / 2, numContColor));
            l.levelNum.rim = this.add.sprite(0, this.world.centerY, null);
            l.levelNum.rim.addChild(createRectRim(rimThickness, sqW, sqW, gap, - sqW / 2));

            changeGraphicsColor(l.levelNum.rim.children[0], levelList[l.current].add.numBoundColor);

            l.arrows.container = this.add.sprite(game.width - gap - sqW, this.world.centerY, null);
            l.arrows.container.addChild(createRect(sqW, sqW, 0, - sqW / 2, 0x070707));

            l.arrows.rimUnderlayer = this.add.sprite(game.width - gap - sqW, this.world.centerY, null);
            l.arrows.rimUnderlayer.addChild(createRectRim(rimThickness, sqW, sqW, 0, - sqW / 2));
            l.arrows.rim = this.add.sprite(game.width - gap - sqW, this.world.centerY, null);
            l.arrows.rim.addChild(createRectRim(rimThickness, sqW, sqW, 0, - sqW / 2));
            l.arrows.rim.alpha = 0;
            l.arrows.rimUnderlayer.alpha = 0.5;

            changeGraphicsColor(l.arrows.rimUnderlayer.children[0], 0x9b002e);
            changeGraphicsColor(l.arrows.rim.children[0], 0xffcc00);

            game.add.tween(l.arrows.rim).to({ alpha: 0.7 }, 4000, Phaser.Easing.Linear.None, true, 0, -1, true);

            l.level.container = this.add.sprite(sqW + gap * 1.5, this.world.centerY, null);
            l.level.container.addChild(createRect(game.width - 2 * sqW - 3 * gap, sqW, 0, - sqW / 2, lvlContColor));
            l.level.rim = this.add.sprite(sqW + gap * 1.5, this.world.centerY, null);
            l.level.rim.addChild(createRectRim(rimThickness, game.width - 2 * sqW - 3 * gap, sqW, 0, - sqW / 2));

            changeGraphicsColor(l.level.rim.children[0], levelList[l.current].add.lvlBoundColor);

            l.level.rimTween = game.add.tween(l.level.rim).to({ alpha: 0.2 }, 900, Phaser.Easing.Linear.None, true, 0, -1, true);

            l.textSize = sqW / 3.7;
            l.numSize = sqW / 2;
            l.level.text = game.add.bitmapText(0, 0, 'menu-font', levelList[l.current].add.name.toUpperCase(), l.textSize);
            l.levelNum.text = game.add.bitmapText(0, 0, 'menu-font', l.current < 10 ? '0' + l.current : l.current, l.numSize);
            l.level.container.addChild(l.level.text);
            l.levelNum.container.addChild(l.levelNum.text);

            l.levelNum.text.anchor.setTo(0.5, 0.4);
            l.levelNum.text.x = sqW / 2 + gap * 1.35;
            l.levelNum.text.y = 0;

            l.level.text.anchor.setTo(0.5, 0.5);
            l.level.text.x = (game.width - 2 * sqW - 3 * gap) / 2;

            l.level.text.tint = levelList[l.current].add.lvlTextColor;
            l.levelNum.text.tint = levelList[l.current].add.numTextColor;

            let upOnClick = () => {
                l.down.animations.stop();
                l.up.animations.stop();
                l.down.frame = 0;
                l.up.frame = 0;
                l.up.animations.play('selection');

                if (l.current === 1)
                    l.current = levelList.length - 1;
                else
                    l.current--;
                setLevel(l.current);
            };
            let downOnClick = () => {
                l.down.animations.stop();
                l.up.animations.stop();
                l.down.frame = 0;
                l.up.frame = 0;
                l.down.animations.play('selection');

                if (l.current === levelList.length - 1)
                    l.current = 1;
                else
                    l.current++;
                setLevel(l.current);
            };

            let arwScale = sqW / 709 * 0.7;

            l.up = this.add.button(0, 0, 'up', upOnClick);
            l.up.onClick = upOnClick;
            l.up.scale.setTo(arwScale, arwScale);
            l.up.anchor.setTo(0.5, 1);
            l.up.x = (sqW - 2 * rimThickness) / 2 + rimThickness;
            l.arrows.container.addChild(l.up);

            l.up.animations.add('selection', [1, 0], 8, false);

            l.down = this.add.button(0, 0, 'down', downOnClick);
            l.down.onClick = downOnClick;
            l.down.scale.setTo(arwScale, arwScale);
            l.down.anchor.setTo(0.5, 0);
            l.down.x = (sqW - 2 * rimThickness) / 2 + rimThickness;
            l.arrows.container.addChild(l.down);

            l.down.animations.add('selection', [1, 0], 8, false);

            let startOnClick,
                menuOnClick;
            startOnClick = () => {
                this.state.start('action');
            };
            menuOnClick = () => {
                this.state.start('menu');
            };

            size = glRadius * 0.15;
            let arr = [];
            for (let i = 0; i < 45; i++)
                arr.push(i);

            l.start = this.add.button(0, 0, 'outline', startOnClick);
            l.start.scale.setTo(glScale * 0.8, glScale * 0.8);
            l.start.x = game.width - glRadius * 0.2 - l.start.width;
            l.start.y = game.height - glRadius * 0.2 - l.start.height;

            l.start.animations.add('selection', arr, 45, true);
            l.start.tint = 0xdd2222;

            l.start.text = game.add.bitmapText(l.start.x, l.start.y, 'menu-font', 'START', size);
            l.start.text.x += (l.start.width - l.start.text.width) / 2;
            l.start.text.y += (l.start.height - l.start.text.height) / 2;

            l.menu = this.add.button(0, 0, 'outline', menuOnClick);
            l.menu.anchor.setTo(0, 0);
            l.menu.scale.setTo(glScale * 0.8, glScale * 0.8);
            l.menu.x = glRadius * 0.2;
            l.menu.y = game.height - glRadius * 0.2 - l.menu.height;

            l.menu.animations.add('selection', arr, 45, true);
            l.menu.tint = 0x851bc6;

            l.menu.text = game.add.bitmapText(l.menu.x, l.menu.y, 'menu-font', 'MENU', size);
            l.menu.text.x += (l.menu.width - l.menu.text.width) / 2;
            l.menu.text.y += (l.menu.height - l.menu.text.height) / 2;

            l.navMenu = new NavMenu({
                button: l.start,
                startFrame: 45,
                overFrame: null,       //over frame is used instead of animation when game is paused
                downFrame: null,
                animation: 'selection',
                onClick: startOnClick
            }, {
                button: l.menu,
                startFrame: 45,
                overFrame: null,
                downFrame: null,
                animation: 'selection',
                onClick: menuOnClick
            });

            [l.start, l.menu].forEach((button) => {
                button.onInputOver.add(() => {
                    clearTints();
                    switch (button.text.text) {
                        case 'START':
                            button.text.tint = 0xfc7a00;
                            break;
                        case 'MENU':
                            button.text.tint = 0xee31fc;
                    }
                });
            });

            l.navMenu.open();

            l.cursors = game.input.keyboard.createCursorKeys();
            l.accepter = game.input.keyboard.addKey(Phaser.Keyboard['ENTER']);
            l.returner = game.input.keyboard.addKey(Phaser.Keyboard['ESC']);
        }

        update () {
            if (l.cursors.down.justDown)
                l.down.onClick();
            if (l.cursors.up.justDown)
                l.up.onClick();

            let state = null;
            if (l.cursors.right.justDown)
                state = l.navMenu.nextState();
            if (l.cursors.left.justDown)
                state = l.navMenu.prevState();
            if (l.accepter.justDown)
                if (l.navMenu.state !== -1)
                    l.navMenu.onClick();
                else
                    this.state.start('action');

            if (l.returner.justDown)
                this.state.start('menu');

            if (state !== null) {
                clearTints();
                switch (state) {
                    case 0:
                        l.start.text.tint = 0xfc7a00;
                        break;
                    case 1:
                        l.menu.text.tint = 0xee31fc;
                }
            }
        }
    }

    function createRect (width, height, xOffset, yOffset, color) {
        let graphics = game.add.graphics(xOffset, yOffset);
        graphics.beginFill(color);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        graphics.boundsPadding = 0;

        return graphics;
    }

    function createRectRim (thickness, width, height, xOffset, yOffset) {
        let graphics = game.add.graphics(xOffset + thickness / 2, yOffset + thickness / 2);
        graphics.lineStyle(thickness, 0xffffff);
        graphics.drawRect(0, 0, width - thickness, height - thickness);
        graphics.boundsPadding = 0;

        return graphics;
    }

    function changeGraphicsColor (graphics, color) {
        graphics.graphicsData.forEach((part) => {
            if (part.fill) {
                part.fillColor = color;
                part._fillTint = color;
            }
            part.lineColor =  color;
            part._lineTint = color;
        });
    }

    function setLevel (idx) {
        let add = levelList[idx].add,
            lvl = l.level.text,
            num = l.levelNum.text;

        lvl.setText(add.name.toUpperCase());
        num.setText(idx < 10 ? '0' + idx : idx);

        lvl.tint = add.lvlTextColor;
        num.tint = add.numTextColor;

        changeGraphicsColor(l.levelNum.rim.children[0], add.numBoundColor);
        changeGraphicsColor(l.level.rim.children[0], add.lvlBoundColor);

        changeGraphicsColor(l.level.container.children[0], add.lvlContColor);
        changeGraphicsColor(l.levelNum.container.children[0], add.numContColor);
    }

    function clearTints () {
        l.start.text.tint = 0xffffff;
        l.menu.text.tint = 0xffffff;
    }

    return Boot;
});