import axios from 'axios';

export default defineNuxtPlugin(() => {
	axios.defaults.withCredentials = true;
	axios.defaults.baseURL = 'https://pos.markethub.blog';
	// axios.defaults.baseURL = 'http://localhost:8000'
	// axios.defaults.baseURL = useRuntimeConfig().public.API_URL;

	return {
		provide: {
			axios: axios,
		},
	};
});
