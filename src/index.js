import PluginManager from './plugin-system/plugin.manager';

import HangMan from './tyshkevych/hang-man';
import ForeStore from './tyshkevych/fire-storage';

PluginManager.register('ForeStore', ForeStore, '[data-fire-store-plugin]');
PluginManager.register('HangMan', HangMan, '[data-hang-man-plugin]');

document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        PluginManager.initializePlugins();
    }
};
