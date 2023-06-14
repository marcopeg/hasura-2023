/**
 * WEBPACK PROXY SETUP
 * ===================
 *
 * All the backend calls are proxied to a proxy service to avoid
 * CORS issues.
 *
 * By default, you must call a "/proxy/xxx" endpoint to kick the
 * proxy service into action.
 *
 * The "/proxy" prefix will be removed in the forwarded request.
 */

const envalid = require("envalid");
const { createProxyMiddleware } = require("http-proxy-middleware");

const env = envalid.cleanEnv(process.env, {
  REACT_APP_PROXY_TARGET: envalid.url({
    desc: "Proxy Sidecar base url",
    default: "http://localhost:8080"
  }),
  REACT_APP_PROXY_BASE_URL: envalid.str({
    desc: "Base url or prefix to routes that targets the Proxy Sidecar",
    default: "/v1/graphql"
  })
});

module.exports = (app) => {
  app.use(
    `${env.REACT_APP_PROXY_BASE_URL}`,
    createProxyMiddleware({
      target: env.REACT_APP_PROXY_TARGET,
      pathRewrite: { [`^${env.REACT_APP_PROXY_BASE_URL}`]: "" }
    })
  );
};
