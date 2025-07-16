'use strict';

const fs = require('fs');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const paths = require('./paths');
const getHttpsConfig = require('./getHttpsConfig');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy, allowedHost) {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';
  
  // Ensure allowedHosts is a valid non-empty string
  const validAllowedHost = disableFirewall ? 'all' : (allowedHost && allowedHost.trim() ? allowedHost : 'localhost');

  const httpsConfig = getHttpsConfig();

  return {
    allowedHosts: [validAllowedHost],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    compress: true,
    static: {
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      watch: {
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    client: {
      webSocketURL: {
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    host,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    proxy,
    setupMiddlewares: (middlewares, devServer) => {
      // Middleware that was in onBeforeSetupMiddleware
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(devServer.app);
      }

      // Middleware that was in onAfterSetupMiddleware
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));

      return middlewares; // Return the updated middlewares
    },
    // Ensure server configuration is properly set
    server: httpsConfig
      ? {
          type: httpsConfig.type || 'https',
          options: httpsConfig.options,
        }
      : 'http', // Default to 'http' if HTTPS is not configured
  };
};