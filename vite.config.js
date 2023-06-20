import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/images'),
      '@slices': path.resolve(__dirname, 'src/utils/store/slices/Slices.jsx'),
      '@index': path.resolve(__dirname, 'src/index'),
      '@get': path.resolve(__dirname, 'src/utils/apis/Get.jsx'),
      '@thunk': path.resolve(__dirname, 'src/utils/store/hooks/use-thunk.jsx'),
      '@style': path.resolve(__dirname, 'src/style.js')
    }
  },
  build: {
    commonjsOptions: {
      esmExternals: true
    },
  },
})
