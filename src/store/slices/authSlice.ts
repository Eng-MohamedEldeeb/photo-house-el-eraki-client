import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: number;
  username: string;
}

interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  admin: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; admin: Admin }>,
    ) {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector helpers
export const selectToken = (s: { auth: AuthState }) => s.auth.token;
export const selectAdmin = (s: { auth: AuthState }) => s.auth.admin;
export const selectIsAuthenticated = (s: { auth: AuthState }) =>
  s.auth.isAuthenticated;
