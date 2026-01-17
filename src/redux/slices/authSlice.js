import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userId: null,
    deviceId: null,
    sessionExpired: false, // ✅ ADD THIS
  },
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.deviceId = action.payload.deviceId;
      state.sessionExpired = false;
    },
    logout: state => {
      state.token = null;
      state.userId = null;
      state.deviceId = null;
      state.sessionExpired = false;
    },
    sessionExpired: state => {
      state.sessionExpired = true; // ❗ token अभी नहीं हटेगा
    },
  },
});

export const { setAuthData, logout, sessionExpired } = authSlice.actions;
export default authSlice.reducer;
