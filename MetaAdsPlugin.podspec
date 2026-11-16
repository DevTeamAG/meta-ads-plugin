Pod::Spec.new do |s|
    s.name = 'MetaAdsPlugin'
    s.version = '0.2.0'
    s.summary = 'Capacitor bridge for Meta (Facebook) iOS SDK'
    s.description = 'Capacitor plugin that initializes Facebook SDK and exposes AppEvents for iOS.'
    s.author = { 'Your Name' => 'you@example.com' }
    s.homepage = 'https://github.com/yourorg/capacitor-meta-ads'
    s.license = { :type => 'MIT' }
    s.platform = :ios, '14.0'
    s.source = { :git => 'https://github.com/yourorg/capacitor-meta-ads.git', :tag => s.version }
    
    
    # Capacitor dependency
    s.dependency 'Capacitor'
    
    # Core SDK modules: adjust depending on needs
    s.dependency 'FBSDKCoreKit'
    
    # Source files - updated paths to reference ios/ directory from root
    s.source_files = 'ios/Plugin/**/*.{swift,h,m}'
    s.public_header_files = 'ios/Plugin/**/*.h'
    
    # If you need other parts (Login, Share, Ads), add:
    # s.dependency 'FBSDKLoginKit'
    # s.dependency 'FBSDKShareKit'
end

