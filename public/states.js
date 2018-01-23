define([
        'states/boot',
        'states/mobile',
        'states/load',
        'states/menu',
        'states/levels',
        'states/settings',
        'states/action',
        'states/comingsoon'
    ], (
        boot,
        mobile,
        load,
        menu,
        levels,
        settings,
        action,
        comingsoon
    ) => {
    return {
        boot: boot,
        mobile: mobile,
        load: load,
        menu: menu,
        levels: levels,
        settings: settings,
        action: action,
        comingsoon: comingsoon
    }
});