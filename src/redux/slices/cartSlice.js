// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utils/utils';
// import { useSelector } from 'react-redux';

//  const token = useSelector(state => state.auth.token)
//   const userId = useSelector(state => state.auth.userId)

// // Fetch cart items from API
// export const fetchCartAPI = createAsyncThunk(
//   'cart/fetchCartAPI',
//   async (_, { rejectWithValue }) => {

//     try {
//       const response = await axios.get(`${API_BASE_URL}/cart/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.data.success && response.data.data) {
//         // Make sure to map all needed fields for the UI
//         const cartItems = response.data.data.items.map(item => ({
//           model: item.model,
//           price: parseFloat(item.price) || 0,
//           feature_image: item.feature_image || '',
//           ram: item.ram || '',
//           rom: item.rom || '',
//           barcode_id: item.barcode_id || '',
//           quantity: item.quantity || '',
//           cart_id: response.data.data?.cart_id,
//         }));

//         return cartItems;
//       } else {
//         // If API success=false, return empty array
//         return [];
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// // Add item to cart API
// export const addToCartAPI = createAsyncThunk(
//   'cart/addToCartAPI',
//   async ({ product, navigation }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/cart/add`,
//         {
//           barcode_id: product?.barcode?.barcode_id,
//           user_id: userId,
//           price: product?.barcode?.purchase_price,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.data.success) {
//         const productForRedux = {
//           id: product.barcode.barcode_id,
//           name: product.name,
//           image: product.image,
//           price: product.barcode.purchase_price,
//           storage: product.storage || '',
//           quantity: product.quantity || '',
//         };
//         navigation.navigate('Cart', { getproduct: product });
//         return productForRedux;
//       } else {
//         navigation.navigate('Cart', { getproduct: product });
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// // delete cart
// export const removeFromCartAPI = createAsyncThunk(
//   'cart/removeFromCartAPI',
//   async (barcode_id, { rejectWithValue }) => {
//     try {

//       const response = await axios.delete(
//         `${API_BASE_URL}/cart/remove/${userId}/${barcode_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );
//       if (response.data.success) {
//         return barcode_id; // Return the id to remove from Redux
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// // Clear cart API
// export const clearCartAPI = createAsyncThunk(
//   'cart/clearCartAPI',
//   async (_, { rejectWithValue }) => {

//     try {
//       const response = await axios.delete(
//         `${API_BASE_URL}/cart/clear/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );
//       if (response.data.success) {
//         return true; // 👈 just return success
//       } else {
//         return rejectWithValue(response.data.message || 'Failed to clear cart');
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// export const checkoutAPI = createAsyncThunk(
//   'checkout/checkoutAPI',
//   async (
//     { type, cart_id, barcode_id, single_product_price, navigation },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/checkout`,
//         {
//           type,
//           user_id: userId,
//           barcode_id,
//           cart_id,
//           single_product_price,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       if (response.data.status) {
//         // navigate after checkout success
//         // navigation.navigate('Checkout', {
//         //   checkout_Data: response.data.data,
//         // });

