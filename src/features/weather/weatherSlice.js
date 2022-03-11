import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    isLoading: false,
    weather: "",
    err: null,
  },
  reducers: {
    fetchWeatherRequest: (state) => {
      state.isLoading = true;
    },
    fetchWeatherSuccess: (state, action) => {
      state.isLoading = false;
      state.weather = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export default weatherSlice.reducer;
