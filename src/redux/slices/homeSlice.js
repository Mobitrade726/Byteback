// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { API_BASE_URL } from '../../utils/utils';
// // import { useSelector } from 'react-redux';

// // const token = useSelector(state => state.auth.token);

// // export const fetchBanners = createAsyncThunk('home/fetchBanners', async () => {
// //   try {
// //     const response = await axios.get(`${API_BASE_URL}/bannerlist`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`, // 👈 pass token here
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     return response.data.data; // API response (array of banners)
// //   } catch (error) {
// //     console.error(
// //       'Error fetching banners:',
// //       error.response?.data || error.message,
// //     );
// //     throw error;
// //   }
// // });
// // export const fetchOsList = createAsyncThunk('home/fetchOsList', async () => {
// //   try {
// //     const response = await axios.get(`${API_BASE_URL}/oslist`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     return response.data.data; // return only the OS list array
// //   } catch (error) {
// //     console.error(
// //       'Error fetching OS List:',
// //       error.response?.data || error.message,
// //     );
// //     throw error;
// //   }
// // });
// // export const fetchCatList = createAsyncThunk('home/fetchCatList', async () => {
// //   try {
// //     const response = await axios.get(`${API_BASE_URL}/categorylist`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     return response.data.data; // return only the OS list array
// //   } catch (error) {
// //     console.error(
// //       'Error fetching OS List:',
// //       error.response?.data || error.message,
// //     );
// //     throw error;
// //   }
// // });

// // export const fetchBrands = createAsyncThunk('home/fetchBrands', async () => {
// //   try {
// //     const response = await axios.get(`${API_BASE_URL}/brand`);
// //     return response.data.data; // return only the OS list array
// //   } catch (error) {
// //     console.error(
// //       'Error fetching OS List:',
// //       error.response?.data || error.message,
// //     );
// //     throw error;
// //   }
// // });

// // const initialState = {
// //   carouselData: [],
// //   osList: [],
// //   catList: [],
// //   brands: [], // 👈 add this
// //   offers: [],
// //   status: 'idle', // loading status
// //   error: [],
// //   categories: [
// //     {
// //       id: '1',
// //       title: 'Android',
// //       image: 'https://i.postimg.cc/bvfB5mLG/Product-Image-2x.png',
// //     },
// //     {
// //       id: '2',
// //       title: 'iOS',
// //       image: 'https://i.postimg.cc/T1K01bCM/Product-Image-1.png',
// //     },
// //     {
// //       id: '3',
// //       title: 'Windows OS',
// //       image: 'https://i.postimg.cc/66419sS7/Product-Image-2.png',
// //     },
// //     {
// //       id: '4',
// //       title: 'MacOS',
// //       image: 'https://i.postimg.cc/Jht5PZCy/Product-Image-3.png',
// //     },
// //   ],
// //   uri: {
// //     url: 'https://i.postimg.cc/3wdk2CDW/Banner-Background-1.png',
// //   },
// //   mobileBudget: [
// //     {
// //       id: '1',
// //       image:
// //         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
// //       label: 'Under ₹10,000',
// //       subname: 'Great for budget buyers',
// //     },
// //     {
// //       id: '2',
// //       image:
// //         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
// //       label: '₹10,000 - ₹20,000',
// //       subname: 'Ideal for beginners ',
// //     },
// //     {
// //       id: '3',
// //       image:
// //         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
// //       label: '₹20,000 - ₹30,000',
// //       subname: 'Premium selections ',
// //     },
// //     {
// //       id: '4',
// //       image:
// //         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
// //       label: 'Above ₹30,000',
// //       subname: 'Premium selections ',
// //     },
// //   ],
// //   LaptopBudget: [
// //     {
// //       id: '1',
// //       image:
// //         'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
// //       name: 'Under ₹20,000',
// //       subname: 'Ideal for savvy students',
// //     },
// //     {
// //       id: '2',
// //       image:
// //         'https://i.postimg.cc/nrFzXjMt/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
// //       name: '₹30,000 – ₹40,000',
// //       subname: 'Premium selections ',
// //     },
// //     {
// //       id: '3',
// //       image:
// //         'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
// //       name: 'Above ₹40,000',
// //       subname: 'Luxury Macbooks & Windows PC',
// //     },
// //   ],
// //   recentlyView: [
// //     {
// //       id: '1',
// //       image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
// //       name: 'Samsung Galaxy S21',
// //       color: 'Black',
// //       price: '₹20,999',
// //       originalPrice: '₹24,999',
// //       grade: 'A1',
// //       refurbished: true,
// //     },
// //     {
// //       id: '2',
// //       image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
// //       name: 'Apple iPhone 13',
// //       color: 'Midnight',
// //       price: '₹69,900',
// //       originalPrice: '₹79,900',
// //       grade: 'A1',
// //       refurbished: true,
// //     },
// //   ],
// //   SUPPORT_CARDS: [
// //     {
// //       id: '1',
// //       icon: 'refresh-ccw',
// //       title: 'Video-Backed Returns',
// //       description: 'Sales return ticketing with secure video proof.',
// //     },
// //     {
// //       id: '2',
// //       icon: 'map-pin',
// //       title: 'Track Your Orders',
// //       description: 'Real-time updates on your deliveries.',
// //     },
// //   ],
// // };

