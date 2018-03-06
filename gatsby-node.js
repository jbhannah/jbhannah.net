exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'develop') {
    config.preLoader('eslint-loader', {
      test: /\.js$/,
      exclude: /node_modules/
    })
    config.merge({
      eslint: {
        emitWarning: true
      }
    })
  }
  return config
}
