import { WebPlugin } from '@capacitor/core';
export class MetaAdsWeb extends WebPlugin {
    constructor() {
        super();
    }
    async initialize(_ = {}) {
        console.warn('MetaAdsPlugin: initialize() called on web. No-op.');
    }
    async logEvent(options) {
        console.log('MetaAdsPlugin.logEvent (web) ', options.name, options.params);
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
//# sourceMappingURL=web.js.map