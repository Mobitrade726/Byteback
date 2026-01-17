import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAuthStorage = async () => {
  store.dispatch(logout());
  // 2️⃣ Persisted auth remove
  await AsyncStorage.removeItem('TOKEN');
};
