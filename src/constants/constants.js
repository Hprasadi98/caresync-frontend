
const base =
  Platform.OS === "android" ? "http://10.10.28.233" : "http://localhost";
const port = 4012;
export const baseUrl = `${base}:${port}/api`;

