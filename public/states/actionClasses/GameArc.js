define([
        'states/actionClasses/Arc'
    ], (Arc) => {
    class GameArc extends Arc {
        constructor (lifeSpan, ...arcArgs) {
            super(...arcArgs);
            this.sprite.alpha = 0.3;
            this.tween = game.add.tween(this.sprite);
            this.tween.to({ alpha: 0.95 }, lifeSpan, Phaser.Easing.Linear.None, true);
        }

        destroy () {
            this.tween.stop();
            game.add.tween(this.sprite).to({alpha: 0}, this.killTime, Phaser.Easing.Linear.None, true);
            game.time.events.add(this.killTime, () => {
                Arc.prototype.destroy.call(this);
            });
        }

        get killTime () {
            return game.action.arcs.killTime;
        }
    }

    return GameArc;
});