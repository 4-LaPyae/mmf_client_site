import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_data: null,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setUpdateData: (state, { payload }) => {
      state.update_data = payload;
    },
    clearUpdateData: (state) => {
      state.update_data = null;
    },
  },
});

export const {
  setUpdateData,
  clearUpdateData,
} = helperSlice.actions;

export const HelperSlice = helperSlice.reducer;
