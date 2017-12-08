cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-contacts/www/contacts.js",
        "id": "cordova-plugin-contacts.contacts",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "navigator.contacts"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/Contact.js",
        "id": "cordova-plugin-contacts.Contact",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "Contact"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/convertUtils.js",
        "id": "cordova-plugin-contacts.convertUtils",
        "pluginId": "cordova-plugin-contacts"
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactAddress.js",
        "id": "cordova-plugin-contacts.ContactAddress",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "ContactAddress"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactError.js",
        "id": "cordova-plugin-contacts.ContactError",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "ContactError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactField.js",
        "id": "cordova-plugin-contacts.ContactField",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "ContactField"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactFindOptions.js",
        "id": "cordova-plugin-contacts.ContactFindOptions",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "ContactFindOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactName.js",
        "id": "cordova-plugin-contacts.ContactName",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "ContactName"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactOrganization.js",
        "id": "cordova-plugin-contacts.ContactOrganization",
        "pluginId": "cordova-plugin-contacts",
        "clobbers": [
            "ContactOrganization"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/www/ContactFieldType.js",
        "id": "cordova-plugin-contacts.ContactFieldType",
        "pluginId": "cordova-plugin-contacts",
        "merges": [
            ""
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts/src/browser/ContactsProxy.js",
        "id": "cordova-plugin-contacts.ContactsProxy",
        "pluginId": "cordova-plugin-contacts",
        "merges": [
            "navigator.contacts"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/StatusBarProxy.js",
        "id": "cordova-plugin-statusbar.StatusBarProxy",
        "pluginId": "cordova-plugin-statusbar",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/src/browser/network.js",
        "id": "cordova-plugin-network-information.NetworkInfoProxy",
        "pluginId": "cordova-plugin-network-information",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-native-transitions/www/nativetransitions.js",
        "id": "cordova-plugin-native-transitions.NativeTransitions",
        "pluginId": "cordova-plugin-native-transitions",
        "clobbers": [
            "nativetransitions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-contacts": "3.0.1",
    "cordova-plugin-device": "2.0.1",
    "cordova-plugin-statusbar": "2.4.1",
    "cordova-plugin-network-information": "2.0.1",
    "cordova-plugin-native-transitions": "0.2.3",
    "cordova-plugin-splashscreen": "5.0.1"
}
// BOTTOM OF METADATA
});