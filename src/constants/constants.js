const base = Platform.OS === "android" ? "http://192.168.139.128" : "http://localhost";

const port = 5000;

export const baseUrl = `${base}:${port}/api`;
