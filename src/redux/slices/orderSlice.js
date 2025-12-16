// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL} from '../../utils/utils';
// import { useSelector } from 'react-redux';

//  const token = useSelector(state => state.auth.token)
// // 🧩 1️⃣ Fetch All Orders API
// export const fetchOrdersAPI = createAsyncThunk(
//   'orders/fetchOrdersAPI',
//   async (userId, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/fetchorders/${userId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   },
// );

// // 🧩 2️⃣ Fetch Order Details API
// export const fetchOrderDetailsAPI = createAsyncThunk(
//   'orders/fetchOrderDetailsAPI',
//   async (order_id, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/fetchordersdetail/${order_id}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue(response.data.message); // STRING
//       }
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         'Something went wrong';
//       return rejectWithValue(message); // also STRING
//     }
//   },
// );

// // 🧩 3️⃣ Fetch Sales Invoice Details
// export const fetchSalesInvoiceAPI = createAsyncThunk(
//   'orders/fetchSalesInvoiceAPI',
//   async (orderId, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/sales-invoice/${orderId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.data.status) {
//         return response.data.data; // API data
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// // 🧩 4️⃣ Fetch Order Status Logs API
// export const fetchOrderStatusLogsAPI = createAsyncThunk(
//   'orders/fetchOrderStatusLogsAPI',
//   async (orderId, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/order/statuslogs/${orderId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (response.data.status) {
//         return response.data; // status logs array
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         'Something went wrong';

//       return rejectWithValue(message);
//     }
//   },
// );

// // 🧩 3️⃣ Slice Definition
// const orderSlice = createSlice({
//   name: 'orders',
//   initialState: {
//     orderList: [],
//     orderStatusLogs: [],
//     orderDetails: [],
//     loading: false,
//     error: [],
//     invoiceData: [],
//   },
//   reducers: {
//     clearOrders: state => {
//       state.orderList = [];
//       state.orderDetails = null;
//       state.invoiceData = null;
//       state.orderStatusLogs = [];
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       // Fetch Orders
//       .addCase(fetchOrdersAPI.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrdersAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderList = action.payload;
//       })
//       .addCase(fetchOrdersAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch orders';
//       })

//       // Fetch Order Details
//       .addCase(fetchOrderDetailsAPI.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderDetailsAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderDetails = action.payload;
//       })
//       .addCase(fetchOrderDetailsAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch order details';
//       })

//       // Fetch Sales Invoice
//       .addCase(fetchSalesInvoiceAPI.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSalesInvoiceAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.invoiceData = action.payload;
//       })
//       .addCase(fetchSalesInvoiceAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch invoice';
//       })

//       // Fetch Order Status Logs
//       .addCase(fetchOrderStatusLogsAPI.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderStatusLogsAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderStatusLogs = action.payload;
//       })
//       .addCase(fetchOrderStatusLogsAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch status logs';
//       });
//   },
// });

// export const {clearOrders} = orderSlice.actions;
// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// ---------------------------------------------------------
// FETCH ALL ORDERS
// ---------------------------------------------------------
export const fetchOrdersAPI = createAsyncThunk(
  'orders/fetchOrdersAPI',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(
        `${API_BASE_URL}/fetchorders/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

// ---------------------------------------------------------
// FETCH ORDER DETAILS
// ---------------------------------------------------------
export const fetchOrderDetailsAPI = createAsyncThunk(
  'orders/fetchOrderDetailsAPI',
  async (order_id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(
        `${API_BASE_URL}/fetchordersdetail/${order_id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong';

      return rejectWithValue(message);
    }
  },
);

// Cancel oeder details

export const cancelOrderAPI = createAsyncThunk(
  'orders/cancelOrderAPI',
  async (order_id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(
        `${API_BASE_URL}/order/cancel/${order_id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Backend success check
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong';

      return rejectWithValue(message);
    }
  },
);

// ---------------------------------------------------------
// FETCH SALES INVOICE
// ---------------------------------------------------------
export const fetchSalesInvoiceAPI = createAsyncThunk(
  'orders/fetchSalesInvoiceAPI',
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(
        `${API_BASE_URL}/sales-invoice/${orderId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// ---------------------------------------------------------
// FETCH ORDER STATUS LOGS
// ---------------------------------------------------------
export const fetchOrderStatusLogsAPI = createAsyncThunk(
  'orders/fetchOrderStatusLogsAPI',
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(
        `${API_BASE_URL}/order/statuslogs/${orderId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong';

      return rejectWithValue(message);
    }
  },
);

// ---------------------------------------------------------
// SLICE //
// ---------------------------------------------------------
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderList: [],
    orderStatusLogs: [],
    orderDetails: [],
    loading: false,
    error: [],
    invoiceData: [],
  },
  reducers: {
    clearOrders: state => {
      state.orderList = [];
      state.orderDetails = null;
      state.invoiceData = null;
      state.orderStatusLogs = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      // FETCH ORDERS
      .addCase(fetchOrdersAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
      })
      .addCase(fetchOrdersAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })

      // FETCH ORDER DETAILS
      .addCase(fetchOrderDetailsAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetailsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetailsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch order details';
      })

      // FETCH INVOICE
      .addCase(fetchSalesInvoiceAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesInvoiceAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceData = action.payload;
      })
      .addCase(fetchSalesInvoiceAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch invoice';
      })

      // FETCH STATUS LOGS
      .addCase(fetchOrderStatusLogsAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderStatusLogsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatusLogs = action.payload;
      })
      .addCase(fetchOrderStatusLogsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch status logs';
      })

      // cancelled order id
      .addCase(cancelOrderAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrderAPI.fulfilled, (state, action) => {
        state.loading = false;

        const cancelledOrderId = action.meta.arg;

        // update specific order status locally
        state.orderList = state.orderList.map(order =>
          order.order_id == cancelledOrderId
            ? { ...order, order_status: 'Cancelled' }
            : order,
        );
      })
      .addCase(cancelOrderAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
