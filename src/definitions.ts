/**
 * Advanced-matching user data. Pass plain (unhashed) values: the Facebook SDK
 * normalizes and SHA-256 hashes them on the device before sending.
 * Phone: digits with country code, no `+` (e.g. `16195551212`).
 */
export interface MetaUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface MetaAdsPlugin {
  initialize(options?: { appId?: string }): Promise<void>;
  logEvent(options: {
    name: string;
    params?: { [key: string]: any };
    userData?: {
      email?: string;
    };
  }): Promise<void>;
  /** Attaches user data to every subsequent app event until cleared. */
  setUserData(options: MetaUserData): Promise<void>;
  clearUserData(): Promise<void>;
  setUserID(options: { userID: string | null }): Promise<void>;
  setDataProcessingOptions(options: {
    options: string[];
    country?: number;
    state?: number;
  }): Promise<void>;
  requestTrackingAuthorization(): Promise<{ status: number }>;
}
