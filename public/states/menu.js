define([
    'states/shared/NavigationMenu'
    ], (NavMenu) => {
    let m,
        glRadius,
        glScale;

    class Menu {
        init () {
            m = game.menu;

            glRadius = game.globals.radius;
            glScale = game.globals.scaleCoeff;
        }

        create () {
            console.log('entering menu state');

            this.stage.backgroundColor = 0x111111;

            m.cursors = game.input.keyboard.createCursorKeys();
            m.accepter = game.input.keyboard.addKey(Phaser.Keyboard['ENTER']);

            let size = glRadius * 0.1615,
                arr = [];
            for (let i = 0; i < 45; i++)
                arr.push(i);

            let playOnClick;
            playOnClick = () => {
                this.state.start('levels');
            };
            m.play = this.add.button(game.world.centerX, game.world.centerY - glRadius * 0.45, 'outline', playOnClick);
            m.play.anchor.setTo(0.5, 0.5);
            m.play.scale.setTo(glScale, glScale);

            m.play.animations.add('selection', arr, 45, true);
            m.play.tint = 0x81ea10;

            m.play.text = game.add.bitmapText(game.world.centerX, m.play.top + m.play.height / 5, 'menu-font', 'PLAY', size);
            m.play.text.anchor.setTo(0.45, 0);

            let settingsOnClick;
            settingsOnClick = () => {
                this.state.start('settings');
            };
            m.settings = this.add.button(game.world.centerX, m.play.bottom + m.play.height / 2 + glRadius * 0.05, 'outline', settingsOnClick);
            m.settings.anchor.setTo(0.5, 0.5);
            m.settings.scale.setTo(glScale, glScale);

            m.settings.animations.add('selection', arr, 45, true);
            m.settings.tint = 0x5b1af2;

            m.settings.text = game.add.bitmapText(game.world.centerX, m.settings.top + m.settings.height / 5, 'menu-font', 'SETTINGS', size);
            m.settings.text.anchor.setTo(0.48, 0);

            let creditsOnClick;
            creditsOnClick = () => {
                //TODO: credits state
                this.state.start('comingsoon');
            };
            m.credits = this.add.button(game.world.centerX, m.settings.bottom + m.settings.height / 2 + glRadius * 0.05, 'outline', creditsOnClick);
            m.credits.anchor.setTo(0.5, 0.5);
            m.credits.scale.setTo(glScale, glScale);

            m.credits.animations.add('selection', arr, 45, true);
            m.credits.tint = 0xffaa00;

            m.credits.text = game.add.bitmapText(game.world.centerX, m.credits.top + m.credits.height / 5, 'menu-font', 'CREDITS', size);
            m.credits.text.anchor.setTo(0.465, 0);

            let othersOnClick;
            othersOnClick = () => {
                //TODO: others state
                this.state.start('comingsoon');
            };
            m.others = this.add.button(game.world.centerX, m.credits.bottom + m.credits.height / 2 + glRadius * 0.05, 'outline', othersOnClick);
            m.others.anchor.setTo(0.5, 0.5);
            m.others.scale.setTo(glScale, glScale);

            m.others.animations.add('selection', arr, 45, true);
            m.others.tint = 0x18e6f0;

            m.others.text = game.add.bitmapText(game.world.centerX, m.others.top + m.others.height / 5, 'menu-font', 'OTHERS', size);
            m.others.text.anchor.setTo(0.465, 0);

            m.navMenu = new NavMenu({
                button: m.play,
                startFrame: 45,
                overFrame: null,       //over frame is used instead of animation when game is paused
                downFrame: null,
                animation: 'selection',
                onClick: playOnClick
            }, {
                button: m.settings,
                startFrame: 45,
                overFrame: null,
                downFrame: null,
                animation: 'selection',
                onClick: settingsOnClick
            }, {
                button: m.credits,
                startFrame: 45,
                overFrame: null,
                downFrame: null,
                animation: 'selection',
                onClick: creditsOnClick
            }, {
                button: m.others,
                startFrame: 45,
                overFrame: null,
                downFrame: null,
                animation: 'selection',
                onClick: othersOnClick
            });

            [m.play, m.settings, m.credits, m.others].forEach((button) => {
                button.onInputOver.add(() => {
                    clearTints();
                    switch (button.text.text) {
                        case 'PLAY':
                            button.text.tint = 0xa8e026;
                            break;
                        case 'SETTINGS':
                            button.text.tint = 0x9263ff;
                            break;
                        case 'CREDITS':
                            button.text.tint = 0xf2e600;
                            break;
                        case 'OTHERS':
                            button.text.tint = 0x17d6a3;
                    }
                });
            });

            m.navMenu.open();
        }

        update () {
            let state = null;
            if (m.cursors.down.justDown)
                state = m.navMenu.nextState();
            if (m.cursors.up.justDown)
                state = m.navMenu.prevState();
            if (m.accepter.justDown
                && m.navMenu.state !== -1)
                m.navMenu.onClick();

            if (state !== null) {
                clearTints();
                switch (state) {
                    case 0:
                        m.play.text.tint = 0xa8e026;
                        break;
                    case 1:
                        m.settings.text.tint = 0x9263ff;
                        break;
                    case 2:
                        m.credits.text.tint = 0xf2e600;
                        break;
                    case 3:
                        m.others.text.tint = 0x17d6a3;
                }
            }
        }
    }

    function clearTints () {
        m.play.text.tint = 0xffffff;
        m.settings.text.tint = 0xffffff;
        m.credits.text.tint = 0xffffff;
        m.others.text.tint = 0xffffff;
    }

    return Menu;
});