import productsReducer from "@/features/products/productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "@/features/auth/authThunk";
import userReducer from "@/features/auth/authSlice";
import categoriesReducer from "@/features/ca/categoriesSlice";
import cartReducer from "@/features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    register: registerReducer,
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});
