// // import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {API_BASE_URL} from '../../utils/utils';
// // import { useSelector } from 'react-redux';

// //  const token = useSelector(state => state.auth.token)
// //   const user_id = useSelector(state => state.auth.userId)

// // // =====================================================
// // // 🔹 Async Thunk: Fetch Product List
// // // =====================================================
// // export const fetchProductList = createAsyncThunk(
// //   'product/fetchProductList',
// //   async (_, {rejectWithValue}) => {
// //     try {
// //       const res = await axios.get(`${API_BASE_URL}/product/list`);
// //       return res?.data?.data || [];
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data);
// //     }
// //   },
// // );

// // // =====================================================
// // // 🔹 Async Thunk: Fetch Latest Stock
// // // =====================================================
// // export const fetchProductLatestStock = createAsyncThunk(
// //   'product/fetchProductLatestStock',
// //   async (_, {rejectWithValue}) => {
// //     try {
// //       if (!token) {
// //         return rejectWithValue('User not logged in');
// //       }
// //       const res = await axios.get(`${API_BASE_URL}/lateststocklist`, {
// //         headers: {Authorization: `Bearer ${token}`},
// //       });
// //       return res?.data?.data || [];
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data);
// //     }
// //   },
// // );

// // // =====================================================
// // // 🔹 Async Thunk: Add Recently Viewed Product
// // // =====================================================
// // export const addRecentlyViewed = createAsyncThunk(
// //   'product/addRecentlyViewed',
// //   async (barcode_id, {rejectWithValue}) => {
// //     try {
// //       if (!token || !user_id) {
// //         return rejectWithValue('User not logged in');
// //       }

// //       const res = await axios.post(
// //         `${API_BASE_URL}/recently-viewed/add`,
// //         {user_id, barcode_id},
// //         {headers: {Authorization: `Bearer ${token}`}},
// //       );
// //       return res?.data?.data;
// //     } catch (error) {
// //       return rejectWithValue(error?.response?.data);
// //     }
// //   },
// // );

// // // =====================================================
// // // 🔹 Async Thunk: Fetch Filter Data
// // // =====================================================
// // export const fetchFilterData = createAsyncThunk(
// //   'product/fetchFilterData',
// //   async (catId, {rejectWithValue}) => {
// //     try {
// //       const res = await axios.get(`${API_BASE_URL}/filterapi/${catId}`);
// //       return res?.data?.filters || [];
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data);
// //     }
// //   },
// // );

// // // =====================================================
// // // 🔹 Async Thunk: Fetch Recently Viewed Products
// // // =====================================================
// // export const fetchRecentlyViewed = createAsyncThunk(
// //   'products/fetchRecentlyViewed',
// //   async (_, {rejectWithValue}) => {
// //     try {
// //       const response = await axios.get(
// //         `${API_BASE_URL}/recently-viewed/${user_id}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         },
// //       );
// //       if (response.data.status && response.data.data) {
// //         return response.data.data;
// //       } else {
// //         return rejectWithValue(
// //           response.data.message || 'Failed to fetch recently viewed',
// //         );
// //       }
// //     } catch (error) {
// //       return rejectWithValue(error?.response?.data?.message || error.message);
// //     }
// //   },
// // );

// // // =====================================================
// // // 🔹 NEW: Fetch Shop by Brands API (with Pagination)
// // // =====================================================
// // export const fetchBrandList = createAsyncThunk(
// //   'product/fetchBrandList',
// //   async (url = `${API_BASE_URL}/brand`, {rejectWithValue}) => {
// //     try {
// //       const res = await axios.get(url);
// //       return {
// //         data: res?.data?.data || [],
// //         next_page_url: res?.data?.next_page_url || null,
// //         prev_page_url: res?.data?.prev_page_url || null,
// //         total_pages: res?.data?.total_pages || 1,
// //         current_page: res?.data?.current_page || 1,
// //       };
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data);
// //     }
// //   },
// // );

