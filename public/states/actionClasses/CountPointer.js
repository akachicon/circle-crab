define(() => {
    class CountPointer {
        constructor(maxCount, span, radius, color = 0x333333) {
            let a, b, c, p = 5;
            a = new Phaser.Point(radius, 0);
            b = new Phaser.Point(radius + radius / p, radius / (p * 2));
            c = new Phaser.Point(radius + radius / p, - radius / (p * 2));

            let graphics = game.add.graphics(0, 0);
            graphics.lineStyle(0);
            graphics.beginFill(color);
            graphics.drawTriangle([a, b, c]);
            graphics.endFill();
            graphics.boundsPadding = 0;

            this.sprite = game.add.sprite(0, 0, null);
            this.sprite.addChild(graphics);

            this.position = 0;
            this.maxCount = maxCount;
            this.span = span;

            this.minRotationSpeed = 0.01;
        }

        instantSpeed (count) {
            let instSpeed,
                supPos,
                dif;
            supPos = this.span / this.maxCount * count;
            dif = supPos - this.position;
            instSpeed = dif / 30;

            if (Math.abs(instSpeed) < this.minRotationSpeed)
                instSpeed = this.minRotationSpeed * Math.sign(instSpeed);

            if (Math.abs(dif) < Math.abs(instSpeed))
                instSpeed = 0;

            this.position += instSpeed;

            return instSpeed;
        }
    }

    return CountPointer;
});