//         return response.data.data;
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );
// export const checkoutDetailsAPI = createAsyncThunk(
//   'checkout/checkoutDetailsAPI',
//   async (checkout_id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/checkoutDetails/${checkout_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       return response.data.invoice_amount;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     loading: false,
//     error: [],
//     checkoutData: [],
//     checkoutDetailsData: [],
//   },
//   reducers: {
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     clearCart: state => {
//       state.items = [];
//     },
//   },
//   extraReducers: builder => {
//     builder
//       // fetchCartAPI
//       .addCase(fetchCartAPI.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchCartAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchCartAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // addToCartAPI
//       .addCase(addToCartAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.push(action.payload);
//       })

//       // removeFromCartAPI
//       .addCase(removeFromCartAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = state.items.filter(
//           item => item.barcode_id !== action.payload,
//         );
//       })

//       // clearCartAPI
//       .addCase(clearCartAPI.pending, state => {
//         state.loading = true;
//       })
//       .addCase(clearCartAPI.fulfilled, state => {
//         state.loading = false;
//         state.items = []; // 👈 empty cart in Redux
//       })
//       .addCase(clearCartAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ NEW: checkoutAPI
//       .addCase(checkoutAPI.pending, state => {
//         state.loading = true;
//       })
//       .addCase(checkoutAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.checkoutData = action.payload;
//       })
//       .addCase(checkoutAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // ✅ NEW: checkoutDetilsAPI
//       .addCase(checkoutDetailsAPI.pending, state => {
//         state.loading = true;
//       })
//       .addCase(checkoutDetailsAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.checkoutDetailsData = action.payload;
//       })
//       .addCase(checkoutDetailsAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// ================================
// 🔥 Helper: get token & userId
// ================================
const getAuth = getState => {
  const state = getState();
  return {
    token: state.auth?.token,
    userId: state.auth?.userId,
  };
};

// ================================
// 📌 Fetch Cart
// ================================
export const fetchCartAPI = createAsyncThunk(
  'cart/fetchCartAPI',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getAuth(getState);

      const response = await axios.get(`${API_BASE_URL}/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.data.success && response.data.data) {
        return response.data.data.items.map(item => ({
          model: item.model,
          price: parseFloat(item.price) || 0,
          feature_image: item.feature_image || '',
          ram: item.ram || '',
          rom: item.rom || '',
          barcode_id: item.barcode_id || '',
          quantity: item.quantity || '',
          cart_id: response.data.data?.cart_id,
          variant: item.variant,
        }));
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================================
// 📌 Add to Cart
// ================================
export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async (
    { product, wishlistproduct, navigation },
    { getState, rejectWithValue },
  ) => {
    try {
      const { token, userId } = getAuth(getState);

      // ⭐ CONDITION: Which payload to send?
      let payload;

      if (product) {
        // 👉 PRODUCT SCREEN PAYLOAD
        payload = {
          barcode_id: product?.barcode?.barcode_id,
          user_id: userId,
          price: product?.barcode?.purchase_price,
          quantity: product?.barcode?.purchase_price?.quantity,
        };
      } else if (wishlistproduct) {
        // 👉 WISHLIST SCREEN PAYLOAD
        payload = {
          barcode_id: wishlistproduct?.barcode_id,
          user_id: userId,
          price: wishlistproduct?.price,
          quantity: wishlistproduct?.quantity,
        };
      }
      const response = await axios.post(`${API_BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      navigation.navigate('Cart', { getproduct: product });

      if (response.data.success) {
        return {
          id: product.barcode.barcode_id,
          name: product.name,
          image: product.image,
          price: product.barcode.purchase_price,
          storage: product.storage || '',
          quantity: product.quantity || '',
        };
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================================
// 📌 Remove Cart Item
// ================================
export const removeFromCartAPI = createAsyncThunk(
  'cart/removeFromCartAPI',
  async (barcode_id, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getAuth(getState);

      const response = await axios.delete(
        `${API_BASE_URL}/cart/remove/${userId}/${barcode_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.success) {
        return barcode_id;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================================
// 📌 Clear Cart
// ================================
export const clearCartAPI = createAsyncThunk(
  'cart/clearCartAPI',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getAuth(getState);

      const response = await axios.delete(
        `${API_BASE_URL}/cart/clear/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.success) {
        return true;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================================
// 📌 Checkout API
// ================================
export const checkoutAPI = createAsyncThunk(
  'checkout/checkoutAPI',
  async (payload, { getState, rejectWithValue }) => {
    const { type, cart_id, barcode_id, single_product_price } = payload;

    try {
      const { token, userId } = getAuth(getState);

      const response = await axios.post(
        `${API_BASE_URL}/checkout`,
        {
          type,
          user_id: userId,
          barcode_id,
          cart_id,
          single_product_price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================================
// 📌 Checkout Details
// ================================
export const checkoutDetailsAPI = createAsyncThunk(
  'checkout/checkoutDetailsAPI',
  async (checkout_id, { getState, rejectWithValue }) => {
    try {
      const { token } = getAuth(getState);

      const response = await axios.get(
        `${API_BASE_URL}/checkoutDetails/${checkout_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      return response.data.invoice_amount;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================================
// 📌 Slice
// ================================
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
    checkoutData: [],
    checkoutDetailsData: [],
  },

  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCartAPI.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.barcode_id !== action.payload);
      })

      .addCase(clearCartAPI.fulfilled, state => {
        state.items = [];
      })

      .addCase(checkoutAPI.fulfilled, (state, action) => {
        state.checkoutData = action.payload;
      })

      .addCase(checkoutDetailsAPI.fulfilled, (state, action) => {
        state.checkoutDetailsData = action.payload;
      });
  },
});

export const { removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