// // // =====================================================
// // // 🔹 Slice Definition
// // // =====================================================
// // const productSlice = createSlice({
// //   name: 'product',
// //   initialState: {
// //     productData: [],
// //     recentlyview: [],
// //     addrecentlyview: [],
// //     filterdata: [],
// //     lateststock: [],
// //     brandList: [],
// //     nextPageUrl: null,
// //     prevPageUrl: null,
// //     totalPages: 1,
// //     currentPage: 1,
// //     loading: false,
// //     error: null,
// //   },
// //   reducers: {
// //     clearBrands(state) {
// //       state.brandList = [];
// //       state.nextPageUrl = null;
// //       state.prevPageUrl = null;
// //       state.currentPage = 1;
// //     },
// //   },
// //   extraReducers: builder => {
// //     builder
// //       // ✅ Product List
// //       .addCase(fetchProductList.pending, state => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchProductList.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.productData = action.payload;
// //       })
// //       .addCase(fetchProductList.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // ✅ Recently Viewed Added
// //       .addCase(addRecentlyViewed.pending, state => {
// //         state.loading = true;
// //       })
// //       .addCase(addRecentlyViewed.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.addrecentlyview = action.payload;
// //       })
// //       .addCase(addRecentlyViewed.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // ✅ Filter API
// //       .addCase(fetchFilterData.pending, state => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchFilterData.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.filterdata = action.payload;
// //       })
// //       .addCase(fetchFilterData.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // ✅ Recently Viewed
// //       .addCase(fetchRecentlyViewed.pending, state => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.recentlyview = action.payload;
// //       })
// //       .addCase(fetchRecentlyViewed.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // ✅ Latest Stock
// //       .addCase(fetchProductLatestStock.pending, state => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchProductLatestStock.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.lateststock = action.payload;
// //       })
// //       .addCase(fetchProductLatestStock.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // ✅ NEW: Brand List with Pagination
// //       .addCase(fetchBrandList.pending, state => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchBrandList.fulfilled, (state, action) => {
// //         state.loading = false;

// //         // Append data if next page, otherwise replace
// //         if (state.currentPage > 1 && action.payload.current_page > 1) {
// //           // Remove duplicates
// //           const newBrands = action.payload.data.filter(
// //             brand => !state.brandList.find(b => b.id === brand.id)
// //           );
// //           state.brandList = [...state.brandList, ...newBrands];
// //         } else {
// //           state.brandList = action.payload.data;
// //         }

// //         state.nextPageUrl = action.payload.next_page_url;
// //         state.prevPageUrl = action.payload.prev_page_url;
// //         state.totalPages = action.payload.total_pages;
// //         state.currentPage = action.payload.current_page;
// //       })
// //       .addCase(fetchBrandList.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });

// //   },
// // });

// // export const {clearBrands} = productSlice.actions;
// // export default productSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utils/utils';

// // =====================================================
// // 🔹 1️⃣ Fetch Product List
// // =====================================================
// export const fetchProductList = createAsyncThunk(
//   'product/fetchProductList',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/product/list`);
//       return res?.data?.data || [];
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 2️⃣ Fetch Latest Stock (Uses getState())
// // =====================================================
// export const fetchProductLatestStock = createAsyncThunk(
//   'product/fetchProductLatestStock',
//   async (_, { rejectWithValue, getState }) => {
//     const token = getState().auth.token;

//     if (!token) {
//       return rejectWithValue('User not logged in');
//     }

//     try {
//       const res = await axios.get(`${API_BASE_URL}/lateststocklist`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res?.data?.data || [];
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 3️⃣ Add Recently Viewed Product (Uses getState())
// // =====================================================
// export const addRecentlyViewed = createAsyncThunk(
//   'product/addRecentlyViewed',
//   async (barcode_id, { rejectWithValue, getState }) => {
//     const token = getState().auth.token;
//     const user_id = getState().auth.userId;

//     try {
//       if (!token || !user_id) {
//         return rejectWithValue('User not logged in');
//       }

//       const res = await axios.post(
//         `${API_BASE_URL}/recently-viewed/add`,
//         { user_id, barcode_id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       return res?.data?.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 4️⃣ Fetch Filter Data
// // =====================================================
// export const fetchFilterData = createAsyncThunk(
//   'product/fetchFilterData',
//   async (catId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/filterapi/${catId}`);
//       return res?.data?.filters || [];
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 5️⃣ Fetch Recently Viewed (Uses getState())
// // =====================================================
// export const fetchRecentlyViewed = createAsyncThunk(
//   'products/fetchRecentlyViewed',
//   async (_, { rejectWithValue, getState }) => {
//     const token = getState().auth.token;
//     const user_id = getState().auth.userId;

