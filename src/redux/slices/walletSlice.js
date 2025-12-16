// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../../utils/utils';
// import { useSelector } from 'react-redux';

// const token = useSelector(state => state.auth.token);
// const userId = useSelector(state => state.auth.userId);

// // ✅ Fetch Wallet Balance
// export const fetchWalletBalance = createAsyncThunk(
//   'wallet/fetchWalletBalance',
//   async (_, { rejectWithValue }) => {
//     try {

//       const payload = {
//         buyer_id: userId,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/wallet/balance`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return response?.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Error fetching balance');
//     }
//   },
// );
// // ✅ Fetch Latest history
// export const fetchLatestWalletHistory = createAsyncThunk(
//   'wallet/fetchLatestWalletHistory',
//   async (_, { rejectWithValue }) => {
//     try {

//       const url = `${API_BASE_URL}/wallet/latesthistory/${userId}`;

//       const response = await axios.get(url, {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response?.data?.transactions;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Error fetching wallet history',
//       );
//     }
//   },
// );

// // ✅ Update Wallet After Razorpay Payment
// export const updateWalletAfterPayment = createAsyncThunk(
//   'wallet/updateWalletAfterPayment',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/wallet/verify`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Error updating wallet');
//     }
//   },
// );

// export const fetchLedgerBalance = createAsyncThunk(
//   'ledger/fetchLedgerHistory',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/ledgerlatesthistory/${userId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return response?.data?.ledger;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// const walletSlice = createSlice({
//   name: 'wallet',
//   initialState: {
//     balance: [],
//     latesthistory: [],
//     ledgerbalance: [],
//     loading: false,
//     error: [],
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchWalletBalance.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWalletBalance.fulfilled, (state, action) => {
//         state.loading = false;
//         state.balance = action.payload?.balance || 0; // ✅ extract balance
//       })
//       .addCase(fetchWalletBalance.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateWalletAfterPayment.fulfilled, (state, action) => {
//         state.balance = action.payload?.new_balance || state.balance;
//       })

//       // fetchLatestWalletHistory
//       .addCase(fetchLatestWalletHistory.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLatestWalletHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.latesthistory = action.payload || []; // store history in state
//       })
//       .addCase(fetchLatestWalletHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ledegbalance

//       .addCase(fetchLedgerBalance.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLedgerBalance.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ledgerbalance = action.payload;
//       })
//       .addCase(fetchLedgerBalance.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default walletSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// --------------------------------------------------
// API 1 → Fetch Wallet Balance
// --------------------------------------------------
export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchWalletBalance',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token, userId } = getState().auth; // ✅ Correct

      const payload = { buyer_id: userId };

      const response = await axios.post(
        `${API_BASE_URL}/wallet/balance`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Add token
          },
        },
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching balance');
    }
  },
);

// --------------------------------------------------
// API 2 → Latest Wallet History
// --------------------------------------------------
export const fetchLatestWalletHistory = createAsyncThunk(
  'wallet/fetchLatestWalletHistory',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token, userId } = getState().auth; // ✅

      const url = `${API_BASE_URL}/wallet/latesthistory/${userId}`;

      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data?.transactions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Error fetching wallet history',
      );
    }
  },
);

// --------------------------------------------------
// API 3 → Update Wallet After Razorpay Payment
// --------------------------------------------------
export const updateWalletAfterPayment = createAsyncThunk(
  'wallet/updateWalletAfterPayment',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth; // ✅

      const response = await axios.post(
        `${API_BASE_URL}/wallet/verify`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating wallet');
    }
  },
);

// --------------------------------------------------
// API 4 → Ledger Balance
// --------------------------------------------------
export const fetchLedgerBalance = createAsyncThunk(
  'wallet/fetchLedgerBalance',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token, userId } = getState().auth; // ✅

      const response = await axios.get(
        `${API_BASE_URL}/ledgerlatesthistory/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response?.data?.ledger;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// --------------------------------------------------
// SLICE
// --------------------------------------------------
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: [],
    latesthistory: [],
    ledgerbalance: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWalletBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload?.balance || 0;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateWalletAfterPayment.fulfilled, (state, action) => {
        state.balance = action.payload?.new_balance || state.balance;
      })

      .addCase(fetchLatestWalletHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestWalletHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.latesthistory = action.payload || [];
      })
      .addCase(fetchLatestWalletHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLedgerBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLedgerBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.ledgerbalance = action.payload;
      })
      .addCase(fetchLedgerBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
