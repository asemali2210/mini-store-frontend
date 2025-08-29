import { STRAPI_URL } from "@/lip/strapi.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  auth: null,
  status: "idle",
  error: null,
};
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${STRAPI_URL}/api/auth/local/register`,
        { username, email, password }
      );
      // ✅ data = { jwt, user }
      return data;
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        /* localStorage.setItem("jwt", action.payload.jwt); */
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
