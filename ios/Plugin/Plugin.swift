import Foundation
import Capacitor
import FBSDKCoreKit
import AppTrackingTransparency

@objc(MetaAdsPlugin)
public class MetaAdsPlugin: CAPPlugin {
    // Called when the plugin is loaded
    public override func load() {
        NSLog("MetaAdsPlugin: load called")
        // Do not call initializeSDK here with App ID because AppDelegate needs to be configured too.
        // If you want to initialize here, ensure Info.plist has FacebookAppID set.
        if let appID = Bundle.main.object(forInfoDictionaryKey: "FacebookAppID") as? String {
            Settings.shared.appID = appID
            Settings.shared.isAutoLogAppEventsEnabled = true
            ApplicationDelegate.shared.initializeSDK()
            NSLog("MetaAdsPlugin: initialized with AppID: \(appID)")
        } else {
            NSLog("MetaAdsPlugin: FacebookAppID not found in Info.plist")
        }
    }

    @objc func initialize(_ call: CAPPluginCall) {
        let appId = call.getString("appId")
        if let appId = appId {
            Settings.shared.appID = appId
        }
        Settings.shared.isAutoLogAppEventsEnabled = true
        ApplicationDelegate.shared.initializeSDK()
        call.resolve()
    }

    @objc func logEvent(_ call: CAPPluginCall) {
        guard let name = call.getString("name") else {
            call.reject("Missing event name")
            return
        }
        let params = call.getObject("params") ?? [:]
        let userDataDict = call.getObject("userData")
        
        // Convert params into [AppEvents.ParameterName: Any]
        var converted: [AppEvents.ParameterName: Any] = [:]
        for (k, v) in params {
            converted[AppEvents.ParameterName(rawValue: k)] = v
        }
        
        // Merge userData into parameters if provided
        // Facebook uses _email (with underscore) for hashed email addresses
        if let userDataDict = userDataDict {
            if let email = userDataDict["email"] as? String {
                converted[AppEvents.ParameterName(rawValue: "_email")] = email
            }
        }
        
        // Log event with merged parameters
        AppEvents.shared.logEvent(AppEvents.Name(rawValue: name), parameters: converted)
        
        call.resolve()
    }

    @objc func setUserID(_ call: CAPPluginCall) {
        let userID = call.getString("userID")
        Settings.shared.isAdvertiserIDCollectionEnabled = (userID != nil)
        AppEvents.shared.userID = userID
        call.resolve()
    }

    @objc func setDataProcessingOptions(_ call: CAPPluginCall) {
        let options = call.getArray("options") ?? []
        let country = call.getInt("country") ?? 0
        let state = call.getInt("state") ?? 0
        
        // Convert options array to [String]
        let optionsArray = options.compactMap { $0 as? String }
        
        // Use Settings.shared instance method - convert to Int32
        Settings.shared.setDataProcessingOptions(optionsArray, country: Int32(country), state: Int32(state))
        call.resolve()
    }

    @objc func requestTrackingAuthorization(_ call: CAPPluginCall) {
        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization { status in
                call.resolve(["status": status.rawValue])
            }
        } else {
            call.resolve(["status": -1])
        }
    }
}