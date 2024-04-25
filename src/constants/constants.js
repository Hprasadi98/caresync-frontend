const base =
  Platform.OS === "android" ? "http://192.168.8.106" : "http://localhost";
const port = 4000;
export const baseUrl = `${base}:${port}/api`;
