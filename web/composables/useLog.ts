export const authLogs = (userId: string, event: 'Login' | 'Logout') => ({
	browser: 'Test',
	event,
	ip_address: '127.0.0.1',
	user: {
		connect: userId.toString(),
	},
});
