const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.watchFolders = [
  path.resolve(__dirname, 'apps'),
  path.resolve(__dirname, 'components'),
  path.resolve(__dirname, 'lib'),
  path.resolve(__dirname, 'services'),
];

module.exports = config;