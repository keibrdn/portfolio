import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  const projectId = env.VITE_SANITY_PROJECT_ID
  const proxyTarget = projectId ? `https://${projectId}.api.sanity.io` : null

  return {
    plugins: [react()],
    server: {
      // Same-origin proxy so the browser never hits *.api.sanity.io directly in dev (avoids CORS).
      proxy: proxyTarget
        ? {
            '/__sanity': {
              target: proxyTarget,
              changeOrigin: true,
              secure: true,
              rewrite: (pathStr) => pathStr.replace(/^\/__sanity/, ''),
            },
          }
        : undefined,
    },
  }
})
