// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../../utils/utils';
// import { useSelector } from 'react-redux';

// const token = useSelector(state => state.auth.token);

// // Async thunk to fetch profile
// export const fetchProfile = createAsyncThunk(
//   'profile/fetchProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       if (!token) throw new Error('Token not found');

//       const response = await axios.get(`${API_BASE_URL}/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data?.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     data: [],
//     loading: false,
//     error: [],
//   },
//   reducers: {
//     clearProfile: state => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchProfile.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearProfile } = profileSlice.actions;
// export default profileSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// ==========================================
// ✅ Sahi: useSelector hata do
// ==========================================

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      // ==========================================
      // ✔️ Token yahin se lo – getState()
      // ==========================================
      const token = getState().auth.token;

      if (!token) throw new Error('Token not found');

      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data?.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
