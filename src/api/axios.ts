import axios from "axios";
// In Phase 2 we add the Redux store import + JWT interceptor.
// For Phase 1 we just set the base URL.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});
export default api;
