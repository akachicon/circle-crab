define([
        'states/shared/Slider',
        'states/shared/NavigationMenu'
    ], (Slider, NavMenu) => {
    let s,
        glRadius,
        glScale,
        defaultMinSide;

    class Settings {
        init () {
            s = game.settings;
            glRadius = game.globals.radius;
            glScale = game.globals.scaleCoeff;
            defaultMinSide = 100;
        }

        create () {
            console.log('entering settings state');

            this.stage.backgroundColor = 0x111111;

            let size = glRadius * 0.192;

            s.text = game.add.bitmapText(game.world.centerX, glRadius / 5, 'menu-font', 'SETTINGS', size);
            s.text.anchor.setTo(0.45, 0);
            s.text.tint = 0xa8e026;

            size = game.width / 24;

            s.rrText = game.add.bitmapText(game.width / 20, s.text.bottom + size, 'menu-font', 'RENDERING\nRESOLUTION', size);
            s.rrText.anchor.setTo(0, 0);

            let w = game.width * 0.35,
                h = glRadius / 30,
                r = h * 3,
                lw = r / 5;

            s.rrSlider = new Slider(w, h, 0xbc1a7d, r, lw, 0xd6136e, game.globals.rendererScale, 0xff9bee);
            s.rrSlider.container.x = game.world.centerX + game.width * 0.065;
            s.rrSlider.container.y = s.rrText.y + s.rrText.height / 2 - h / 2;

            s.worstText = game.add.bitmapText(s.rrSlider.container.x - size / 2, s.rrSlider.container.y + r, 'menu-font', 'WORST', size / 2);
            s.worstText.anchor.setTo(0, 0);

            s.worstText = game.add.bitmapText(s.rrSlider.container.x + w * 0.85, s.rrSlider.container.y + r, 'menu-font', 'BEST', size / 2);
            s.worstText.anchor.setTo(0, 0);

            let applyOnClick = () => {
                if (game.globals.rendererScale === s.rrSlider.percentage) {
                    game.state.start('menu');
                    return;
                }

                game.globals.rendererScale = s.rrSlider.percentage;

                let maxW = game.globals.maxWidth,
                    maxH = game.globals.maxHeight;

                let minMaxSide = Math.min(maxH, maxW);

                if (minMaxSide <= defaultMinSide) {
                    game.state.start('menu');
                    return;
                }

                let defaultMinSideAdd = (minMaxSide - defaultMinSide) * s.rrSlider.percentage,
                    newMinSide = defaultMinSide + defaultMinSideAdd,
                    scaleCoeff = newMinSide / minMaxSide;

                game.scale.setGameSize(Math.round(maxW * scaleCoeff)
                    , Math.round(maxH * scaleCoeff));

                game.width = Math.round(maxW * scaleCoeff);
                game.height = Math.round(maxH * scaleCoeff);

                game.state.start('boot');
            };

            let menuOnClick;
            menuOnClick = () => {
                this.state.start('menu');
            };

            size = glRadius * 0.15;
            let arr = [];
            for (let i = 0; i < 45; i++)
                arr.push(i);

            s.apply = this.add.button(0, 0, 'outline', applyOnClick);
            s.apply.scale.setTo(glScale * 0.8, glScale * 0.8);
            s.apply.x = game.width - glRadius * 0.2 - s.apply.width;
            s.apply.y = game.height - glRadius * 0.2 - s.apply.height;

            s.apply.animations.add('selection', arr, 45, true);
            s.apply.tint = 0xdd2222;

            s.apply.text = game.add.bitmapText(s.apply.x, s.apply.y, 'menu-font', 'APPLY', size);
            s.apply.text.x += (s.apply.width - s.apply.text.width) / 2;
            s.apply.text.y += (s.apply.height - s.apply.text.height) / 2;

            s.menu = this.add.button(0, 0, 'outline', menuOnClick);
            s.menu.anchor.setTo(0, 0);
            s.menu.scale.setTo(glScale * 0.8, glScale * 0.8);
            s.menu.x = glRadius * 0.2;
            s.menu.y = game.height - glRadius * 0.2 - s.menu.height;

            s.menu.animations.add('selection', arr, 45, true);
            s.menu.tint = 0x851bc6;

            s.menu.text = game.add.bitmapText(s.menu.x, s.menu.y, 'menu-font', 'MENU', size);
            s.menu.text.x += (s.menu.width - s.menu.text.width) / 2;
            s.menu.text.y += (s.menu.height - s.menu.text.height) / 2;

            s.navMenu = new NavMenu({
                button: s.apply,
                startFrame: 45,
                overFrame: null,       //over frame is used instead of animation when game is paused
                downFrame: null,
                animation: 'selection',
                onClick: applyOnClick
            }, {
                button: s.menu,
                startFrame: 45,
                overFrame: null,
                downFrame: null,
                animation: 'selection',
                onClick: menuOnClick
            });

            [s.apply, s.menu].forEach((button) => {
                button.onInputOver.add(() => {
                    clearTints();
                    switch (button.text.text) {
                        case 'APPLY':
                            button.text.tint = 0xfc7a00;
                            break;
                        case 'MENU':
                            button.text.tint = 0xee31fc;
                    }
                });
            });

            s.navMenu.open();

            s.cursors = game.input.keyboard.createCursorKeys();
            s.accepter = game.input.keyboard.addKey(Phaser.Keyboard['ENTER']);
            s.returner = game.input.keyboard.addKey(Phaser.Keyboard['ESC']);
        }

        update () {
            let state = null;
            if (s.cursors.right.justDown)
                state = s.navMenu.nextState();
            if (s.cursors.left.justDown)
                state = s.navMenu.prevState();
            if (s.accepter.justDown
                && s.navMenu.state !== -1)
                s.navMenu.onClick();

            if (s.returner.justDown)
                this.state.start('menu');

            if (state !== null) {
                clearTints();
                switch (state) {
                    case 0:
                        s.apply.text.tint = 0xfc7a00;
                        break;
                    case 1:
                        s.menu.text.tint = 0xee31fc;
                }
            }

            s.rrSlider.update();
        }
    }

    function clearTints () {
        s.apply.text.tint = 0xffffff;
        s.menu.text.tint = 0xffffff;
    }

    return Settings;
});