interface User {
	id: number;
	login: string;
	custom_metadata: {
		group: string;
		role: string;
	};
}