// // const homeSlice = createSlice({
// //   name: 'home',
// //   initialState,
// //   reducers: {
// //     toggleWishlist: (state, action) => {
// //       const item = state.recentlyView.find(x => x.id === action.payload);
// //       if (item) {
// //         item.wishlist = !item.wishlist;
// //       }
// //     },
// //   },
// //   extraReducers: builder => {
// //     builder
// //       .addCase(fetchBanners.pending, state => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchBanners.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.carouselData = action.payload; // now this is the array
// //       })
// //       .addCase(fetchBanners.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })
// //       // 👇 OS List cases
// //       .addCase(fetchOsList.pending, state => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchOsList.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.osList = action.payload;
// //       })
// //       .addCase(fetchOsList.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })
// //       // 👇 Cat List cases
// //       .addCase(fetchCatList.pending, state => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchCatList.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.catList = action.payload;
// //       })
// //       .addCase(fetchCatList.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })
// //       // 👇 Brads List cases
// //       .addCase(fetchBrands.pending, state => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchBrands.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.brands = action.payload; // ✅ store brands separately
// //       })
// //       .addCase(fetchBrands.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       });
// //   },
// // });

// // export const { toggleWishlist } = homeSlice.actions;
// // export default homeSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utils/utils';

// // ----------------------------
// // 🔥 FETCH BANNERS
// // ----------------------------
// export const fetchBanners = createAsyncThunk(
//   'home/fetchBanners',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;

//       const response = await axios.get(`${API_BASE_URL}/bannerlist`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // ----------------------------
// // 🔥 FETCH OS LIST
// // ----------------------------
// export const fetchOsList = createAsyncThunk(
//   'home/fetchOsList',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;

//       const response = await axios.get(`${API_BASE_URL}/oslist`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // ----------------------------
// // 🔥 FETCH CATEGORY LIST
// // ----------------------------
// export const fetchCatList = createAsyncThunk(
//   'home/fetchCatList',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;

