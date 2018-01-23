define([
    'states/shared/NavigationMenu'
], (NavMenu) => {
    let cs,
        glRadius,
        glScale,
        defaultMinSide;

    class ComingSoon {
        init () {
            cs = game.comingsoon;
            glRadius = game.globals.radius;
            glScale = game.globals.scaleCoeff;
            defaultMinSide = 100;
        }

        create () {
            console.log('entering coming soon state');

            this.stage.backgroundColor = 0x111111;

            let size = glRadius * 0.192;

            cs.text = game.add.bitmapText(game.world.centerX, game.world.centerY, 'menu-font', 'COMING SOON!', size);
            cs.text.anchor.setTo(0.45, 1);
            cs.text.tint = 0xffaa00;

            let menuOnClick;
            menuOnClick = () => {
                this.state.start('menu');
            };

            size = glRadius * 0.15;
            let arr = [];
            for (let i = 0; i < 45; i++)
                arr.push(i);

            cs.menu = this.add.button(0, 0, 'outline', menuOnClick);
            cs.menu.anchor.setTo(0, 0);
            cs.menu.scale.setTo(glScale * 0.8, glScale * 0.8);
            cs.menu.x = glRadius * 0.2;
            cs.menu.y = game.height - glRadius * 0.2 - cs.menu.height;

            cs.menu.animations.add('selection', arr, 45, true);
            cs.menu.tint = 0x851bc6;

            cs.menu.text = game.add.bitmapText(cs.menu.x, cs.menu.y, 'menu-font', 'MENU', size);
            cs.menu.text.x += (cs.menu.width - cs.menu.text.width) / 2;
            cs.menu.text.y += (cs.menu.height - cs.menu.text.height) / 2;

            cs.navMenu = new NavMenu({
                button: cs.menu,
                startFrame: 45,
                overFrame: null,
                downFrame: null,
                animation: 'selection',
                onClick: menuOnClick
            });

            [cs.menu].forEach((button) => {
                button.onInputOver.add(() => {
                    clearTints();
                    switch (button.text.text) {
                        case 'MENU':
                            button.text.tint = 0xee31fc;
                    }
                });
            });

            cs.navMenu.open();

            cs.cursors = game.input.keyboard.createCursorKeys();
            cs.accepter = game.input.keyboard.addKey(Phaser.Keyboard['ENTER']);
            cs.returner = game.input.keyboard.addKey(Phaser.Keyboard['ESC']);
        }

        update () {
            let state = null;
            if (cs.cursors.right.justDown)
                state = cs.navMenu.nextState();
            if (cs.cursors.left.justDown)
                state = cs.navMenu.prevState();
            if (cs.accepter.justDown
                && cs.navMenu.state !== -1)
                cs.navMenu.onClick();

            if (cs.returner.justDown)
                this.state.start('menu');

            if (state !== null) {
                clearTints();
                switch (state) {
                    case 0:
                        cs.menu.text.tint = 0xee31fc;
                }
            }
        }
    }

    function clearTints () {
        cs.menu.text.tint = 0xffffff;
    }

    return ComingSoon;
});
