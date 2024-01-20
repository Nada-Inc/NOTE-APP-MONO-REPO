// slices/themeSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  value: string;
  userData: any;
  isAvatarUpdate: boolean;
}

const initialState: ThemeState = {
  value: "light",
  userData: {},
  isAvatarUpdate: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setUserAvatar: (state, action: PayloadAction<any>) => {
      state.isAvatarUpdate = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setUserData, setUserAvatar } = themeSlice.actions;
export default themeSlice.reducer;
