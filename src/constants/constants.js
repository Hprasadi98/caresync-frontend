const base =

  Platform.OS === "android" ? "http://192.168.226.160" : "http://localhost";

const port = 4001;
export const baseUrl = `${base}:${port}/api`;
