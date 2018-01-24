define({
    /*--------rainbow--------*/
    0: {
        wrapCRS: 0.0,
        mainRS: 0.0,
        crabFRS: 0.03,
        crabBRS: 0.03,
        crabCAS: 125,
        arcsRS: 0,
        arcKT: 150,
        avtRT: 100,
        arcColor: 0xff0000,
        segProbs: '34',
        equalDist: false,
        bPentRS: 0.01,
        bSquareRS: 0.015,
        bTriangleRS: -0.005
    },
    25: {
        wrapCRS: -0.007,
        mainRS: 0.012,
        crabFRS: 0.03,
        crabBRS: 0.03,
        crabCAS: 125,
        arcsRS: 0,
        arcKT: 150,
        avtRT: 90,
        arcColor: 0xff8c00,
        segProbs: '23',
        equalDist: false,
        bPentRS: 0.015,
        bSquareRS: 0.02,
        bTriangleRS: -0.01
    },
    50: {
        wrapCRS: -0.014,
        mainRS: 0.024,
        crabFRS: 0.03,
        crabBRS: 0.03,
        crabCAS: 125,
        arcsRS: 0,
        arcKT: 150,
        avtRT: 80,
        arcColor: 0xf6ff05,
        segProbs: '111234',
        equalDist: false,
        bPentRS: 0.02,
        bSquareRS: 0.027,
        bTriangleRS: -0.015
    },
    75: {
        wrapCRS: -0.021,
        mainRS: 0.03,
        crabFRS: 0.035,
        crabBRS: 0.035,
        crabCAS: 125,
        arcsRS: 0,
        arcKT: 150,
        avtRT: 70,
        arcColor: 0x15f22b,
        segProbs: '1111222345',
        equalDist: false,
        bPentRS: 0.025,
        bSquareRS: 0.03,
        bTriangleRS: -0.02
    },
    76: {
        wrapCRS: -0.021,
        mainRS: 0,
        crabFRS: 0.035,
        crabBRS: 0.035,
        crabCAS: 125,
        arcsRS: 0,
        arcKT: 150,
        avtRT: 70,
        arcColor: 0x15f22b,
        segProbs: '1111222345',
        equalDist: false,
        bPentRS: 0,
        bSquareRS: 0,
        bTriangleRS: -0.007
    },
    100: {
        wrapCRS: -0.025,
        mainRS: 0,
        crabFRS: 0.035,
        crabBRS: 0.035,
        crabCAS: 125,
        arcsRS: 0.005,
        arcKT: 150,
        avtRT: 60,
        arcColor: 0x0080ff,
        segProbs: '1111222345',
        equalDist: false,
        bPentRS: -0.025,
        bSquareRS: -0.03,
        bTriangleRS: 0.02
    },
    125: {
        wrapCRS: -0.032,
        mainRS: -0.012,
        crabFRS: 0.035,
        crabBRS: 0.035,
        crabCAS: 125,
        arcsRS: -0.005,
        arcKT: 150,
        avtRT: 55,
        arcColor: 0x1511ff,
        segProbs: '11112',
        equalDist: false,
        bPentRS: -0.03,
        bSquareRS: -0.035,
        bTriangleRS: 0.025
    },
    150: {
        wrapCRS: -0.039,
        mainRS: -0.017,
        crabFRS: 0.038,
        crabBRS: 0.038,
        crabCAS: 125,
        arcsRS: 0.007,
        arcKT: 150,
        avtRT: 50,
        arcColor: 0xaf00ef,
        segProbs: '1111222222222222222222233333333456',
        equalDist: false,
        bPentRS: -0.035,
        bSquareRS: -0.039,
        bTriangleRS: 0.029
    },
    add: {
        name: 'RAINBOW',
        lvlTextColor: 0xd84786,
        numTextColor: 0xd84786,
        lvlContColor: 0xff9bdc,
        numContColor: 0xdb78b8,
        lvlBoundColor: 0x9b1f8a,
        numBoundColor: 0x7c2771,
        released: true,
        maxArcs: 10,
        special: function rainbow() {
            let a = game.action,
                total = a.arcs.total,
                t = total % 175;

            if (total === 1 || t === 0) {
                a.back.wrapCircle.swapColors(0xff2600, 0.75, 1000);
                a.back.circle.swapColors(0x700212, 1, 1000);
                a.back.circleLight.swapColors(0xe55a30, 1, 1000);
            }

            if (t === 25) {
                a.back.wrapCircle.swapColors(0xff5816, 1, 1000);
                a.back.circle.swapColors(0x873c04, 1, 1000);
                a.back.circleLight.swapColors(0xff8d02, 1, 1000);
            }

            if (t === 50) {
                a.back.wrapCircle.swapColors(0xffeb16, 0.95, 1000);
                a.back.circle.swapColors(0xa35c00, 1, 1000);
                a.back.circleLight.swapColors(0xf9ff51, 1, 1000);
            }

            if (t === 75) {
                a.back.wrapCircle.swapColors(0x00d60a, 0.95, 1000);
                a.back.circle.swapColors(0x005604, 1, 1000);
                a.back.circleLight.swapColors(0x4ded12, 1, 1000);
            }

            if (t === 100) {
                a.back.wrapCircle.swapColors(0x0080ff, 0.95, 1000);
                a.back.circle.swapColors(0x00478e, 1, 1000);
                a.back.circleLight.swapColors(0x42a0ff, 1, 1000);
            }

            if (t === 125) {
                a.back.wrapCircle.swapColors(0x6702ff, 1, 1000);
                a.back.circle.swapColors(0x2b4177, 1, 1000);
                a.back.circleLight.swapColors(0x6884ff, 1, 1000);
            }

            if (t === 150) {
                a.back.wrapCircle.swapColors(0xae04f7, 1, 1000);
                a.back.circle.swapColors(0x6a0893, 1, 1000);
                a.back.circleLight.swapColors(0xcb51ff, 1, 1000);
            }

            let w = Math.floor(t / 25),
                r = t % 25;

            if (r >= 18) {
                switch (r + w) {
                    case 24:
                        a.arcs.color = 0xff0000;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                        break;
                    case 25:
                        a.arcs.color = 0xff6100;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                        break;
                    case 26:
                        a.arcs.color = 0xfffa00;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                        break;
                    case 27:
                        a.arcs.color = 0x00ff00;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                        break;
                    case 28:
                        a.arcs.color = 0x0083ff;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                        break;
                    case 29:
                        a.arcs.color = 0x0000ff;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                        break;
                    case 30:
                        a.arcs.color = 0x7f00ff;
                        a.arcs.lifeSpan = 300;
                        a.avatar.reactionTime = 0;
                }
                if (r === 24)
                    a.avatar.reactionTime = 500;
            }
        }
    }
});
