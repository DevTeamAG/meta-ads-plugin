# Comparison: capacitor-meta-ads vs capacitor-meta-sdk

## Overview

Both plugins integrate Meta (Facebook) SDK with Capacitor, but they differ significantly in scope, architecture, and features.

## Key Differences

### 1. **Feature Set**

#### capacitor-meta-ads (More Comprehensive)
- ✅ `initialize()` - Initialize SDK with optional App ID
- ✅ `logEvent()` - Log custom events with parameters
- ✅ `setUserID()` - Set user ID for tracking
- ✅ `setDataProcessingOptions()` - GDPR/privacy compliance
- ✅ `requestTrackingAuthorization()` - iOS ATT (App Tracking Transparency) support

#### capacitor-meta-sdk (Minimal)
- ✅ `logEvent()` - Log custom events with parameters only
- ❌ No initialization method
- ❌ No user ID management
- ❌ No data processing options
- ❌ No explicit ATT request method (handles it automatically in init)

### 2. **Architecture & Code Quality**

#### capacitor-meta-ads
- **Language**: Kotlin (Android), Swift (iOS)
- **Structure**: Standard Capacitor plugin structure
- **Registration**: Uses Objective-C `.m` file for iOS method registration
- **Initialization**: Manual SDK initialization with proper error handling
- **Logger Management**: Lazy initialization pattern for Android logger

#### capacitor-meta-sdk
- **Language**: Java (Android), Swift (iOS)
- **Structure**: More modern structure with separate implementation classes
- **Registration**: Uses `CAPBridgedPlugin` protocol (newer Capacitor approach)
- **Initialization**: Automatic SDK initialization in constructor
- **Logger Management**: Creates new logger instance per event

### 3. **iOS Implementation**

#### capacitor-meta-ads
```swift
- Manual SDK initialization in load() and initialize()
- Explicit ATT request via requestTrackingAuthorization()
- Proper parameter conversion for AppEvents
- Supports all Facebook SDK features
```

#### capacitor-meta-sdk
```swift
- Automatic SDK initialization in CapacitorMetaSdk.init()
- Automatic ATT request on initialization
- Listens for app lifecycle events (didBecomeActive)
- Handles URL schemes for deep linking
- Simpler, more opinionated approach
```

### 4. **Android Implementation**

#### capacitor-meta-ads
- **SDK Version**: 17.0.0 (older, more stable)
- **Dependencies**: 
  - `facebook-core:17.0.0`
  - `facebook-applinks:17.0.0`
  - `facebook-marketing:17.0.0`
- **Language**: Kotlin
- **Features**: Full SDK initialization, user ID management, data processing options

#### capacitor-meta-sdk
- **SDK Version**: 18.0.3 (newer)
- **Dependencies**: 
  - `facebook-android-sdk:18.0.3` (all-in-one)
- **Language**: Java
- **Features**: Event logging only, simpler implementation
- **Requires**: eventValues to be non-null (strict validation)

### 5. **API Design**

#### capacitor-meta-ads
```typescript
logEvent({ name: string, params?: Record<string, any> })
// params is optional
```

#### capacitor-meta-sdk
```typescript
logEvent({ eventName: string, eventValues?: Record<string, any> })
// eventValues is optional in TS but required in native (validation issue)
```

### 6. **Build & Distribution**

#### capacitor-meta-ads
- Simple TypeScript compilation (`tsc`)
- Basic package.json structure
- Manual file inclusion

#### capacitor-meta-sdk
- Uses Rollup for bundling (multiple output formats)
- More sophisticated build pipeline
- Includes docgen for API documentation
- Has linting/formatting setup (ESLint, Prettier, SwiftLint)
- Better structured for publishing

### 7. **Dependencies & Versions**

#### capacitor-meta-ads
- Capacitor 7.x
- Facebook SDK iOS: Latest (via CocoaPods)
- Facebook SDK Android: 17.0.0
- TypeScript 5.0

#### capacitor-meta-sdk
- Capacitor 7.x
- Facebook SDK iOS: ~8.0.0 (includes LoginKit, ShareKit)
- Facebook SDK Android: 18.0.3
- TypeScript ~4.1.5

### 8. **iOS Podspec**

#### capacitor-meta-ads
- Only includes `FBSDKCoreKit` and `FBSDKCoreKit/AppEvents`
- Focused on App Events functionality

#### capacitor-meta-sdk
- Includes `FBSDKCoreKit`, `FBSDKLoginKit`, `FBSDKShareKit`
- More comprehensive SDK integration

### 9. **Error Handling**

#### capacitor-meta-ads
- Proper error messages for missing parameters
- Optional parameters handled gracefully
- Better null safety

#### capacitor-meta-sdk
- Strict validation (rejects if eventValues is null)
- Less flexible API

### 10. **Use Cases**

#### capacitor-meta-ads
**Best for:**
- Full-featured analytics and advertising
- Apps requiring GDPR compliance features
- Apps needing user ID tracking
- Apps that need explicit control over SDK initialization
- Production apps with complex tracking requirements

#### capacitor-meta-sdk
**Best for:**
- Simple event logging only
- Quick integration
- Apps that want automatic SDK setup
- Simpler use cases

## Summary Table

| Feature | capacitor-meta-ads | capacitor-meta-sdk |
|---------|-------------------|-------------------|
| **Methods** | 5 (initialize, logEvent, setUserID, setDataProcessingOptions, requestTrackingAuthorization) | 1 (logEvent) |
| **SDK Initialization** | Manual, explicit | Automatic |
| **ATT Support** | Explicit method | Automatic on init |
| **User ID Management** | ✅ Yes | ❌ No |
| **GDPR Compliance** | ✅ Yes | ❌ No |
| **Android Language** | Kotlin | Java |
| **Android SDK Version** | 17.0.0 | 18.0.3 |
| **iOS SDK Version** | Latest | ~8.0.0 |
| **Build System** | Simple (tsc) | Advanced (Rollup) |
| **Documentation** | Basic | Auto-generated |
| **Code Quality Tools** | Basic | Comprehensive (ESLint, Prettier, SwiftLint) |
| **Flexibility** | High | Low |
| **Complexity** | Medium | Low |

## Recommendations

### Choose capacitor-meta-ads if:
- You need full control over SDK initialization
- You need user ID tracking
- You need GDPR compliance features
- You prefer Kotlin for Android
- You want a more feature-complete solution
- You need explicit ATT handling

### Choose capacitor-meta-sdk if:
- You only need simple event logging
- You prefer automatic SDK setup
- You want a simpler, minimal plugin
- You prefer Java for Android
- You want better build tooling and documentation
- You're okay with less control

## Potential Improvements

### For capacitor-meta-ads:
- Add Rollup for better bundling
- Add linting/formatting tools
- Add auto-generated documentation
- Consider updating Android SDK to 18.x
- Add more comprehensive error handling

### For capacitor-meta-sdk:
- Add initialization method
- Add user ID management
- Add data processing options
- Make eventValues truly optional
- Add more comprehensive features

