module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '0.10',
        },
        exclude: ['transform-typeof-symbol', 'transform-regenerator'],
        modules: false,
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ],
  plugins: ['babel-plugin-transform-async-to-promises'],
  exclude: /node_modules/,
  ignore: [/\/core-js\//],
}
