define(() => {
    class Slider {
        constructor (baseW, baseH, baseColor, pointerDiameter, pointerLineW, pointerColor, pointerPosition, rimColor) {
            this.container = game.add.group();

            let base = createRect(baseW, baseH);
            base.tint = baseColor;
            let underBase = createRect(baseW, baseH);
            underBase.tint = 0x666666;
            this.base = game.add.sprite(0, 0, null);
            this.base.addChild(underBase);
            this.base.addChild(base);
            this.container.add(this.base);

            this.width = baseW;

            let pointerRim = createCircle(pointerDiameter, 0);
            pointerRim.tint = rimColor;
            this.pointerRim = game.add.sprite(0, 0, null)
                .addChild(pointerRim);
            this.container.add(this.pointerRim);

            this.pointerRim.x = baseW * pointerPosition;
            this.pointerRim.y = baseH / 2;
            this.pointerRim.alpha = 0;

            this.rimScale = game.add.tween(this.pointerRim.scale).to({ x: 4, y: 4 }, 700, Phaser.Easing.Cubic.Out, false);
            this.rimAlpha = game.add.tween(this.pointerRim).to({ alpha: 0.5 }, 700, Phaser.Easing.Cubic.Out, false);

            this.playBack = false;

            this.rimScale.onUpdateCallback(() => {
                if (this.pointerRim.scale.x <= 2 || this.playBack) return;

                this.rimScale.pause();
                this.rimAlpha.pause();
            });

            let pointer = createCircle(pointerDiameter, pointerLineW);
            pointer.tint = pointerColor;
            this.pointer = game.add.sprite(0, 0, null)
                .addChild(pointer);
            this.pointer.y = baseH / 2;
            this.container.add(this.pointer);

            this.pointer.x = baseW * pointerPosition;

            this.pointer.inputEnabled = true;
            this.pointer.input.enableDrag(false, false, false, 255
                , new Phaser.Rectangle(0, 0, baseW + pointerDiameter, pointerDiameter * 2));
            this.pointer.input.allowVerticalDrag = false;

            this.pointer.events.onInputOver.add(() => {
                this.playBack = false;

                this.rimScale.reverse = false;
                this.rimScale.start();
                this.rimAlpha.reverse = false;
                this.rimAlpha.start();
            });

            this.pointer.events.onInputOut.add(() => {
                this.playBack = true;

                this.rimScale.reverse = true;
                this.rimAlpha.reverse = true;
                this.rimScale.resume();
                this.rimAlpha.resume();
            })
        }

        get percentage () {
            return this.base.children[1].width / this.width;
        }

        update () {
            this.base.children[1].width = this.pointer.x;
            this.pointerRim.x = this.pointer.x;
        }
    }

    function createRect (width, height) {
        let graphics = game.add.graphics(0, 0);
        graphics.beginFill(0xffffff);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        graphics.boundsPadding = 0;

        return graphics;
    }

    function createCircle (diameter, lineW) {
        let graphics = game.add.graphics(0, 0);
        graphics.lineStyle(lineW, 0x999999);
        graphics.beginFill(0xffffff);
        graphics.drawCircle(0, 0, diameter);
        graphics.endFill();
        graphics.boundsPadding = 0;

        return graphics;
    }

    return Slider;
});