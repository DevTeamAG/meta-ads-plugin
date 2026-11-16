import { WebPlugin } from '@capacitor/core';

import type { MetaAdsPlugin, MetaUserData } from './definitions';

export class MetaAdsWeb extends WebPlugin implements MetaAdsPlugin {
  constructor() {
    super();
  }

  async initialize(_: { appId?: string } = {}): Promise<void> {
    console.warn('MetaAdsPlugin: initialize() called on web. No-op.');
  }

  async logEvent(options: { name: string; params?: { [key: string]: any } }): Promise<void> {
    console.log('MetaAdsPlugin.logEvent (web) ', options.name, options.params);
  }

  async setUserData(_: MetaUserData): Promise<void> {
    console.log('MetaAdsPlugin.setUserData (web) - no-op');
  }

  async clearUserData(): Promise<void> {
    console.log('MetaAdsPlugin.clearUserData (web) - no-op');
  }

  async setUserID(options: { userID: string | null }): Promise<void> {
    console.log('MetaAdsPlugin.setUserID (web) ', options.userID);
  }

  async setDataProcessingOptions(options: { options: string[]; country?: number; state?: number }): Promise<void> {
    console.log('MetaAdsPlugin.setDataProcessingOptions (web) ', options);
  }

  async requestTrackingAuthorization(): Promise<{ status: number }> {
    console.warn('MetaAdsPlugin.requestTrackingAuthorization (web) - not supported');
    return { status: -1 };
  }
}
