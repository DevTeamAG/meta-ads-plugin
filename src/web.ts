import { WebPlugin } from '@capacitor/core';

import type { MetaAdsPlugin } from './definitions';

export class MetaAdsWeb extends WebPlugin implements MetaAdsPlugin {
  constructor() {
    super();
  }

  async initialize(_: { appId?: string } = {}): Promise<void> {
    console.warn('CapacitorMetaAds: initialize() called on web. No-op.');
  }

  async logEvent(options: { name: string; params?: { [key: string]: any } }): Promise<void> {
    console.log('CapacitorMetaAds.logEvent (web) ', options.name, options.params);
  }

  async setUserID(options: { userID: string | null }): Promise<void> {
    console.log('CapacitorMetaAds.setUserID (web) ', options.userID);
  }

  async setDataProcessingOptions(options: { options: string[]; country?: number; state?: number }): Promise<void> {
    console.log('CapacitorMetaAds.setDataProcessingOptions (web) ', options);
  }

  async requestTrackingAuthorization(): Promise<{ status: number }> {
    console.warn('CapacitorMetaAds.requestTrackingAuthorization (web) - not supported');
    return { status: -1 };
  }
}
