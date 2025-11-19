import { WebPlugin } from "@capacitor/core";
export class MetaAdsWeb extends WebPlugin {
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
//# sourceMappingURL=web.js.map