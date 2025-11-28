import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "@fullcalendar/react",
      "@fullcalendar/daygrid",
      "@fullcalendar/timegrid",
      "@fullcalendar/interaction"
    ]
  }
});
