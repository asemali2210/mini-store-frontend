import { STRAPI_URL } from "@/lip/strapi.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchMe",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return thunkApi.rejectWithValue("no Token");

      const respone = await axios.get(`${STRAPI_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return respone.data;
    } catch (erorr) {
      return thunkApi.rejectWithValue("Invalid token or session expired");
    }
  }
);
const initialState = {
  user: null,
  status: "idle",
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = " action.payload";
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
