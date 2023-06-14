import { defineConfig } from "vite";
import envalid from "envalid";
import react from "@vitejs/plugin-react-swc";

const env = envalid.cleanEnv(process.env, {
  PROXY_TARGET: envalid.url({
    desc: "Proxy Sidecar base url",
    default: "http://localhost:8080"
  }),
  BASE_URL: envalid.str({
    desc: "Base url or prefix to routes that targets the Proxy Sidecar",
    default: "/v1/graphql"
  })
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      [env.BASE_URL]: {
        target: env.PROXY_TARGET,
        changeOrigin: true,
        secure: false
      }
    }
  }
});
