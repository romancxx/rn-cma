const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [".."],
      alias: {
        "@screens": "./src/screens",
        "@locales": "./src/locales",
        "@components": "./src/components",
        "@assets": "./src/assets",
        "@navigation": "./src/navigation",
        "@api": "./src/api",
        "@states": "./src/states",
        "@services": "./src/services",
      }
    }
  ]
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...plugins],
};
