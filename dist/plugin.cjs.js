'use strict';

var core = require('@capacitor/core');

const MetaAds = core.registerPlugin("MetaAds", {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.MetaAdsWeb()),
});

class MetaAdsWeb extends core.WebPlugin {
    constructor() {
        super();
    }
    async initialize(_ = {}) {
        console.warn("CapacitorMetaAds: initialize() called on web. No-op.");
    }
    async logEvent(options) {
        console.log("CapacitorMetaAds.logEvent (web) ", options.name, options.params);
    }
    async setUserID(options) {
        console.log("CapacitorMetaAds.setUserID (web) ", options.userID);
    }
    async setDataProcessingOptions(options) {
        console.log("CapacitorMetaAds.setDataProcessingOptions (web) ", options);
    }
    async requestTrackingAuthorization() {
        console.warn("CapacitorMetaAds.requestTrackingAuthorization (web) - not supported");
        return { status: -1 };
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MetaAdsWeb: MetaAdsWeb
});

exports.MetaAds = MetaAds;
//# sourceMappingURL=plugin.cjs.js.map
