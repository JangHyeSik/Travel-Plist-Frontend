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
    createTravelDetailRequest: (state) => {
      state.user = {
        ...state.user,
      };
    },
    createTravelDetailSuccess: (state, action) => {
      const { updatedTravel } = action.payload;
      const { travels } = state.user;

      for (let i = 0; i < travels.length; i++) {
        if (travels[i]._id === updatedTravel._id) {
          travels.splice(i, 1, updatedTravel);
        }
      }
    },
    createTravelDetailFailure: (state, action) => {
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
  createTravelDetailRequest,
  createTravelDetailSuccess,
  createTravelDetailFailure,
} = userSlice.actions;

export default userSlice.reducer;
