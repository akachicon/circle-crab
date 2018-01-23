define(() => {
    class Boot {
        init() {
            console.log('entering boot state');

            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = false;

            if (game.device.desktop) {
                console.log("DESKTOP");
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;

                if (game.globals === undefined)
                    game.globals = {};
                if (game.globals.rendererScale === undefined) {
                    game.globals.rendererScale = 1;
                    game.globals.maxWidth = game.width;
                    game.globals.maxHeight = game.height;
                }
                game.globals.radius = Math.floor(Math.min(game.width / 2, game.height / 2));
                game.globals.scaleCoeff = game.globals.radius / 1080;

                game.action = {};
                game.menu = {};
                game.levels = {};
                game.settings = {};
                game.comingsoon = {};
            }
            else {
                console.log("MOBILE (is not available)");
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
        }

        create() {
            if (!game.device.desktop) {
                game.state.start('mobile');
                return;
            }
            game.state.start('load');
        }
    }

    return Boot;
});