//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/recently-viewed/${user_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.data.status && response.data.data) {
//         return response.data.data;
//       } else {
//         return rejectWithValue(
//           response.data.message || 'Failed to fetch recently viewed',
//         );
//       }
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// // =====================================================
// // 🔹 6️⃣ Fetch Brand List with Pagination
// // =====================================================
// export const fetchBrandList = createAsyncThunk(
//   'product/fetchBrandList',
//   async (url = `${API_BASE_URL}/brand`, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(url);
//       return {
//         data: res?.data?.data || [],
//         next_page_url: res?.data?.next_page_url || null,
//         prev_page_url: res?.data?.prev_page_url || null,
//         total_pages: res?.data?.total_pages || 1,
//         current_page: res?.data?.current_page || 1,
//       };
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 Slice
// // =====================================================
// const productSlice = createSlice({
//   name: 'product',
//   initialState: {
//     productData: [],
//     recentlyview: [],
//     addrecentlyview: [],
//     filterdata: [],
//     lateststock: [],
//     brandList: [],
//     nextPageUrl: null,
//     prevPageUrl: null,
//     totalPages: 1,
//     currentPage: 1,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearBrands(state) {
//       state.brandList = [];
//       state.nextPageUrl = null;
//       state.prevPageUrl = null;
//       state.currentPage = 1;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchProductList.pending, state => { state.loading = true })
//       .addCase(fetchProductList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.productData = action.payload;
//       })
//       .addCase(fetchProductList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Recently Viewed Add
//       .addCase(addRecentlyViewed.fulfilled, (state, action) => {
//         state.loading = false;
//         state.addrecentlyview = action.payload;
//       })

//       // Filter Data
//       .addCase(fetchFilterData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.filterdata = action.payload;
//       })

//       // Recently Viewed
//       .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recentlyview = action.payload;
//       })

//       // Latest Stock
//       .addCase(fetchProductLatestStock.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lateststock = action.payload;
//       })

//       // Brand List
//       .addCase(fetchBrandList.fulfilled, (state, action) => {
//         state.loading = false;

//         if (state.currentPage > 1 && action.payload.current_page > 1) {
//           const newBrands = action.payload.data.filter(
//             brand => !state.brandList.find(b => b.id === brand.id)
//           );
//           state.brandList = [...state.brandList, ...newBrands];
//         } else {
//           state.brandList = action.payload.data;
//         }

//         state.nextPageUrl = action.payload.next_page_url;
//         state.prevPageUrl = action.payload.prev_page_url;
//         state.totalPages = action.payload.total_pages;
//         state.currentPage = action.payload.current_page;
//       });
//   },
// });

// export const { clearBrands } = productSlice.actions;
// export default productSlice.reducer;

// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL} from '../../utils/utils';
// import { useSelector } from 'react-redux';

//  const token = useSelector(state => state.auth.token)
//   const user_id = useSelector(state => state.auth.userId)

// // =====================================================
// // 🔹 Async Thunk: Fetch Product List
// // =====================================================
// export const fetchProductList = createAsyncThunk(
//   'product/fetchProductList',
//   async (_, {rejectWithValue}) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/product/list`);
//       return res?.data?.data || [];
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 Async Thunk: Fetch Latest Stock
// // =====================================================
// export const fetchProductLatestStock = createAsyncThunk(
//   'product/fetchProductLatestStock',
//   async (_, {rejectWithValue}) => {
//     try {
//       if (!token) {
//         return rejectWithValue('User not logged in');
//       }
//       const res = await axios.get(`${API_BASE_URL}/lateststocklist`, {
//         headers: {Authorization: `Bearer ${token}`},
//       });
//       return res?.data?.data || [];
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 Async Thunk: Add Recently Viewed Product
// // =====================================================
// export const addRecentlyViewed = createAsyncThunk(
//   'product/addRecentlyViewed',
//   async (barcode_id, {rejectWithValue}) => {
//     try {
//       if (!token || !user_id) {
//         return rejectWithValue('User not logged in');
//       }

