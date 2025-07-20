import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // This option tells Vite to process .js files with JSX support
      include: '**/*.{js,jsx,ts,tsx}',
    }),
  ],
});
