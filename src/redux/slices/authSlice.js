import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    deviceId: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.deviceId = action.payload.deviceId;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.deviceId = null;
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
