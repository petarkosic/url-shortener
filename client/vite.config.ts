import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for docker container port mapping to work
		strictPort: true,
		port: 3000, // any port will do
	},
});
