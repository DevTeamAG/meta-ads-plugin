````markdown
# iOS Integration Notes

1. Add the Meta SDK to your Podfile / dependencies: either via the plugin `.podspec` or directly in your host app Podfile. Use the Podspec above as-is or adjust to your preferred pods.

2. Info.plist additions (Host iOS app `ios/App/App/Info.plist`):

```xml
<key>FacebookAppID</key>
<string>YOUR_FACEBOOK_APP_ID</string>
<key>FacebookDisplayName</key>
<string>YOUR_APP_NAME</string>
<key>LSApplicationQueriesSchemes</key>
<array>
<string>fbapi</string>
<string>fb-messenger-share-api</string>
<string>fbauth2</string>
<string>fbshareextension</string>
</array>
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads.</string>
```
````

3. AppDelegate changes (Host iOS app `ios/App/App/AppDelegate.swift`):

```swift
import FBSDKCoreKit
import AppTrackingTransparency


func application(
_ application: UIApplication,
didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {
ApplicationDelegate.shared.application(
application,
didFinishLaunchingWithOptions: launchOptions
)
return true
}


func application(_ app: UIApplication, open url: URL,
options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
return ApplicationDelegate.shared.application(app, open: url, options: options)
}
```

4. SKAdNetwork: Add any networks required by your marketing team to Info.plist.

5. CocoaPods: run `pod install` in the iOS project after `npx cap sync ios`.

```

```
