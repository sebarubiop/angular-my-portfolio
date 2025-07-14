const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'angular-portfolio',
  exposes: {
    // Expose any components you want to share
  },
  remotes: {
    'react-mapping-app': 'react-mapping-app@https://react-mapping-app-7777.web.app/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
}); 