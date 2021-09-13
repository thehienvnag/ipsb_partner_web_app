import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePassword,
  checkLogin,
  refreshToken,
} from "../Services/auth.service";
//#region Async thunks check login
const checkWebLogin = createAsyncThunk(
  "auth/checkWebLogin",
  async (params = {}, thunkAPI) => {
    const data = await checkLogin(params);
    if (!data) {
      return thunkAPI.rejectWithValue();
    }
    return data;
  }
);
//#endregion

//#region Async thunks change password
const checkChangePassword = createAsyncThunk(
  "auth/checkChangePassword",
  async (params = {}, thunkAPI) => {
    const data = await changePassword(params);
    if (data !== 204) {
      return thunkAPI.rejectWithValue("Change password unsuccessfully");
    }
    return data;
  }
);
//#endregion
//#region Async thunks refresh user info
export const refreshUserInfo = createAsyncThunk(
  "auth/refreshUserInfo",
  async (params = {}, thunkAPI) => {
    return await refreshToken();
  }
);
//#endregion

const Slice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    setAuthInfo: (state, { payload }) => {
      const { id, name, email, phone, imageUrl, role } = payload;
      state.data = { id, name, email, phone, imageUrl, role };
    },
    logout: (state, action) => {
      state.data = null;
      sessionStorage.removeItem("accessToken");
    },
  },
  extraReducers: {
    //#region Load floor plan state
    [checkWebLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [checkWebLogin.fulfilled]: (state, { payload }) => {
      const { id, name, email, phone, imageUrl, role } = payload;
      state.data = { id, name, email, phone, imageUrl, role };
      state.isLoading = false;
    },
    [checkWebLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [refreshUserInfo.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [refreshUserInfo.fulfilled]: (state, { payload }) => {
      const { id, name, email, phone, imageUrl, role } = payload;
      state.data = { id, name, email, phone, imageUrl, role };
      state.isLoading = false;
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [locatorTags, totalLocatorTags, pageSize, isLoading]
export const selectAccount = (state) => state.auth.data;
export const selectRole = (state) => state.auth.data?.role;
export const selectLoading = (state) => state.auth.isLoading;
//#endregion

/// Export reducer
const { logout, setAuthInfo } = Slice.actions;
export { checkWebLogin, checkChangePassword, logout, setAuthInfo };
export default Slice.reducer;
