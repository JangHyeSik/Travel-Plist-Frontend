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
    getWeatherRequest: (state) => {
      state.weather = "";
    },
    getWeatherSuccess: (state, action) => {
      state.weather = action.payload;
    },
    getWeatherFailure: (state, action) => {
      state.err = action.payload;
    },
  },
});

export const {
  fetchUserData,
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
} = userSlice.actions;

export default userSlice.reducer;
