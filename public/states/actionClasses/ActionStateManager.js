define([
        'states/levels/0',
        'states/levels/1',
        'states/levels/2'
    ], (...levels) => {
    class ActionStateManager {
        static initState(tick, func = (x) => {
                             return x;
                         }) {
            let a = game.action;
            let lvl = levels[game.action.level];
            let leftKey, rightKey = null;

            let keys = Object.keys(lvl);
            keys.pop();

            for (let i = 0; i < keys.length; i++)
                if (keys[i] <= tick)
                    leftKey = keys[i];
                else {
                    rightKey = keys[i];
                    break;
                }

            if (!rightKey)
                rightKey = leftKey;

            let s = ActionStateManager.interpolate(tick, leftKey, rightKey, func);

            a.groups.wrapCircle.rSpeed = s.wrapCRS;
            a.groups.main.rSpeed = s.mainRS;
            a.crab.fRotationSpeed = s.crabFRS;
            a.crab.fAnimSpeed = 100 * a.crab.fRotationSpeed / 0.017;
            a.crab.bRotationSpeed = s.crabBRS;
            a.crab.bAnimSpeed = 100 * a.crab.bRotationSpeed / 0.017;
            a.crab.cAnimSpeed = s.crabCAS;
            a.groups.arcs.rSpeed = s.arcsRS;
            if ('arcLS' in s)
                a.arcs.lifeSpan = s.arcLS;
            else
                a.arcs.lifeSpan = Math.floor((s.avtRT + (Math.PI / 2) / (s.crabFRS + Math.abs(s.arcsRS)) * 17) * a.arcs.maxArcs);
            a.arcs.killTime = s.arcKT;
            a.avatar.reactionTime = s.avtRT;
            a.arcs.color = s.arcColor;
            a.arcs.segProbs = s.segProbs;
            a.arcs.equalDist = s.equalDist;
            a.back.pentagon.rSpeed = s.bPentRS;
            a.back.square.rSpeed = s.bSquareRS;
            a.back.triangle.rSpeed = s.bTriangleRS;

            a.arcs.total++;
            lvl.add.special();
        }

        static interpolate(tick, leftKey, rightKey, func) {
            let lvl = levels[game.action.level];
            let interState = {};
            Object.assign(interState, lvl[leftKey]);

            for (let key in interState) {
                if (key === 'arcColor' || key === 'segProbs' || key === 'equalDist')
                    continue;

                let totalFrames = rightKey - leftKey;

                if (totalFrames === 0 || tick === leftKey) {
                    interState[key] = lvl[leftKey][key];
                    continue;
                }

                let x = (tick - leftKey) / totalFrames;
                let y = func(x);
                let dif = (lvl[rightKey][key] - interState[key]) * y;

                if (key === 'arcLS' || key === 'arcKT' || key === 'avtRT')
                    dif = Math.floor(dif);

                interState[key] += dif;
            }

            return interState;
        }
    }

    return ActionStateManager;
});