//       const res = await axios.post(
//         `${API_BASE_URL}/recently-viewed/add`,
//         {user_id, barcode_id},
//         {headers: {Authorization: `Bearer ${token}`}},
//       );
//       return res?.data?.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 Async Thunk: Fetch Filter Data
// // =====================================================
// export const fetchFilterData = createAsyncThunk(
//   'product/fetchFilterData',
//   async (catId, {rejectWithValue}) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/filterapi/${catId}`);
//       return res?.data?.filters || [];
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 Async Thunk: Fetch Recently Viewed Products
// // =====================================================
// export const fetchRecentlyViewed = createAsyncThunk(
//   'products/fetchRecentlyViewed',
//   async (_, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/recently-viewed/${user_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       if (response.data.status && response.data.data) {
//         return response.data.data;
//       } else {
//         return rejectWithValue(
//           response.data.message || 'Failed to fetch recently viewed',
//         );
//       }
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// // =====================================================
// // 🔹 NEW: Fetch Shop by Brands API (with Pagination)
// // =====================================================
// export const fetchBrandList = createAsyncThunk(
//   'product/fetchBrandList',
//   async (url = `${API_BASE_URL}/brand`, {rejectWithValue}) => {
//     try {
//       const res = await axios.get(url);
//       return {
//         data: res?.data?.data || [],
//         next_page_url: res?.data?.next_page_url || null,
//         prev_page_url: res?.data?.prev_page_url || null,
//         total_pages: res?.data?.total_pages || 1,
//         current_page: res?.data?.current_page || 1,
//       };
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

// // =====================================================
// // 🔹 Slice Definition
// // =====================================================
// const productSlice = createSlice({
//   name: 'product',
//   initialState: {
//     productData: [],
//     recentlyview: [],
//     addrecentlyview: [],
//     filterdata: [],
//     lateststock: [],
//     brandList: [],
//     nextPageUrl: null,
//     prevPageUrl: null,
//     totalPages: 1,
//     currentPage: 1,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearBrands(state) {
//       state.brandList = [];
//       state.nextPageUrl = null;
//       state.prevPageUrl = null;
//       state.currentPage = 1;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       // ✅ Product List
//       .addCase(fetchProductList.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchProductList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.productData = action.payload;
//       })
//       .addCase(fetchProductList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Recently Viewed Added
//       .addCase(addRecentlyViewed.pending, state => {
//         state.loading = true;
//       })
//       .addCase(addRecentlyViewed.fulfilled, (state, action) => {
//         state.loading = false;
//         state.addrecentlyview = action.payload;
//       })
//       .addCase(addRecentlyViewed.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Filter API
//       .addCase(fetchFilterData.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchFilterData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.filterdata = action.payload;
//       })
//       .addCase(fetchFilterData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Recently Viewed
//       .addCase(fetchRecentlyViewed.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recentlyview = action.payload;
//       })
//       .addCase(fetchRecentlyViewed.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Latest Stock
//       .addCase(fetchProductLatestStock.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchProductLatestStock.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lateststock = action.payload;
//       })
//       .addCase(fetchProductLatestStock.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ NEW: Brand List with Pagination
//       .addCase(fetchBrandList.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchBrandList.fulfilled, (state, action) => {
//         state.loading = false;

//         // Append data if next page, otherwise replace
//         if (state.currentPage > 1 && action.payload.current_page > 1) {
//           // Remove duplicates
//           const newBrands = action.payload.data.filter(
//             brand => !state.brandList.find(b => b.id === brand.id)
//           );
//           state.brandList = [...state.brandList, ...newBrands];
//         } else {
//           state.brandList = action.payload.data;
//         }

//         state.nextPageUrl = action.payload.next_page_url;
//         state.prevPageUrl = action.payload.prev_page_url;
//         state.totalPages = action.payload.total_pages;
//         state.currentPage = action.payload.current_page;
//       })
//       .addCase(fetchBrandList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//   },
// });

