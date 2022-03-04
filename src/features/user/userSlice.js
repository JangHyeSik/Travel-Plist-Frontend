import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: "",
      email: "",
      username: "",
      travels: [],
    },
    weather: "",
    err: null,
  },
  reducers: {
    fetchUserData: (state, action) => {
      const { _id, email, username, travels } = action.payload.user;

      state.user = {
        ...state.user,
        _id,
        email,
        username,
        travels,
      };
    },
    fetchWeatherRequest: (state) => {
      state.weather = "";
    },
    fetchWeatherSuccess: (state, action) => {
      state.weather = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.err = action.payload;
    },
    createTravelRequest: (state) => {
      state.user = {
        ...state.user,
      };
    },
    createTravelSuccess: (state, action) => {
      const { newTravel } = action.payload;

      state.user = {
        ...state.user,
        travels: [...state.user.travels, newTravel],
      };
    },
    createTravelFailure: (state, action) => {
      state.err = action.payload;
    },
  },
});

export const {
  fetchUserData,
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  createTravelRequest,
  createTravelSuccess,
  createTravelFailure,
} = userSlice.actions;

export default userSlice.reducer;
