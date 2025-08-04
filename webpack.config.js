const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'angular-portfolio',
  exposes: {
    // Expose components for other micro-frontends to consume
    './MappingComponent': './src/app/features/mapping/mapping.component.ts',
    './ReactWrapper': './src/app/features/mapping/react-wrapper.component.ts'
  },
  remotes: {
    'mappingApp': 'mappingApp@https://react-mapping-app-7777.web.app/remoteEntry.js',
  },
  shared: {
    // Share React dependencies for React remote with more flexible versioning
    'react': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    'react-dom': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    // Share common utilities that might be used by React
    'lodash': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    'axios': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    // Share webpack runtime to avoid conflicts
    '@angular/core': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: false, requiredVersion: 'auto' }
  }
}); 