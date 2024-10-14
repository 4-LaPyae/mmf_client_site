// Define an API configuration object
export const apiConfig = {
	//baseUrl: 'http://127.0.0.1:8000/api', // Base URL for the API obtained from environment variables
	 baseUrl: 'http://backend.mmfmyanmar.com/api', // Base URL for the API obtained from environment variables
	prepareHeaders: async (headers) => {
		const token = await JSON.parse(localStorage.getItem('reduxState'))?.user
			?.token;
		const language = await localStorage.getItem('i18nextLng');

		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
			headers.set('Cache-Control', 'no-cache');
			headers.set('Accept-Language', language);
		}
		return headers;
	},
};
