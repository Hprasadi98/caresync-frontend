const base = Platform.OS === 'android' ? 'http:// 192.168.96.128' : 'http://localhost';
const port = 4010;
export const baseUrl = `${base}:${port}/api`
