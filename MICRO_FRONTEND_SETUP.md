# Micro-Frontend Implementation Guide

## Overview
This guide explains how to integrate the React mapping app (`https://react-mapping-app-7777.web.app/remoteEntry.js`) into your Angular portfolio application using micro-frontend architecture.

## Implementation Approaches

### 1. Module Federation (Recommended)
**Pros:**
- Native Angular support
- Better performance than iframe
- Type safety maintained
- Seamless integration

**Cons:**
- Requires additional setup
- More complex configuration

### 2. Iframe Integration (Current Implementation)
**Pros:**
- Simple to implement
- Works immediately
- No additional dependencies
- Isolated execution

**Cons:**
- Limited communication between apps
- Performance overhead
- Security restrictions

### 3. Web Components Bridge
**Pros:**
- Framework agnostic
- Good encapsulation
- Standard web technology

**Cons:**
- Requires React app to be wrapped in web components
- Additional complexity

## Current Implementation

### Files Created:
1. `src/app/features/mapping/mapping.component.ts` - Main mapping component
2. `src/app/features/mapping/mapping.component.html` - Template
3. `src/app/features/mapping/mapping.component.scss` - Styles
4. `src/app/shared/pipes/safe-url.pipe.ts` - URL sanitization pipe
5. `src/app/core/services/micro-frontend.service.ts` - Service for Module Federation
6. `webpack.config.js` - Module Federation configuration

### Route Added:
- `/mapping` - Access the mapping feature

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install @angular-architects/module-federation
```

### Step 2: Configure Module Federation
The `webpack.config.js` file is already created with the basic configuration.

### Step 3: Update Angular Configuration
Add to `angular.json`:
```json
{
  "architect": {
    "build": {
      "builder": "@angular-architects/module-federation/webpack",
      "options": {
        "webpackConfig": "webpack.config.js"
      }
    }
  }
}
```

### Step 4: Test the Implementation
1. Start the development server: `npm start`
2. Navigate to `/mapping`
3. The React mapping app should load in an iframe

## Advanced Module Federation Setup

### 1. Update package.json
```json
{
  "dependencies": {
    "@angular-architects/module-federation": "^16.0.0"
  }
}
```

### 2. Create bootstrap file
Create `src/bootstrap.ts`:
```typescript
import('./main').catch(err => console.error(err));
```

### 3. Update main.ts
```typescript
import('./bootstrap').catch(err => console.error(err));
```

### 4. Configure shared dependencies
In `webpack.config.js`:
```javascript
shared: {
  ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  // Add specific shared dependencies
  'react': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  'react-dom': { singleton: true, strictVersion: true, requiredVersion: 'auto' }
}
```

## Communication Between Apps

### Iframe Communication
```typescript
// Send message to React app
this.mappingIframe.nativeElement.contentWindow.postMessage({
  type: 'UPDATE_MAP',
  data: { lat: 40.7128, lng: -74.0060 }
}, 'https://react-mapping-app-7777.web.app');

// Listen for messages from React app
window.addEventListener('message', (event) => {
  if (event.origin === 'https://react-mapping-app-7777.web.app') {
    console.log('Message from React app:', event.data);
  }
});
```

### Module Federation Communication
```typescript
// Load and use React component
const ReactComponent = await this.microFrontendService.loadReactMappingAppComponent({
  containerId: 'mapping-container',
  props: { lat: 40.7128, lng: -74.0060 }
});
```

## Security Considerations

1. **CSP Headers**: Ensure Content Security Policy allows the React app domain
2. **URL Sanitization**: Use the SafeUrlPipe for iframe URLs
3. **Cross-Origin**: Handle CORS issues between domains
4. **Message Validation**: Validate all postMessage communications

## Performance Optimization

1. **Lazy Loading**: The mapping component is already lazy-loaded
2. **Caching**: Implement caching for the React app bundle
3. **Preloading**: Consider preloading the mapping component for better UX

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure the React app allows your domain
2. **Module Federation Loading**: Check webpack configuration
3. **Iframe Security**: Verify CSP headers
4. **Performance**: Monitor bundle sizes and loading times

### Debug Commands:
```bash
# Check if Module Federation is working
npm run build -- --verbose

# Test the mapping route
npm start
# Navigate to http://localhost:4200/mapping
```

## Next Steps

1. **Implement Module Federation**: Follow the advanced setup
2. **Add Communication**: Implement message passing between apps
3. **Optimize Performance**: Add caching and preloading
4. **Add Error Handling**: Implement fallback mechanisms
5. **Testing**: Add unit and integration tests

## Resources

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Angular Micro-Frontends](https://angular-architects.io/angular-micro-frontend/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 