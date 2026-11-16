package com.example.metaads

import com.facebook.FacebookSdk
import com.facebook.appevents.AppEventsLogger
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "MetaAds")
class MetaAdsPlugin : Plugin() {

    private var logger: AppEventsLogger? = null

    private fun getLogger(): AppEventsLogger {
        if (logger == null) {
            logger = AppEventsLogger.newLogger(context)
        }
        return logger!!
    }

    override fun load() {
        // Logger will be created lazily when needed
    }

    @PluginMethod
    fun initialize(call: PluginCall) {
        val appId = call.getString("appId")
        if (appId != null) {
            FacebookSdk.setApplicationId(appId)
        }
        FacebookSdk.fullyInitialize()
        call.resolve()
    }

    @PluginMethod
    fun logEvent(call: PluginCall) {
        val name = call.getString("name")
        val params = call.getObject("params")

        if (name == null) {
            call.reject("Missing event name")
            return
        }

        if (params != null) {
            val bundle = android.os.Bundle()
            val keys = params.keys()
            while (keys.hasNext()) {
                val key = keys.next()
                when (val value = params.get(key)) {
                    is String -> bundle.putString(key, value)
                    is Int -> bundle.putInt(key, value)
                    is Double -> bundle.putDouble(key, value)
                    is Boolean -> bundle.putBoolean(key, value)
                    else -> bundle.putString(key, value?.toString())
                }
            }
            getLogger().logEvent(name, bundle)
        } else {
            getLogger().logEvent(name)
        }

        call.resolve()
    }

    // Values are plain; the SDK normalizes and hashes them before sending.
    @PluginMethod
    fun setUserData(call: PluginCall) {
        AppEventsLogger.setUserData(
            call.getString("email"),
            call.getString("firstName"),
            call.getString("lastName"),
            call.getString("phone"),
            null,
            null,
            null,
            null,
            null,
            null,
        )
        call.resolve()
    }

    @PluginMethod
    fun clearUserData(call: PluginCall) {
        AppEventsLogger.clearUserData()
        call.resolve()
    }

    @PluginMethod
    fun setUserID(call: PluginCall) {
        val id = call.getString("userID")
        AppEventsLogger.setUserID(id)
        call.resolve()
    }

    @PluginMethod
    fun setDataProcessingOptions(call: PluginCall) {
        // Not used on Android
        call.resolve()
    }

    @PluginMethod
    fun requestTrackingAuthorization(call: PluginCall) {
        // Android has no ATT
        val ret = JSObject()
        ret.put("status", 1)
        call.resolve(ret)
    }
}
