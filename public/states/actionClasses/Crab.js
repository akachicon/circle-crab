define(() => {
    class Crab {
        constructor ({
                         fRotationSpeed: frs,
                         bRotationSpeed: brs,
                         cAnimSpeed: cas
                     }) {
            this.anim = createSpriterAnimation('crabJSON', 'crabAtlas', 'crab', 2, 100);
            this.fRotationSpeed = frs;
            this.bRotationSpeed = brs;

            this.cAnimSpeed = cas;
            this.fAnimSpeed = 100 * frs / 0.017;        //computed corresponding to given animation
            this.bAnimSpeed = 100 * brs / 0.017;        //computed corresponding to given animation

            this.headRad = 0.29;        //computed corresponding to given animation

            this.curAnim = -1;
            this.prevAnim = -1;
        }

        checkQueueArc (idx) {
            let a = game.action,
                PI2 = 2 * Math.PI,
                end = a.arcs.queue[idx].end - a.arcs.queue[idx].start;

            let crabAngle = (this.group.rotation
                + game.math.degToRad(90)
                - a.groups.arcs.rotation
                - a.arcs.queue[idx].start)
                % PI2;
            if (crabAngle < 0) crabAngle += PI2;

            return crabAngle >= this.headRad / 2 && crabAngle <= end - this.headRad / 2;
        }
    }

    return Crab;

    function createSpriterAnimation(JSONkey, texture, entity, anim, animSpeed) {
        let spriterLoader = new Spriter.Loader();
        let spriterFile = new Spriter.SpriterJSON(game.cache.getJSON(JSONkey));
        let spriterData = spriterLoader.load(spriterFile);
        let spAnim = new Spriter.SpriterGroup(game, spriterData, texture, entity, anim, animSpeed);
        spAnim.scale.setTo(game.globals.scaleCoeff, game.globals.scaleCoeff);
        return spAnim;
    }
});