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
    console.log(params);
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
    const data = await refreshToken();
    if (!data) {
      return thunkAPI.rejectWithValue();
    }
    return data;
  }
);
//#endregion

const Slice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
    isLogginOut: true,
  },
  reducers: {
    setAuthInfo: (state, { payload }) => {
      const { id, name, email, phone, imageUrl, role, accessToken, status } =
        payload;
      state.data = { id, name, email, phone, imageUrl, role, status };
      sessionStorage.setItem("accessToken", accessToken);
    },
    logout: (state, action) => {
      state.data = null;
      state.isLogginOut = true;
      sessionStorage.removeItem("accessToken");
      document.cookie =
        "X-Refresh-Token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
  },
  extraReducers: {
    //#region Load floor plan state
    [checkWebLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [checkWebLogin.fulfilled]: (state, { payload }) => {
      const { id, name, email, phone, imageUrl, role, accessToken, status } =
        payload;
      state.data = { id, name, email, phone, imageUrl, role, status };
      sessionStorage.setItem("accessToken", accessToken);
      state.isLoading = false;
      state.isLogginOut = false;
    },
    [checkWebLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [refreshUserInfo.pending]: (state, { payload }) => {},
    [refreshUserInfo.rejected]: (state, { payload }) => {},
    [refreshUserInfo.fulfilled]: (state, { payload }) => {
      const { id, name, email, phone, imageUrl, role, accessToken, status } =
        payload;
      state.data = { id, name, email, phone, imageUrl, role, status };
      sessionStorage.setItem("accessToken", accessToken);
    },
    //#endregion
  },
});

//Floor plan selector to observe data
//#region [locatorTags, totalLocatorTags, pageSize, isLoading]
export const selectAccount = (state) => state.auth.data;
export const selectRole = (state) => state.auth.data?.role;
export const selectLoading = (state) => state.auth.isLoading;
export const selectIsLogginOut = (state) => state.auth.isLogginOut;
//#endregion

/// Export reducer
const { logout, setAuthInfo } = Slice.actions;
export { checkWebLogin, checkChangePassword, logout, setAuthInfo };
export default Slice.reducer;
