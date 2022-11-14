import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state: ModalState, action: PayloadAction) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export default modalSlice.reducer;
export const { toggleModal } = modalSlice.actions;
export const selectModalState = (state: RootState) => state.modal;
