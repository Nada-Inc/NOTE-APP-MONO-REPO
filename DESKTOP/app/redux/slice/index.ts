// slices/themeSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteState {
  state: boolean;
  isEditValue: any;
}

const initialState: NoteState = {
  state: false,
  isEditValue: null,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleState: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
    setIsEditValue: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isEditValue: action.payload,
      };
    },
  },
});

export const { toggleState, setIsEditValue } = stateSlice.actions;
export default stateSlice.reducer;