// export const {clearBrands} = productSlice.actions;
// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';

// =====================================================
// 🔹 1️⃣ Fetch Product List
// =====================================================
export const fetchProductList = createAsyncThunk(
  'product/fetchProductList',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/product/list`);
      return res?.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================================================
// 🔹 2️⃣ Fetch Latest Stock (Uses getState())
// =====================================================
export const fetchProductLatestStock = createAsyncThunk(
  'product/fetchProductLatestStock',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue('User not logged in');
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/lateststocklist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res?.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================================================
// 🔹 3️⃣ Add Recently Viewed Product (Uses getState())
// =====================================================
export const addRecentlyViewed = createAsyncThunk(
  'product/addRecentlyViewed',
  async (barcode_id, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    const user_id = getState().auth.userId;

    try {
      if (!token || !user_id) {
        return rejectWithValue('User not logged in');
      }

      const res = await axios.post(
        `${API_BASE_URL}/recently-viewed/add`,
        { user_id, barcode_id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return res?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

// =====================================================
// 🔹 4️⃣ Fetch Filter Data
// =====================================================
export const fetchFilterData = createAsyncThunk(
  'product/fetchFilterData',
  async (catId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/filterapi/${catId}`);
      return res?.data?.filters || [];
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const fetchFilterDataNoCartId = createAsyncThunk(
  'product/fetchFilterDataNoCartId',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/filterapi`);
      return res?.data?.filters || [];
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================================================
// 🔹 5️⃣ Fetch Recently Viewed (Uses getState())
// =====================================================
export const fetchRecentlyViewed = createAsyncThunk(
  'products/fetchRecentlyViewed',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    const user_id = getState().auth.userId;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/recently-viewed/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status && response.data.data) {
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || 'Failed to fetch recently viewed',
        );
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// =====================================================
// 🔹 6️⃣ Fetch Brand List with Pagination
// =====================================================
export const fetchBrandList = createAsyncThunk(
  'product/fetchBrandList',
  async (url = `${API_BASE_URL}/brand`, { rejectWithValue }) => {
    try {
      const res = await axios.get(url);
      return {
        data: res?.data?.data || [],
        next_page_url: res?.data?.next_page_url || null,
        prev_page_url: res?.data?.prev_page_url || null,
        total_pages: res?.data?.total_pages || 1,
        current_page: res?.data?.current_page || 1,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================================================
// 🔹 Slice
// =====================================================
const productSlice = createSlice({
  name: 'product',
  initialState: {
    productData: [],
    recentlyview: [],
    addrecentlyview: [],
    filterdata: [],
    nocartidfilterdata: [],
    lateststock: [],
    brandList: [],
    nextPageUrl: null,
    prevPageUrl: null,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearBrands(state) {
      state.brandList = [];
      state.nextPageUrl = null;
      state.prevPageUrl = null;
      state.currentPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductList.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Recently Viewed Add
      .addCase(addRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.addrecentlyview = action.payload;
      })

      // Filter Data
      .addCase(fetchFilterData.fulfilled, (state, action) => {
        state.loading = false;
        state.filterdata = action.payload;
      })

      // No cart id Filter Data
      .addCase(fetchFilterDataNoCartId.fulfilled, (state, action) => {
        state.loading = false;
        state.nocartidfilterdata = action.payload;
      })

      // Recently Viewed
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyview = action.payload;
      })

      // Latest Stock
      .addCase(fetchProductLatestStock.fulfilled, (state, action) => {
        state.loading = false;
        state.lateststock = action.payload;
      })

      // Brand List
      .addCase(fetchBrandList.fulfilled, (state, action) => {
        state.loading = false;

        if (state.currentPage > 1 && action.payload.current_page > 1) {
          const newBrands = action.payload.data.filter(
            brand => !state.brandList.find(b => b.id === brand.id),
          );
          state.brandList = [...state.brandList, ...newBrands];
        } else {
          state.brandList = action.payload.data;
        }

        state.nextPageUrl = action.payload.next_page_url;
        state.prevPageUrl = action.payload.prev_page_url;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.current_page;
      });
  },
});

export const { clearBrands } = productSlice.actions;
export default productSlice.reducer;
