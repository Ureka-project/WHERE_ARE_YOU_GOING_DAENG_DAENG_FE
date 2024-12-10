import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
server: {
https: {
key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
  },
},
  plugins: [react()],
})