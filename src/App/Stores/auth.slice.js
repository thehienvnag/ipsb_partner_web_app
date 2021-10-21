import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountById } from "App/Services/account.service";
import {
  changePassword,
  checkLogin,
  logUserOut,
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

//#region Logout thunk
const logout = createAsyncThunk(
  "auth/logout",
  async (params = {}, thunkAPI) => {
    const statusCode = await logUserOut();
    if (statusCode !== 204) {
      thunkAPI.rejectWithValue();
    }
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

//#region Retrive user auth info
export const retrieveAuthInfo = createAsyncThunk(
  "auth/retrieveAuthInfo",
  async (id, thunkAPI) => {
    if (!id) return thunkAPI.rejectWithValue();
    const {
      auth: { data },
    } = thunkAPI.getState();
    if (data) {
      return;
    }
    const authInfo = await getAccountById(id);

    if (authInfo) {
      return authInfo;
    }
    return thunkAPI.rejectWithValue();
  }
);
//#endregion

const Slice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
    isLogginOut: false,
  },
  reducers: {
    setAuthInfo: (state, { payload }) => {
      state.data = getAndSetAuthInfo(payload);
    },
  },
  extraReducers: {
    //#region
    [retrieveAuthInfo.pending]: (state, action) => {
      state.isLogginOut = false;
      state.isLoading = true;
    },
    [retrieveAuthInfo.rejected]: (state, action) => {
      state.isLogginOut = true;
      state.isLoading = false;
    },
    [retrieveAuthInfo.fulfilled]: (state, { payload }) => {
      if (payload) {
        const { refreshToken, accessToken, ...authInfo } = payload;
        state.data = authInfo;
      }
      state.isLoading = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.data = null;
      state.isLogginOut = true;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accountId");
    },
    [checkWebLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [checkWebLogin.fulfilled]: (state, { payload }) => {
      state.data = state.data = getAndSetAuthInfo(payload);
      state.isLoading = false;
      state.isLogginOut = false;
    },
    [checkWebLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [refreshUserInfo.fulfilled]: (state, { payload }) => {
      state.data = getAndSetAuthInfo(payload);
    },
    //#endregion
  },
});

const getAndSetAuthInfo = (payload) => {
  const { refreshToken, accessToken, ...authInfo } = payload;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("accountId", authInfo.id);
  return authInfo;
};

//#region
export const selectAuthPresentStatus = (state) =>
  state.auth.data ? true : false;
export const selectAccount = (state) => state.auth.data;
export const selectStoreId = (state) => state.auth.data?.store?.id;
export const selectBuildingId = (state) => state.auth.data?.buildingManager?.id;
export const selectRole = (state) => state.auth.data?.role;
export const selectLoading = (state) => state.auth.isLoading;
export const selectIsLogginOut = (state) => state.auth.isLogginOut;
//#endregion

/// Export reducer
const { setAuthInfo } = Slice.actions;
export { checkWebLogin, checkChangePassword, logout, setAuthInfo };
export default Slice.reducer;
