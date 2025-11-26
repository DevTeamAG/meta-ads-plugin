#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(MetaAdsPlugin, "MetaAds",
           CAP_PLUGIN_METHOD(initialize, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(logEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setUserID, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setDataProcessingOptions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestTrackingAuthorization, CAPPluginReturnPromise);
)

