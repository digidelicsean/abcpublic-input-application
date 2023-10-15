import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     pure: mode === 'production' ? ['console.log'] : [],
//   }
// })

export default defineConfig(({ mode }) => {
  return {
    // other configuration
    plugins: [react()],
    esbuild: {
      pure: mode === 'production' ? ['console.log'] : [],
    }
  }
})