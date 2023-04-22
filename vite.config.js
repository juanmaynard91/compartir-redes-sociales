import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import cssnano from 'cssnano'; // npm install cssnano --save-dev
import { terser } from 'rollup-plugin-terser'; // npm install terser --save-dev - (SOLUCION: npm install rollup-plugin-terser --save-dev)

export default defineConfig({
  plugins: [vue(), terser(), cssnano()],
  base : "/compartir-redes-sociales/",
})
