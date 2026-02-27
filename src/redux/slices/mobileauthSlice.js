import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { API_BASE_URL } from '../../utils/utils';

// ✅ Check Phone API
export const checkPhone = createAsyncThunk(
  'mobileauth/checkPhone',
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/check-phone`, {
        phone: mobile, // ✅ IMPORTANT CHANGE
      });
      return response.data;
    } catch (error) {
      console.log('check phone error --->', error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || 'Mobile check failed',
      );
    }
  },
);

// ✅ SEND OTP
export const sendOtp = createAsyncThunk(
  'mobileauth/sendOtp',
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mobilesend-otp`, {
        mobile,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('OTP Send Failed');
    }
  },
);

// ✅ VERIFY OTP
export const verifyOtp = createAsyncThunk(
  'mobileauth/verifyOtp',
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mobileverify-otp`, {
        mobile,
        otp,
      });

      const token = response?.data?.token;
      const userId = response?.data?.buyer?.id;
      const deviceId = await DeviceInfo.getUniqueId();
      return { token, userId, deviceId };
    } catch (error) {
      return rejectWithValue('Invalid OTP');
    }
  },
);

// ✅ RESEND OTP
export const resendOtp = createAsyncThunk(
  'mobileauth/resendOtp',
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mobileresend-otp`, {
        mobile,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Resend failed');
    }
  },
);

const mobileauthSlice = createSlice({
  name: 'mobileauth',
  initialState: {
    token: null,
    userId: null,
    deviceId: null,
    isSessionExpired: false,
    loading: false,
    error: null,
  },

  reducers: {
    logout: state => {
      state.token = null;
      state.userId = null;
      state.deviceId = null;
      state.isSessionExpired = false;
    },

    setSessionExpired: state => {
      state.isSessionExpired = true;
    },
  },

  extraReducers: builder => {
    builder

      // ✅ Check Phone
      .addCase(checkPhone.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkPhone.fulfilled, state => {
        state.loading = false;
      })
      .addCase(checkPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEND OTP
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY OTP
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.deviceId = action.payload.deviceId;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESEND OTP
      .addCase(resendOtp.pending, state => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, state => {
        state.loading = false;
      });
  },
});

export const { logout, setSessionExpired } = mobileauthSlice.actions;

export default mobileauthSlice.reducer;
