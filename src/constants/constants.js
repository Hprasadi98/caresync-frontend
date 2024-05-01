
const base =



  Platform.OS === "android" ? "http://10.10.0.128" : "http://localhost";

const port = 4000;
export const baseUrl = `${base}:${port}/api`;

