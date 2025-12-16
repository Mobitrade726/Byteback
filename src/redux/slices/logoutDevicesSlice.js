// // // src/redux/slices/logoutDevicesSlice.js

// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { API_BASE_URL } from '../../utils/utils';
// // import { useSelector } from 'react-redux';

// // const token = useSelector(state => state.auth.token);
// // const userId = useSelector(state => state.auth.userId);

// // // ---------------------------------------------
// // // ✅ FETCH DEVICES (GET API)
// // // ---------------------------------------------
// // export const fetchDevicesAPI = createAsyncThunk(
// //   'logout/fetchDevicesAPI',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(
// //         `${API_BASE_URL}/buyerLoginHistory/${userId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: 'application/json',
// //           },
// //         },
// //       );

// //       if (response.data.status) {
// //         return response.data.data.map((item, index) => ({
// //           id: item.id.toString(),
// //           name: item.device_type || `Device ${index + 1}`,
// //           location: `${item.city}, ${item.state}`,
// //           lastActive: item.login_time,
// //           device_id: item.device_id,
// //         }));
// //       } else {
// //         return rejectWithValue('Failed to load devices');
// //       }
// //     } catch (err) {
// //       return rejectWithValue(err.response?.data || 'Error loading devices');
// //     }
// //   },
// // );

// // // ---------------------------------------------
// // // ✅ LOGOUT SINGLE DEVICE
// // // ---------------------------------------------
// // export const logoutSingleDeviceAPI = createAsyncThunk(
// //   'logout/logoutSingleDeviceAPI',
// //   async (device_id, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         `${API_BASE_URL}/logout`,
// //         { user_id: userId, device_id: device_id },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: 'application/json',
// //             'Content-Type': 'application/json',
// //           },
// //         },
// //       );

// //       if (response.data.status) {
// //         await AsyncStorage.removeItem('TOKEN');
// //         await AsyncStorage.removeItem('USERID');
// //         return response.data.message;
// //       } else {
// //         return rejectWithValue(response.data.message || 'Logout failed');
// //       }
// //     } catch (error) {
// //       if (error?.response?.status === 401) {
// //         return rejectWithValue('TOKEN_EXPIRED');
// //       }
// //       return rejectWithValue(error.response?.data || 'Logout error');
// //     }
// //   },
// // );

// // // ---------------------------------------------
// // // ✅ LOGOUT ALL DEVICES
// // // ---------------------------------------------
// // export const logoutAllDevicesAPI = createAsyncThunk(
// //   'logout/logoutAllDevicesAPI',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         `${API_BASE_URL}/alllogoutdevices`,
// //         { user_id: userId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: 'application/json',
// //           },
// //         },
// //       );

// //       if (response.data.status) {
// //         await AsyncStorage.removeItem('TOKEN');
// //         await AsyncStorage.removeItem('USERID');

// //         return response.data.message;
// //       } else {
// //         return rejectWithValue(response.data.message || 'Logout failed');
// //       }
// //     } catch (error) {
// //       if (error?.response?.status === 401) {
// //         return rejectWithValue('TOKEN_EXPIRED');
// //       }
// //       return rejectWithValue(error.response?.data || 'Error logging out');
// //     }
// //   },
// // );

// // // ----------------------------------------------------
// // // SLICE
// // // ----------------------------------------------------
// // const logoutDevicesSlice = createSlice({
// //   name: 'logoutDevices',
// //   initialState: {
// //     devices: [],
// //     loading: false,
// //     error: null,
// //   },
// //   extraReducers: builder => {
// //     // GET DEVICES
// //     builder.addCase(fetchDevicesAPI.pending, state => {
// //       state.loading = true;
// //     });
// //     builder.addCase(fetchDevicesAPI.fulfilled, (state, action) => {
// //       state.loading = false;
// //       state.devices = action.payload;
// //     });
// //     builder.addCase(fetchDevicesAPI.rejected, (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     });

// //     // LOGOUT SINGLE
// //     builder.addCase(logoutSingleDeviceAPI.fulfilled, state => {
// //       state.devices = []; // empty after logout
// //     });

// //     // LOGOUT ALL
// //     builder.addCase(logoutAllDevicesAPI.fulfilled, state => {
// //       state.devices = []; // empty after logout
// //     });
// //   },
// // });

// // export default logoutDevicesSlice.reducer;

// // src/redux/slices/logoutDevicesSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../../utils/utils';

// // -------------------------------------------------------------
// // GET DEVICES
// // -------------------------------------------------------------
// export const fetchDevicesAPI = createAsyncThunk(
//   'logout/fetchDevicesAPI',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token;
//       const userId = state.auth.userId;

//       const response = await axios.get(
//         `${API_BASE_URL}/buyerLoginHistory/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );

//       if (response.data.status) {
//         return response.data.data.map((item, index) => ({
//           id: item.id.toString(),
//           name: item.device_type || `Device ${index + 1}`,
//           location: `${item.city}, ${item.state}`,
//           lastActive: item.login_time,
//           device_id: item.device_id,
//         }));
//       } else {
//         return rejectWithValue('Failed to load devices');
//       }
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'Error loading devices');
//     }
//   },
// );

// // -------------------------------------------------------------
// // LOGOUT SINGLE DEVICE
// // -------------------------------------------------------------
// export const logoutSingleDeviceAPI = createAsyncThunk(
//   'logout/logoutSingleDeviceAPI',
//   async (device_id, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token;
//       const userId = state.auth.userId;

