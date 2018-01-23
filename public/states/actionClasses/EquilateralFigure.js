define(() => {
    class EquilateralFigure {
        constructor (segs, radius, color) {
            let end = 0,
                start = 2 * Math.PI / segs,
                segments = segs - 1;

            let graphics = game.add.graphics(0, 0);
            graphics.lineStyle(0);
            graphics.beginFill(color);
            graphics.arc(0, 0, radius, start, end, false, segments);
            graphics.endFill();
            graphics.boundsPadding = 0;

            let sprite = game.add.sprite(0, 0, null);
            sprite.addChild(graphics);

            this.sprite = sprite;
        }
    }

    return EquilateralFigure;
});