module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '0.8',
        },
        exclude: ['transform-typeof-symbol', 'transform-regenerator'],
      },
    ],
  ],
  plugins: ['babel-plugin-transform-async-to-promises'],
}
