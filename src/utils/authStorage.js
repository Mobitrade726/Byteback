import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

export const clearAuthStorage = async () => {
  store.dispatch(logout());
};
