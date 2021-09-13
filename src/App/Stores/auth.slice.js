import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBuildingByManagerId } from "App/Services/building.service";
import {
  changePassword,
  checkLogin,
  refreshToken as refreshTokenService,
} from "../Services/auth.service";
import { initBuildingIdLoggin } from "../Stores/building.slice";

//#region Async thunks check login
export const checkWebLogin = createAsyncThunk(
  "auth/checkWebLogin",
  async (params = {}, thunkAPI) => {
    const data = await checkLogin(params);
    if (!data) {
      return thunkAPI.rejectWithValue("Incorrect email or password");
    }
    if (data.role === "Building Manager") {
      const dataNew = await getBuildingByManagerId({ managerId: data.id });
      if (dataNew.content.length > 0) {
        thunkAPI.dispatch(initBuildingIdLoggin(dataNew));
      } else {
        return thunkAPI.rejectWithValue(
          "You have not been authorized to manage any buildings in the system"
        );
      }
    } else if (data.role === "Store Owner") {
      return thunkAPI.rejectWithValue(
        "Your account is not authorized to log in on this site"
      );
    }

    return data;
  }
);
//#endregion

//#region Async thunks change password
export const checkChangePassword = createAsyncThunk(
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

const Slice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
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
    [checkWebLogin.fulfilled]: (
      state,
      { payload: { id, name, email, phone, imageUrl, accessToken } }
    ) => {
      state.data = { id, name, email, phone, imageUrl };
      sessionStorage.setItem("accessToken", accessToken);
      state.isLoading = false;
    },
    [checkWebLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },

    //#endregion
  },
});

//Floor plan selector to observe data
//#region [locatorTags, totalLocatorTags, pageSize, isLoading]
export const selectAccount = (state) => state.auth.data;
export const selectRole = (state) => state.auth.data?.role;
//#endregion

const { logout } = Slice.actions;
export { logout };
/// Export reducer
export default Slice.reducer;