//       const response = await axios.get(`${API_BASE_URL}/categorylist`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // ----------------------------
// // 🔥 FETCH BRANDS
// // ----------------------------
// export const fetchBrands = createAsyncThunk(
//   'home/fetchBrands',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/brand`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // ----------------------------
// // INITIAL STATE
// // ----------------------------
// const initialState = {
//   carouselData: [],
//   osList: [],
//   catList: [],
//   brands: [],
//   status: 'idle',
//   error: [],
//   categories: [
//     { id: '1', title: 'Android', image: 'https://i.postimg.cc/bvfB5mLG/Product-Image-2x.png' },
//     { id: '2', title: 'iOS', image: 'https://i.postimg.cc/T1K01bCM/Product-Image-1.png' },
//     { id: '3', title: 'Windows OS', image: 'https://i.postimg.cc/66419sS7/Product-Image-2.png' },
//     { id: '4', title: 'MacOS', image: 'https://i.postimg.cc/Jht5PZCy/Product-Image-3.png' },
//   ],
//   uri: { url: 'https://i.postimg.cc/3wdk2CDW/Banner-Background-1.png' },
//   mobileBudget: [
//     {
//       id: '1',
//       image: 'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: 'Under ₹10,000',
//       subname: 'Great for budget buyers',
//     },
//     {
//       id: '2',
//       image: 'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: '₹10,000 - ₹20,000',
//       subname: 'Ideal for beginners ',
//     },
//     {
//       id: '3',
//       image: 'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: '₹20,000 - ₹30,000',
//       subname: 'Premium selections ',
//     },
//     {
//       id: '4',
//       image: 'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: 'Above ₹30,000',
//       subname: 'Premium selections ',
//     },
//   ],
//   LaptopBudget: [
//     {
//       id: '1',
//       image: 'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
//       label: 'Under ₹10,000',
//       subname: 'Ideal for savvy students',
//     },
//     {
//       id: '2',
//       image: 'https://i.postimg.cc/nrFzXjMt/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: '₹10,000 - ₹20,000',
//       subname: 'Premium selections ',
//     },
//     {
//       id: '3',
//       image: 'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
//       label: '₹20,000 - ₹30,000',
//       subname: 'Luxury Macbooks & Windows PC',
//     },
//     {
//       id: '4',
//       image: 'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
//       label: 'Above ₹30,000',
//       subname: 'Luxury Macbooks & Windows PC',
//     },
//   ],
//   recentlyView: [
//     {
//       id: '1',
//       image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
//       name: 'Samsung Galaxy S21',
//       color: 'Black',
//       price: '₹20,999',
//       originalPrice: '₹24,999',
//       grade: 'A1',
//       refurbished: true,
//     },
//     {
//       id: '2',
//       image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
//       name: 'Apple iPhone 13',
//       color: 'Midnight',
//       price: '₹69,900',
//       originalPrice: '₹79,900',
//       grade: 'A1',
//       refurbished: true,
//     },
//   ],
//   SUPPORT_CARDS: [
//     {
//       id: '1',
//       icon: 'refresh-ccw',
//       title: 'Video-Backed Returns',
//       description: 'Sales return ticketing with secure video proof.',
//     },
//     {
//       id: '2',
//       icon: 'map-pin',
//       title: 'Track Your Orders',
//       description: 'Real-time updates on your deliveries.',
//     },
//   ],
// };

// // ----------------------------
// // SLICE
// // ----------------------------
// const homeSlice = createSlice({
//   name: 'home',
//   initialState,
//   reducers: {
//     toggleWishlist: (state, action) => {
//       const item = state.recentlyView.find(x => x.id === action.payload);
//       if (item) {
//         item.wishlist = !item.wishlist;
//       }
//     },
//   },
//   extraReducers: builder => {
//     builder
//       // Banners
//       .addCase(fetchBanners.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBanners.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.carouselData = action.payload;
//       })
//       .addCase(fetchBanners.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // OS List
//       .addCase(fetchOsList.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOsList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.osList = action.payload;
//       })
//       .addCase(fetchOsList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Category List
//       .addCase(fetchCatList.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCatList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.catList = action.payload;
//       })
//       .addCase(fetchCatList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Brands
//       .addCase(fetchBrands.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBrands.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.brands = action.payload;
//       })
//       .addCase(fetchBrands.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { toggleWishlist } = homeSlice.actions;
// export default homeSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../../utils/utils';
// import { useSelector } from 'react-redux';

// const token = useSelector(state => state.auth.token);

// export const fetchBanners = createAsyncThunk('home/fetchBanners', async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/bannerlist`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // 👈 pass token here
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data.data; // API response (array of banners)
//   } catch (error) {
//     console.error(
//       'Error fetching banners:',
//       error.response?.data || error.message,
//     );
//     throw error;
//   }
// });
// export const fetchOsList = createAsyncThunk('home/fetchOsList', async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/oslist`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data.data; // return only the OS list array
//   } catch (error) {
//     console.error(
//       'Error fetching OS List:',
//       error.response?.data || error.message,
//     );
//     throw error;
//   }
// });
// export const fetchCatList = createAsyncThunk('home/fetchCatList', async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/categorylist`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data.data; // return only the OS list array
//   } catch (error) {
//     console.error(
//       'Error fetching OS List:',
//       error.response?.data || error.message,
//     );
//     throw error;
//   }
// });

