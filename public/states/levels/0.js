define({
    // to hook up your level you have to write a line at the beginning of next files (in manner of previous levels):
    // states/actionClasses/ActionStateManager.js
    // states/action.js
    // states/levels.js
    /*--------test--------*/
    0: {                        // zero key is necessary
        wrapCRS: 0,             // wrap circle rotation speed
        mainRS: 0.01,           // main group rotation speed
        crabFRS: 0.02,          // crab forward rotation speed (counter-clockwise)
        crabBRS: 0.02,          // crab backward rotation speed
        crabCAS: 100,           // crab calm animation speed
        arcsRS: 0,              // arcs group rotation speed
        //acrLS: 10000,         // arc changing color time
        arcKT: 150,             // arc kill time (disappearing time)
        avtRT: 1000,            // time after last arc appearance after which avatar start moving
        arcColor: 0xf4005d,     // arc color
        segProbs: '3444',       // defines probability for every arc size (in segments) appearance
        equalDist: false,       // equalDist defines if it is possible to create arc that has equal left- and right-side distances from avatar (if true)
        bPentRS: 0.01,          // background pentagon rotation speed
        bSquareRS: 0.02,        // background square rotation speed
        bTriangleRS: -0.005     // background triangle rotation speed
    },
    10: {
        wrapCRS: -0.01,
        mainRS: 0.0,
        crabFRS: 0.03,
        crabBRS: 0.03,
        crabCAS: 150,
        arcsRS: 0.01,
        arcKT: 150,
        avtRT: 500,
        arcColor: 0x00ffe9,
        segProbs: '23',
        equalDist: false,
        bPentRS: 0.01,
        bSquareRS: 0.02,
        bTriangleRS: -0.005
    },
    50: {
        wrapCRS: -0.01,
        mainRS: -0.02,
        crabFRS: 0.035,
        crabBRS: 0.035,
        crabCAS: 150,
        arcsRS: -0.01,
        arcKT: 150,
        avtRT: 120,
        arcColor: 0xffaf00,
        segProbs: '123',
        equalDist: false,
        bPentRS: 0.01,
        bSquareRS: 0.02,
        bTriangleRS: -0.005
    },
    100: {
        wrapCRS: -0.01,
        mainRS: 0.03,
        crabFRS: 0.035,
        crabBRS: 0.035,
        crabCAS: 150,
        arcsRS: 0.01,
        arcKT: 150,
        avtRT: 120,
        arcColor: 0x00ffe9,
        segProbs: '1112233445',
        equalDist: false,
        bPentRS: 0.01,
        bSquareRS: 0.02,
        bTriangleRS: -0.005
    },
    add: {
        name: 'levelone',
        lvlTextColor: 0x77ff77,     //menu level name color
        numTextColor: 0x77ff77,     //menu level number color
        lvlContColor: 0x77ff77,     //level name container color
        numContColor: 0x77ff77,     //level number container color
        lvlBoundColor: 0x11ff11,    //level name container bound color
        numBoundColor: 0x44cc44,    //level number container bound color
        maxArcs: 10,
        special: function rainbow() {
            let a = game.action;
            let total = a.arcs.total;
            if (total % 50 >= 44 || total % 50 === 0) {
                a.arcs.lifeSpan = 300;
                switch (total % 50) {
                    case 44:
                        a.arcs.color = 0xff0000;
                        a.avatar.reactionTime = 0;
                        break;
                    case 45:
                        a.arcs.color = 0xff6100;
                        a.avatar.reactionTime = 0;
                        break;
                    case 46:
                        a.arcs.color = 0xfffa00;
                        a.avatar.reactionTime = 0;
                        break;
                    case 47:
                        a.arcs.color = 0x00ff00;
                        a.avatar.reactionTime = 0;
                        break;
                    case 48:
                        a.arcs.color = 0x0083ff;
                        a.avatar.reactionTime = 0;
                        break;
                    case 49:
                        a.arcs.color = 0x0000ff;
                        a.avatar.reactionTime = 0;
                        break;
                    case 0:
                        a.arcs.color = 0x7f00ff;
                        a.avatar.reactionTime = 4000;
                        break;
                }
            }

            if (total === 1) {
                a.groups.wrapCircle.rSpeed = -0.01;
                a.back.wrapCircle.swapColors(0xf42222, 0.8, 1000);
                a.back.circle.swapColors(0x660000, 1, 1000);
                a.back.circleLight.swapColors(0xe55a30, 1, 1000);
            }

            if (total === 3) {
                a.back.wrapCircle.swapColors(0xf4e26b, 0.8, 1000);
                a.back.circle.swapColors(0xcc5908, 1, 1000);
                a.back.circleLight.swapColors(0xe2ad00, 1, 1000);
            }
        }
    }
});