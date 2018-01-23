let parent = document.getElementsByTagName('div')[0];
    parent.style.width = window.innerWidth - 100 + 'px';
    parent.style.height = window.innerHeight - 100 + 'px';
let maxWidth = parent.clientWidth,
    maxHeight = parent.clientHeight;

createGame(parent, maxWidth, maxHeight);  //max rendering resolution, supposed to receive parent computed width and height
                                          //min(maxWidth, maxHeight) >= 100

function createGame (parent, maxWidth, maxHeight) {
    require(['states'], (states) => {
        window.game = new Phaser.Game(maxWidth, maxHeight, Phaser.CANVAS, parent);

        window.game.state.add('boot', states.boot);
        window.game.state.add('mobile', states.mobile);
        window.game.state.add('load', states.load);
        window.game.state.add('menu', states.menu);
        window.game.state.add('levels', states.levels);
        window.game.state.add('settings', states.settings);
        window.game.state.add('action', states.action);
        window.game.state.add('comingsoon', states.comingsoon);

        window.game.state.start('boot');
    });
}