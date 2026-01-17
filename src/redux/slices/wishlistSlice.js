// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utils/utils';
// import { useSelector } from 'react-redux';

// const token = useSelector(state => state.auth.token);
// const userId = useSelector(state => state.auth.userId);

// // ✅ Fetch wishlist from API
// export const fetchWishlist = createAsyncThunk(
//   'wishlist/fetchWishlist',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/wishlist/${userId}`, {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data.data; // returns wishlist array
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// // ✅ Add to wishlist (API + Redux)
// export const addToWishlistAPI = createAsyncThunk(
//   'wishlist/addToWishlistAPI',
//   async (item, { rejectWithValue }) => {
//     try {
//       const payload = {
//         user_id: userId,
//         barcode_id: item.barcode_id,
//       };
//       const response = await axios.post(
//         `${API_BASE_URL}/wishlist/add`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return item;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// // ✅ Remove from wishlist (API + Redux)
// export const removeFromWishlistAPI = createAsyncThunk(
//   'wishlist/removeFromWishlistAPI',
//   async (item, { rejectWithValue }) => {
//     try {
//       const payload = {
//         user_id: userId,
//         barcode_id: item.barcode_id,
//       };
//       const response = await axios.post(
//         `${API_BASE_URL}/wishlist/remove`,
//         payload,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return item;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState: {
//     items: [],
//     loading: false,
//     error: [],
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       // Fetch
//       .addCase(fetchWishlist.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload || [];
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Add
//       .addCase(addToWishlistAPI.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })

//       // Remove
//       // .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
//       //   state.items = state.items.filter(item => item.id !== action.payload);
//       // });
//       .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
//         const removedId = action.meta.arg.barcode_id;
//         state.items = state.items.filter(item => item.barcode_id !== removedId);
//       });
//   },
// });

// export default wishlistSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// -------------------------------------------
// FETCH WISHLIST
// -------------------------------------------
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getState().auth; // ✅ Correct way

      const response = await axios.get(`${API_BASE_URL}/wishlist/${userId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// -------------------------------------------
// ADD TO WISHLIST
// -------------------------------------------
export const addToWishlistAPI = createAsyncThunk(
  'wishlist/addToWishlistAPI',
  async (item, { getState, rejectWithValue }) => {
    console.log('item-----------checked----------->', item)
    try {
      const { token, userId } = getState().auth;

      await axios.post(
        `${API_BASE_URL}/wishlist/add`,
        {
          user_id: userId,
          barcode_id: item.barcode_id,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return item; // return same item
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// -------------------------------------------
// REMOVE FROM WISHLIST
// -------------------------------------------
export const removeFromWishlistAPI = createAsyncThunk(
  'wishlist/removeFromWishlistAPI',
  async (item, { getState, rejectWithValue }) => {
     console.log('item-----------checked removed----------->', item)
    try {
      const { token, userId } = getState().auth;

      await axios.post(
        `${API_BASE_URL}/wishlist/remove`,
        {
          user_id: userId,
          barcode_id: item.barcode_id,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return item; // return item to identify remove
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// -------------------------------------------
// SLICE
// -------------------------------------------
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // FETCH
      .addCase(fetchWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // REMOVE
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        const removeId = action.payload.barcode_id;
        state.items = state.items.filter(item => item.barcode_id !== removeId);
      });
  },
});

export default wishlistSlice.reducer;