// export const fetchBrands = createAsyncThunk('home/fetchBrands', async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/brand`);
//     return response.data.data; // return only the OS list array
//   } catch (error) {
//     console.error(
//       'Error fetching OS List:',
//       error.response?.data || error.message,
//     );
//     throw error;
//   }
// });

// const initialState = {
//   carouselData: [],
//   osList: [],
//   catList: [],
//   brands: [], // 👈 add this
//   offers: [],
//   status: 'idle', // loading status
//   error: [],
//   categories: [
//     {
//       id: '1',
//       title: 'Android',
//       image: 'https://i.postimg.cc/bvfB5mLG/Product-Image-2x.png',
//     },
//     {
//       id: '2',
//       title: 'iOS',
//       image: 'https://i.postimg.cc/T1K01bCM/Product-Image-1.png',
//     },
//     {
//       id: '3',
//       title: 'Windows OS',
//       image: 'https://i.postimg.cc/66419sS7/Product-Image-2.png',
//     },
//     {
//       id: '4',
//       title: 'MacOS',
//       image: 'https://i.postimg.cc/Jht5PZCy/Product-Image-3.png',
//     },
//   ],
//   uri: {
//     url: 'https://i.postimg.cc/3wdk2CDW/Banner-Background-1.png',
//   },
//   mobileBudget: [
//     {
//       id: '1',
//       image:
//         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: 'Under ₹10,000',
//       subname: 'Great for budget buyers',
//     },
//     {
//       id: '2',
//       image:
//         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: '₹10,000 - ₹20,000',
//       subname: 'Ideal for beginners ',
//     },
//     {
//       id: '3',
//       image:
//         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: '₹20,000 - ₹30,000',
//       subname: 'Premium selections ',
//     },
//     {
//       id: '4',
//       image:
//         'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       label: 'Above ₹30,000',
//       subname: 'Premium selections ',
//     },
//   ],
//   LaptopBudget: [
//     {
//       id: '1',
//       image:
//         'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
//       name: 'Under ₹20,000',
//       subname: 'Ideal for savvy students',
//     },
//     {
//       id: '2',
//       image:
//         'https://i.postimg.cc/nrFzXjMt/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
//       name: '₹30,000 – ₹40,000',
//       subname: 'Premium selections ',
//     },
//     {
//       id: '3',
//       image:
//         'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
//       name: 'Above ₹40,000',
//       subname: 'Luxury Macbooks & Windows PC',
//     },
//   ],
//   recentlyView: [
//     {
//       id: '1',
//       image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
//       name: 'Samsung Galaxy S21',
//       color: 'Black',
//       price: '₹20,999',
//       originalPrice: '₹24,999',
//       grade: 'A1',
//       refurbished: true,
//     },
//     {
//       id: '2',
//       image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
//       name: 'Apple iPhone 13',
//       color: 'Midnight',
//       price: '₹69,900',
//       originalPrice: '₹79,900',
//       grade: 'A1',
//       refurbished: true,
//     },
//   ],
//   SUPPORT_CARDS: [
//     {
//       id: '1',
//       icon: 'refresh-ccw',
//       title: 'Video-Backed Returns',
//       description: 'Sales return ticketing with secure video proof.',
//     },
//     {
//       id: '2',
//       icon: 'map-pin',
//       title: 'Track Your Orders',
//       description: 'Real-time updates on your deliveries.',
//     },
//   ],
// };

