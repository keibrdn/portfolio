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

  // Same-origin proxy — dev + vite preview on localhost (browser can't call apicdn without CORS).
  const sanityProxy = proxyTarget
    ? {
        '/__sanity': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (pathStr) => pathStr.replace(/^\/__sanity/, ''),
        },
      }
    : undefined

  return {
    plugins: [react()],
    server: {
      proxy: sanityProxy,
    },
    preview: {
      proxy: sanityProxy,
    },
  }
})