//       const response = await axios.post(
//         `${API_BASE_URL}/logout`,
//         { user_id: userId, device_id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.data.status) {
//         await AsyncStorage.removeItem('TOKEN');
//         await AsyncStorage.removeItem('USERID');
//         return response.data.message;
//       } else {
//         return rejectWithValue(response.data.message || 'Logout failed');
//       }
//     } catch (error) {
//       if (error?.response?.status === 401) {
//         return rejectWithValue('TOKEN_EXPIRED');
//       }
//       return rejectWithValue(error.response?.data || 'Logout error');
//     }
//   },
// );

// // -------------------------------------------------------------
// // LOGOUT ALL
// // -------------------------------------------------------------
// export const logoutAllDevicesAPI = createAsyncThunk(
//   'logout/logoutAllDevicesAPI',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token;
//       const userId = state.auth.userId;

//       const response = await axios.post(
//         `${API_BASE_URL}/alllogoutdevices`,
//         { user_id: userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );

//       if (response.data.status) {
//         await AsyncStorage.removeItem('TOKEN');
//         await AsyncStorage.removeItem('USERID');

//         return response.data.message;
//       } else {
//         return rejectWithValue(response.data.message || 'Logout failed');
//       }
//     } catch (error) {
//       if (error?.response?.status === 401) {
//         return rejectWithValue('TOKEN_EXPIRED');
//       }
//       return rejectWithValue(error.response?.data || 'Error logging out');
//     }
//   },
// );

// // -------------------------------------------------------------
// // SLICE
// // -------------------------------------------------------------
// const logoutDevicesSlice = createSlice({
//   name: 'logoutDevices',
//   initialState: {
//     devices: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: builder => {
//     builder.addCase(fetchDevicesAPI.pending, state => {
//       state.loading = true;
//     });
//     builder.addCase(fetchDevicesAPI.fulfilled, (state, action) => {
//       state.loading = false;
//       state.devices = action.payload;
//     });
//     builder.addCase(fetchDevicesAPI.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     builder.addCase(logoutSingleDeviceAPI.fulfilled, state => {
//       state.devices = [];
//     });

//     builder.addCase(logoutAllDevicesAPI.fulfilled, state => {
//       state.devices = [];
//     });
//   },
// });

// export default logoutDevicesSlice.reducer;

// src/redux/slices/logoutDevicesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../utils/utils';
import { logout } from './authSlice';

// -------------------------------------------------------------
// ✅ FETCH DEVICES
// -------------------------------------------------------------
export const fetchDevicesAPI = createAsyncThunk(
  'logout/fetchDevicesAPI',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const userId = state.auth.userId;

      const response = await axios.get(
        `${API_BASE_URL}/buyerLoginHistory/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.status) {
        return response.data.data.map((item, index) => ({
          id: item.id.toString(),
          name: item.device_type || `Device ${index + 1}`,
          location: `${item.city}, ${item.state}`,
          lastActive: item.login_time,
          device_id: item.device_id,
        }));
      } else {
        return rejectWithValue('Failed to load devices');
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error loading devices');
    }
  },
);

// -------------------------------------------------------------
// ✅ LOGOUT SINGLE DEVICE
// -------------------------------------------------------------
export const logoutSingleDeviceAPI = createAsyncThunk(
  'logout/logoutSingleDeviceAPI',
  async (device_id, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const userId = state.auth.userId;

      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        { user_id: userId, device_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status) {
        // ✅ Remove token & user data from AsyncStorage
        dispatch(logout()); // 🔥 Redux clear

        return response.data.message;
      } else {
        return rejectWithValue(response.data.message || 'Logout failed');
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return rejectWithValue('TOKEN_EXPIRED');
      }
      return rejectWithValue(error.response?.data || 'Logout error');
    }
  },
);

// -------------------------------------------------------------
// ✅ LOGOUT ALL DEVICES
// -------------------------------------------------------------
export const logoutAllDevicesAPI = createAsyncThunk(
  'logout/logoutAllDevicesAPI',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const userId = state.auth.userId;

      const response = await axios.post(
        `${API_BASE_URL}/alllogoutdevices`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.status) {
        // ✅ Remove token & user data from AsyncStorage
        dispatch(logout()); // 🔥 Redux clear

        return response.data.message;
      } else {
        return rejectWithValue(response.data.message || 'Logout failed');
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return rejectWithValue('TOKEN_EXPIRED');
      }
      return rejectWithValue(error.response?.data || 'Error logging out');
    }
  },
);

// -------------------------------------------------------------
// ✅ SLICE
// -------------------------------------------------------------
const logoutDevicesSlice = createSlice({
  name: 'logoutDevices',
  initialState: {
    devices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // FETCH DEVICES
    builder.addCase(fetchDevicesAPI.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchDevicesAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.devices = action.payload;
    });
    builder.addCase(fetchDevicesAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // LOGOUT SINGLE
    builder.addCase(logoutSingleDeviceAPI.fulfilled, state => {
      state.devices = [];
    });

    // LOGOUT ALL
    builder.addCase(logoutAllDevicesAPI.fulfilled, state => {
      state.devices = [];
    });
  },
});

export default logoutDevicesSlice.reducer;
