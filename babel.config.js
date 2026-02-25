module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types'],
      ['module-resolver', {
        alias: {
          'react-native/src/private/specs/components/DebuggingOverlayNativeComponent': 'react-native/Libraries/ReactNative/EmptyComponent'
        }
      }]
    ]
  };
};
