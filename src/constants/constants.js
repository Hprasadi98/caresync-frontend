const base =
  Platform.OS === "android" ? "http://192.168.107.160" : "http://localhost";

const port = 4000;

export const baseUrl = `${base}:${port}/api`;
