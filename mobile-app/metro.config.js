const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
config.watchFolders = [];

module.exports = withNativeWind(config, { input: './src/global.css' })