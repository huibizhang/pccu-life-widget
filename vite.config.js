import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

console.log(process.env.NODE_ENV)

const getConfig = () => {
  return (
    process.env.NODE_ENV === "production"
    ?
    {
      base: path.resolve(__dirname, './dist/'),
      plugins: [vue()]
    }
    :
    {
      plugins: [vue()]
    }
  )
}

// https://vitejs.dev/config/
export default defineConfig(getConfig())
