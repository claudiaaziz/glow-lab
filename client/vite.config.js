import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for both development and production
export default defineConfig({
	plugins: [react()],
	server: {
		// Proxy settings only in development
		proxy: {
			'/api': 'http://localhost:3000',
			'/stripe': 'http://localhost:3000',
		},
	},
});
