// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import {API_BASE_URL} from '../../utils/utils';

// // --------------------------------------------------
// // API 1 → Get Return Reasons
// // --------------------------------------------------

// export const fetchReturnReasons = createAsyncThunk(
//   'returns/fetchReasons',
//   async (_, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/sales-return-reasons`);

//       if (response.data.status === true) {
//         return response.data;
//       } else {
//         return rejectWithValue(response.data.msg);
//       }
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   },
// );

// // --------------------------------------------------
// // API 2 → Create Return Ticket
// // --------------------------------------------------

// export const createReturnTicket = createAsyncThunk(
//   'returns/createReturnTicket',
//   async (data, {rejectWithValue}) => {
//     try {
//       const formData = new FormData();

//       // Append basic fields
//       formData.append('sales_return_barcode_id', data.sales_return_barcode_id);
//       formData.append(
//         'sales_return_ticket_invoice_id',
//         data.sales_return_ticket_invoice_id,
//       );
//       formData.append(
//         'sales_return_ticket_vendor_sales_id',
//         data.sales_return_ticket_vendor_sales_id,
//       );
//       formData.append('delivery_type_option', data.delivery_type_option);
//       formData.append('remarks', data.remarks);

//       // Append multiple return reasons
//       if (data.return_reason_id && data.return_reason_id.length > 0) {
//         data.return_reason_id.forEach(id => {
//           formData.append('return_reason_id[]', id);
//         });
//       }

//       // Append video if provided
//       if (data.sales_return_video_upload) {
//         formData.append('sales_return_video_upload', {
//           uri: data.sales_return_video_upload.uri,
//           type: data.sales_return_video_upload.type || 'video/mp4',
//           name: data.sales_return_video_upload.fileName || 'video.mp4',
//         });
//       }
//       const response = await axios.post(
//         `${API_BASE_URL}/create-sales-return-ticket`,
//         formData,
//         {
//           headers: {'Content-Type': 'multipart/form-data'},
//         },
//       );

//       if (response.data.status === true) {
//         return response.data;
//       } else {
//         return rejectWithValue(response.data.msg);
//       }
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   },
// );

// const returnSlice = createSlice({
//   name: 'returns',
//   initialState: {
//     loading: false,
//     reasons: [],
//     ticketResponse: [],
//     error: [],
//   },

//   reducers: {
//     clearTicketResponse: state => {
//       state.ticketResponse = null;
//     },
//   },

//   extraReducers: builder => {
//     builder

//       // ⭐ FETCH REASONS
//       .addCase(fetchReturnReasons.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchReturnReasons.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reasons = action.payload.data;
//       })
//       .addCase(fetchReturnReasons.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ⭐ CREATE TICKET
//       .addCase(createReturnTicket.pending, state => {
//         state.loading = true;
//       })
//       .addCase(createReturnTicket.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ticketResponse = action.payload;
//       })
//       .addCase(createReturnTicket.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {clearTicketResponse} = returnSlice.actions;
// export default returnSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// --------------------------------------------------
// API 1 → Get Return Reasons
// --------------------------------------------------

export const fetchReturnReasons = createAsyncThunk(
  'returns/fetchReasons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales-return-reasons`);

      if (response.data.status === true) {
        return response.data;
      } else {
        return rejectWithValue(response.data.msg);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

// --------------------------------------------------
// API 2 → Create Return Ticket (WITH TOKEN)
// --------------------------------------------------

export const createReturnTicket = createAsyncThunk(
  'returns/createReturnTicket',
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // ✅ Correct method

      if (!token) {
        return rejectWithValue('User not logged in');
      }

      const formData = new FormData();

      // Append basic fields
      formData.append('sales_return_barcode_id', data.sales_return_barcode_id);
      formData.append(
        'sales_return_ticket_invoice_id',
        data.sales_return_ticket_invoice_id,
      );
      formData.append(
        'sales_return_ticket_vendor_sales_id',
        data.sales_return_ticket_vendor_sales_id,
      );
      formData.append('delivery_type_option', data.delivery_type_option);
      formData.append('remarks', data.remarks);

      // Append multiple return reasons
      if (data.return_reason_id?.length > 0) {
        data.return_reason_id.forEach(id => {
          formData.append('return_reason_id[]', id);
        });
      }

      // Append video
      if (data.sales_return_video_upload) {
        formData.append('sales_return_video_upload', {
          uri: data.sales_return_video_upload.uri,
          type: data.sales_return_video_upload.type || 'video/mp4',
          name: data.sales_return_video_upload.fileName || 'video.mp4',
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/create-sales-return-ticket`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // ✅ TOKEN ADDED
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

const returnSlice = createSlice({
  name: 'returns',
  initialState: {
    loading: false,
    reasons: [],
    ticketResponse: null,
    error: null,
  },

  reducers: {
    clearTicketResponse: state => {
      state.ticketResponse = null;
    },
  },

  extraReducers: builder => {
    builder

      // ⭐ FETCH REASONS
      .addCase(fetchReturnReasons.pending, state => {
        state.loading = true;
      })
      .addCase(fetchReturnReasons.fulfilled, (state, action) => {
        state.loading = false;
        state.reasons = action.payload.data;
      })
      .addCase(fetchReturnReasons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ⭐ CREATE TICKET
      .addCase(createReturnTicket.pending, state => {
        state.loading = true;
      })
      .addCase(createReturnTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketResponse = action.payload;
      })
      .addCase(createReturnTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTicketResponse } = returnSlice.actions;
export default returnSlice.reducer;
