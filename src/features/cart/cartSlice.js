import { STRAPI_URL } from "@/lip/strapi.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Fetch the cart items for the logged-in user
export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return thunkApi.rejectWithValue("No token found");

    const response = await axios.get(
      `${STRAPI_URL}/api/cart?populate[product][populate]=images`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

// ✅ Update quantity of a specific cart item
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ documentId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const response = await axios.put(
        `${STRAPI_URL}/api/cart/${documentId}`,
        {
          data: { quantity: Number(quantity) },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error?.message ||
        error.message ||
        "Update failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Delete an item from the cart
export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItem",
  async (documentId, thunkAPI) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      await axios.delete(`${STRAPI_URL}/api/cart/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return documentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || error.message
      );
    }
  }
);

// ✅ Add a new item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity = 1 }, thunkAPI) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post(
        `${STRAPI_URL}/api/cart?populate=*`,
        {
          data: {
            product: product,
            quantity: quantity,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error?.message || err.message
      );
    }
  }
);

// ✅ Initial cart state
const initialState = {
  loading: "idle",
  error: null,
  items: [],
};

// ✅ Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      // 🔄 Handle update quantity
      .addCase(updateQuantity.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const { quantity, documentId } = action.meta.arg;

        const itemIndex = state.items.findIndex(
          (item) => item.documentId === documentId
        );
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = quantity;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      // 🛒 Handle fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload.data;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      // ➕ Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const newItem = action.payload.data;
        const existingItem = state.items.find(
          (item) => item.product.documentId === newItem.product.documentId
        );
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      // ❌ Delete from cart
      .addCase(deleteItemFromCart.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = state.items.filter(
          (item) => item.documentId !== action.payload
        );
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
