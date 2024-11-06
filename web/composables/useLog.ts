export const authLogs = (userId: string, event: 'Login' | 'Logout') => ({
    ip_address: '127.0.0.1',
    browser: 'Test',
    event,
    user: {
        connect: userId.toString(),
    },
});
