define(() => {
    class ColorSwapper {        //for graphics only
        constructor (graphics, nextGraphics, initColor, initAlpha = 1) {
            this.sprite = game.add.sprite(0, 0, null);
            this.sprite.alpha = initAlpha;
            this.nextSprite = game.add.sprite(0, 0, null);
            this.nextSprite.alpha = 0;
            this.graphics = graphics;
            this.nextGraphics = nextGraphics;
            this.sprite.addChild(graphics);
            this.nextSprite.addChild(nextGraphics);
            this.setGraphicsColor(this.graphics, initColor);
        }

        swapColors (color, alpha = 1, time = 1000) {
            this.setGraphicsColor(this.nextGraphics, color);

            let cur = game.add.tween(this.sprite).to({ alpha: 0 }, time, Phaser.Easing.Linear.None, true);
            let nxt = game.add.tween(this.nextSprite).to({ alpha: alpha }, time, Phaser.Easing.Linear.None, true);

            let a = false,
                b = false;

            cur.onComplete.add(() => {
                a = true;
                if (a && b) onTweensComplete.call(this);
            });

            nxt.onComplete.add(() => {
                b = true;
                if (a && b) onTweensComplete.call(this);
            });

            function onTweensComplete() {
                this.setGraphicsColor(this.graphics, color);
                this.sprite.alpha = alpha;
                this.nextSprite.alpha = 0;
            }
        }

        setGraphicsColor(graphics, color) {
            graphics.graphicsData.forEach((part) => {
                if (part.fill) {
                    part.fillColor = color;
                    part._fillTint = color;
                }
                part.lineColor =  color;
                part._lineTint = color;
            });
        }
    }

    return ColorSwapper;
});
