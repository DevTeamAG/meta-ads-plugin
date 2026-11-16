var metaAdsPlugin = (function (exports, core) {
    'use strict';

    const MetaAds = core.registerPlugin("MetaAds", {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.MetaAdsWeb()),
    });

    class MetaAdsWeb extends core.WebPlugin {
        constructor() {
            super();
        }
        async initialize(_ = {}) {
            console.warn('MetaAdsPlugin: initialize() called on web. No-op.');
        }
        async logEvent(options) {
            console.log('MetaAdsPlugin.logEvent (web) ', options.name, options.params);
        }
        async setUserData(_) {
            console.log('MetaAdsPlugin.setUserData (web) - no-op');
        }
        async clearUserData() {
            console.log('MetaAdsPlugin.clearUserData (web) - no-op');
        }
        async setUserID(options) {
            console.log('MetaAdsPlugin.setUserID (web) ', options.userID);
        }
        async setDataProcessingOptions(options) {
            console.log('MetaAdsPlugin.setDataProcessingOptions (web) ', options);
        }
        async requestTrackingAuthorization() {
            console.warn('MetaAdsPlugin.requestTrackingAuthorization (web) - not supported');
            return { status: -1 };
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        MetaAdsWeb: MetaAdsWeb
    });

    exports.MetaAds = MetaAds;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
