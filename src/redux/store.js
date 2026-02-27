import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import homeReducer from './slices/homeSlice';
import catReducer from './slices/catSlice';
import profileReducer from './slices/profileSlice';
import productReducer from './slices/productSlice';
import walletReducer from './slices/walletSlice';
import orderReducer from './slices/orderSlice';
import returnReducer from './slices/returnSlice';
import buyerAddressReducer from './slices/buyerAddressSlice';
import logoutDevicesReducer from './slices/logoutDevicesSlice';
import authReducer from './slices/authSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import mobileauthReducer from './slices/mobileauthSlice';

// --------------------------------------
// Persist Config
// --------------------------------------
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // only auth slice persist
};

// --------------------------------------
// Root Reducer
// --------------------------------------
const rootReducer = combineReducers({
  auth: authReducer,
  logoutDevices: logoutDevicesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  mobileauth: mobileauthReducer,
  home: homeReducer,
  cat: catReducer,
  profile: profileReducer,
  product: productReducer,
  wallet: walletReducer,
  orders: orderReducer,
  returns: returnReducer,
  buyerAddress: buyerAddressReducer,
  forgotPassword: forgotPasswordReducer,
});

// --------------------------------------
// Persisted Reducer
// --------------------------------------
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --------------------------------------
// Store
// --------------------------------------
export const store = configureStore({
  reducer: persistedReducer, // ✅ only this
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
