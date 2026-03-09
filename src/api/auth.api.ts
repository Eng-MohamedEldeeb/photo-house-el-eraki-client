import api from "./axios";
import type { LoginCredentials, LoginResponse } from "../types/api.types";

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>("/auth/login", credentials).then((r) => r.data),
};