// const homeSlice = createSlice({
//   name: 'home',
//   initialState,
//   reducers: {
//     toggleWishlist: (state, action) => {
//       const item = state.recentlyView.find(x => x.id === action.payload);
//       if (item) {
//         item.wishlist = !item.wishlist;
//       }
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchBanners.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBanners.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.carouselData = action.payload; // now this is the array
//       })
//       .addCase(fetchBanners.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // 👇 OS List cases
//       .addCase(fetchOsList.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOsList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.osList = action.payload;
//       })
//       .addCase(fetchOsList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // 👇 Cat List cases
//       .addCase(fetchCatList.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCatList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.catList = action.payload;
//       })
//       .addCase(fetchCatList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // 👇 Brads List cases
//       .addCase(fetchBrands.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBrands.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.brands = action.payload; // ✅ store brands separately
//       })
//       .addCase(fetchBrands.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { toggleWishlist } = homeSlice.actions;
// export default homeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../constants/axiosInstance';
// ----------------------------
// 🔥 FETCH BANNERS
// ----------------------------
export const fetchBanners = createAsyncThunk(
  'home/fetchBanners',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`/bannerlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
    } catch (error) {
      console.log('API ERROR STATUS 👉', error?.response?.status);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ----------------------------
// 🔥 FETCH OS LIST
// ----------------------------
export const fetchOsList = createAsyncThunk(
  'home/fetchOsList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`/oslist`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
    } catch (error) {
      console.log('API ERROR STATUS 👉', error?.response?.status);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ----------------------------
// 🔥 FETCH CATEGORY LIST
// ----------------------------
export const fetchCatList = createAsyncThunk(
  'home/fetchCatList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`/categorylist`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
    } catch (error) {
      console.log('API ERROR STATUS 👉', error?.response?.status);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ----------------------------
// 🔥 FETCH BRANDS
// ----------------------------
export const fetchBrands = createAsyncThunk(
  'home/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/brand`);
      return response.data.data;
    } catch (error) {
      console.log('API ERROR STATUS 👉', error?.response?.status);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ----------------------------
// INITIAL STATE
// ----------------------------
const initialState = {
  carouselData: [],
  osList: [],
  catList: [],
  brands: [],
  status: 'idle',
  error: [],
  categories: [
    {
      id: '1',
      title: 'Android',
      image: 'https://i.postimg.cc/bvfB5mLG/Product-Image-2x.png',
    },
    {
      id: '2',
      title: 'iOS',
      image: 'https://i.postimg.cc/T1K01bCM/Product-Image-1.png',
    },
    {
      id: '3',
      title: 'Windows OS',
      image: 'https://i.postimg.cc/66419sS7/Product-Image-2.png',
    },
    {
      id: '4',
      title: 'MacOS',
      image: 'https://i.postimg.cc/Jht5PZCy/Product-Image-3.png',
    },
  ],
  uri: { url: 'https://i.postimg.cc/3wdk2CDW/Banner-Background-1.png' },
  mobileBudget: [
    {
      id: '1',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      label: 'Under ₹10,000',
      subname: 'Great for budget buyers',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      label: '₹10,000 - ₹20,000',
      subname: 'Ideal for beginners ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      label: '₹20,000 - ₹30,000',
      subname: 'Premium selections ',
    },
    {
      id: '4',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      label: 'Above ₹30,000',
      subname: 'Premium selections ',
    },
  ],
  LaptopBudget: [
    {
      id: '1',
      image:
        'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
      label: 'Under ₹10,000',
      subname: 'Ideal for savvy students',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/nrFzXjMt/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      label: '₹10,000 - ₹20,000',
      subname: 'Premium selections ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
      label: '₹20,000 - ₹30,000',
      subname: 'Luxury Macbooks & Windows PC',
    },
    {
      id: '4',
      image:
        'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
      label: 'Above ₹30,000',
      subname: 'Luxury Macbooks & Windows PC',
    },
  ],
  recentlyView: [
    {
      id: '1',
      image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
      name: 'Samsung Galaxy S21',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '2',
      image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
      name: 'Apple iPhone 13',
      color: 'Midnight',
      price: '₹69,900',
      originalPrice: '₹79,900',
      grade: 'A1',
      refurbished: true,
    },
  ],
  SUPPORT_CARDS: [
    {
      id: '1',
      icon: 'refresh-ccw',
      title: 'Video-Backed Returns',
      description: 'Sales return ticketing with secure video proof.',
    },
    {
      id: '2',
      icon: 'map-pin',
      title: 'Track Your Orders',
      description: 'Real-time updates on your deliveries.',
    },
  ],
};

// ----------------------------
// SLICE
// ----------------------------
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const item = state.recentlyView.find(x => x.id === action.payload);
      if (item) {
        item.wishlist = !item.wishlist;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Banners
      .addCase(fetchBanners.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carouselData = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // OS List
      .addCase(fetchOsList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.osList = action.payload;
      })
      .addCase(fetchOsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Category List
      .addCase(fetchCatList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCatList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catList = action.payload;
      })
      .addCase(fetchCatList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Brands
      .addCase(fetchBrands.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { toggleWishlist } = homeSlice.actions;
export default homeSlice.reducer;
