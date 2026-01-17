import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

/* =========================================================
   ✅ SEND OTP (FORGOT PASSWORD)
   ========================================================= */
export const forgotPasswordAPI = createAsyncThunk(
  'auth/forgotPasswordAPI',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/otpforgot-password`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (response.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Network error');
    }
  },
);

/* =========================================================
   ✅ VERIFY OTP
   ========================================================= */
export const verifyOtpAPI = createAsyncThunk(
  'forgotPassword/verifyOtpAPI',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/otpverify-otp`,
        { email, otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response.data;

      // ✅ success condition
      if (data?.status === true || data?.success === true) {
        return data;
      }

      return rejectWithValue(data?.message || 'Invalid OTP');
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Network error');
    }
  },
);

/* =========================================================
   ✅ RESET PASSWORD
   ========================================================= */
export const resetPasswordAPI = createAsyncThunk(
  'forgotPassword/resetPasswordAPI',
  async ({ email, password, password_confirmation }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/otpreset-password`, {
        email,
        password,
        password_confirmation,
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data)
        return rejectWithValue(err.response.data);
      return rejectWithValue({ message: err.message });
    }
  },
);

/* =========================================================
   ✅ SLICE
   ========================================================= */
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null, // send OTP response
    verifyData: null, // verify OTP response
    resetData: null, // reset password response
  },

  reducers: {
    resetForgotPasswordState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
      state.verifyData = null;
      state.resetData = null;
    },
  },
  extraReducers: builder => {
    /* ================= SEND OTP ================= */
    builder
      .addCase(forgotPasswordAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload; // 🔥 data saved like cart
      })
      .addCase(forgotPasswordAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ================= VERIFY OTP ================= */
    builder
      .addCase(verifyOtpAPI.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(verifyOtpAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.verifyData = action.payload;
      })
      .addCase(verifyOtpAPI.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    /* ================= RESET PASSWORD ================= */
    builder
      .addCase(resetPasswordAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.resetData = action.payload;
      })
      .addCase(resetPasswordAPI.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || 'Something went wrong';
      });
  },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
