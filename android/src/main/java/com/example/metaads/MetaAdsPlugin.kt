package com.example.metaads


import android.app.Application
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.annotation.CapacitorPlugin
import com.facebook.FacebookSdk
import com.facebook.appevents.AppEventsLogger


@CapacitorPlugin(name = "MetaAds")
class MetaAdsPlugin : Plugin() {


private var logger: AppEventsLogger? = null

private fun getLogger(): AppEventsLogger {
if (logger == null) {
val context = activity.applicationContext
logger = AppEventsLogger.newLogger(context)
}
return logger!!
}

override fun load() {
// Logger will be created lazily when needed
}


fun initialize(call: PluginCall) {
val appId = call.getString("appId")
if (appId != null) {
FacebookSdk.setApplicationId(appId)
}
FacebookSdk.fullyInitialize()
call.resolve()
}


fun logEvent(call: PluginCall) {
val name = call.getString("name")
val params = call.getObject("params")


if (name == null) {
call.reject("Missing event name")
return
}


if (params != null) {
val bundle = android.os.Bundle()
for ((k, v) in params) {
when (v) {
is String -> bundle.putString(k, v)
is Int -> bundle.putInt(k, v)
is Double -> bundle.putDouble(k, v)
is Boolean -> bundle.putBoolean(k, v)
}
}
getLogger().logEvent(name, bundle)
} else {
getLogger().logEvent(name)
}


call.resolve()
}


fun setUserID(call: PluginCall) {
val id = call.getString("userID")
AppEventsLogger.setUserID(id)
call.resolve()
}


fun setDataProcessingOptions(call: PluginCall) {
// Not used on Android
call.resolve()
}


fun requestTrackingAuthorization(call: PluginCall) {
// Android has no ATT
call.resolve(mapOf("status" to 1))
}
}