import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STRAPI_API_URL } from "@/lip/strapi.config";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/products?populate=*`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: "idle",
  error: null,
  products: [],
  appleProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterAppleProducts: (state) => {
      state.appleProducts = state.products.filter(
        (product) => product.brand?.name === "Apple"
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const { filterAppleProducts } = productsSlice.actions;
export default productsSlice.reducer;
