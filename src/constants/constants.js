
const base = Platform.OS === "android" ? "http://192.168.166.128" : "http://localhost";
const port = 7005;
export const baseUrl = `${base}:${port}/api`;
