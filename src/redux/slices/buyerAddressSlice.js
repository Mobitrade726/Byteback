// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSelector } from 'react-redux';
// const token = useSelector(state => state.auth.token);
// const userId = useSelector(state => state.auth.userId);

// export const fetchBuyerAddress = createAsyncThunk(
//   'buyerAddress/fetchBuyerAddress',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `https://api.mobitrade.in/api/buyer-address/${userId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// const buyerAddressSlice = createSlice({
//   name: 'buyerAddress',
//   initialState: {
//     addresses: [],
//     loading: false,
//     error: [],
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchBuyerAddress.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchBuyerAddress.fulfilled, (state, action) => {
//         state.loading = false;
//         state.addresses = action.payload.data || [];
//       })
//       .addCase(fetchBuyerAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default buyerAddressSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 🔥 Helper function to get token + userID
const getAuth = (getState) => {
  const state = getState();
  return {
    token: state.auth?.token,
    userId: state.auth?.userId,
  };
};

// ============================
// 📌 Fetch Buyer Address API
// ============================
export const fetchBuyerAddress = createAsyncThunk(
  'buyerAddress/fetchBuyerAddress',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getAuth(getState);

      const response = await axios.get(
        `https://api.mobitrade.in/api/buyer-address/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ============================
// 📌 Slice
// ============================
const buyerAddressSlice = createSlice({
  name: 'buyerAddress',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchBuyerAddress.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBuyerAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.data || [];
      })
      .addCase(fetchBuyerAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerAddressSlice.reducer;

