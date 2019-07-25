module.exports = {
  type: 'node',
  assetPath: 'dist',
  entries: {
    index: {
      entry: './src/ContextState.jsx',
    },
  },
  plugins: ['react'],
  scriptSourceMap: false,
  injectConfig(gConfig) {
    gConfig.set('JavaScriptAssets', {
      filename: 'glove/[name].cjs.js',
    });
  },
  applyConfig({ config }) {
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM',
    };
  },
};
