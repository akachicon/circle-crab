define(() => {
    class Load {
        preload() {
            //crab
            this.load.atlas('crabAtlas', 'assets/crabTexAt.png', 'assets/crabTexAt.json');
            this.load.json('crabJSON', 'assets/crab.json');
            //
            this.load.spritesheet('outline', 'assets/button-outline.png', 1171, 271);
            this.load.spritesheet('resume', 'assets/resume-button.png', 1168, 240);
            this.load.spritesheet('retry', 'assets/retry-button.png', 1168, 240);
            this.load.spritesheet('menu', 'assets/menu-button.png', 1168, 240);
            this.load.spritesheet('up', 'assets/up-arrow-button.png', 709, 462);
            this.load.spritesheet('down', 'assets/down-arrow-button.png', 709, 462);
            this.load.bitmapFont('pixel-font', 'assets/pixel-font.png', 'assets/pixel-font.xml');
            this.load.bitmapFont('menu-font', 'assets/menu-font.png', 'assets/menu-font.xml');
        }
        create() {
            console.log('entering load state');
            this.game.state.start('menu');
        }
    }
    return Load;
});