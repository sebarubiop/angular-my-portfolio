# Module Federation Dependencies Update

To complete the micro-frontend setup, you need to install the required dependencies:

## Install Module Federation Dependencies

```bash
npm install @angular-architects/module-federation
```

## Optional: Install React Types (if needed)

If you want to use React components directly in TypeScript:

```bash
npm install --save-dev @types/react @types/react-dom
```

## Verify Installation

After installation, you can test the micro-frontend implementation:

1. Start the development server:
   ```bash
   npm start
   ```

2. Navigate to `/mapping` in your browser

3. Check the browser console for any Module Federation related messages

## Expected Behavior

- If Module Federation is working: The React app should load directly in the container
- If Module Federation fails: The app will fallback to the iframe approach
- Loading states and error handling are implemented

## Troubleshooting

If you encounter issues:

1. Check that `@angular-architects/module-federation` is installed
2. Verify the webpack.config.js configuration
3. Check browser console for CORS or loading errors
4. Ensure the React app is accessible at the specified URL

The implementation includes fallback mechanisms, so the app will continue to work even if Module Federation is not fully configured. 