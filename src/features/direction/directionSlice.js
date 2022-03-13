import { createSlice } from "@reduxjs/toolkit";

const directionSlice = createSlice({
  name: "direction",
  initialState: {
    isLoading: false,
    directionData: {},
    err: null,
  },
  reducers: {
    fetchDirectionDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchDirectionDataSuccess: (state, action) => {
      const { directionData } = action.payload;

      state.isLoading = false;
      state.directionData = { ...directionData };
    },
    fetchDirectionDataFailure: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    resetDirectionData: (state) => {
      state.directionData = {};
    },
  },
});

export const {
  fetchDirectionDataRequest,
  fetchDirectionDataSuccess,
  fetchDirectionDataFailure,
  resetDirectionData,
} = directionSlice.actions;

export default directionSlice.reducer;
