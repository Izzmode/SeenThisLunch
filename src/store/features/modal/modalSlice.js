import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import ratingsService from "./ratingsService";

const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
  forgotPasswordModalOpen: false,
  confirmationModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    openLoginModal(state) {
      state.loginModalOpen = true;
    },
    openRegisterModal(state) {
      state.registerModalOpen = true;
    },
    openForgotPasswordModal(state) {
      state.forgotPasswordModalOpen = true;
    },
    openConfirmationModal(state) {
      state.confirmationModalOpen = true;
    },
    closeModal(state) {
      state.loginModalOpen = false;
      state.registerModalOpen = false;
      state.forgotPasswordModalOpen = false;
      state.confirmationModalOpen = false;
    },
  },

})

export const { openLoginModal, openRegisterModal, openForgotPasswordModal, closeModal, openConfirmationModal } = modalSlice.actions;

export default modalSlice.reducer;