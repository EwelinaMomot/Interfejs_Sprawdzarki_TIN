import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//ustawienie proxy
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/tin': {
        target: 'https://bikol.vm.wmi.amu.edu.pl',
        changeOrigin: true,
        secure:false //bo server tin ma wygasly certyfikat
      }
    }
  }
})
