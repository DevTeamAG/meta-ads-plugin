export interface MetaAdsPlugin {
    initialize(options?: {
        appId?: string;
    }): Promise<void>;
    logEvent(options: {
        name: string;
        params?: {
            [key: string]: any;
        };
    }): Promise<void>;
    setUserID(options: {
        userID: string | null;
    }): Promise<void>;
    setDataProcessingOptions(options: {
        options: string[];
        country?: number;
        state?: number;
    }): Promise<void>;
    requestTrackingAuthorization(): Promise<{
        status: number;
    }>;
}
