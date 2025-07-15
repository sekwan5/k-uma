import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isSpinner: boolean;
  needLogin: boolean;
  logouted: boolean;
  sidebar: boolean;
  spinnerText: string;
  collapsed: boolean;
}

const initialState: AppState = {
  isSpinner: false,
  needLogin: false,
  logouted: false,
  sidebar: false,
  spinnerText: "",
  collapsed: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.isSpinner = true;
    },
    showSpinnerWithText: (state, action: PayloadAction<string>) => {
      state.isSpinner = true;
      state.spinnerText = action.payload;
    },
    hideSpinner: (state) => {
      state.isSpinner = false;
      state.spinnerText = "";
    },
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const {
  showSpinner,
  showSpinnerWithText,
  hideSpinner,
  toggleSidebar,
  setSidebar,
  setCollapsed,
} = appSlice.actions;

export default appSlice.reducer;
