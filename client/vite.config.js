import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
	if (command === 'serve') {
		// Development config (with proxy)
		return {
			plugins: [react()],
			server: {
				proxy: {
					'/api': 'http://localhost:3000',
					'/stripe': 'http://localhost:3000',
				},
			},
		};
	} else {
		// Production config (no proxy needed)
		return {
			plugins: [react()],
		};
	}
});
