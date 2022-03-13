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
    isLoading: false,
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
    createTravelRequest: (state) => {
      state.isLoading = true;
      state.user = {
        ...state.user,
      };
    },
    createTravelSuccess: (state, action) => {
      const { newTravel } = action.payload;

      state.isLoading = false;
      state.user = {
        ...state.user,
        travels: [...state.user.travels, newTravel],
      };
    },
    createTravelFailure: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    createTravelDetailRequest: (state) => {
      state.isLoading = true;
      state.user = {
        ...state.user,
      };
    },
    createTravelDetailSuccess: (state, action) => {
      const { updatedTravel } = action.payload;
      const { travels } = state.user;

      state.isLoading = false;

      for (let i = 0; i < travels.length; i++) {
        if (travels[i]._id === updatedTravel._id) {
          travels.splice(i, 1, updatedTravel);
        }
      }
    },
    createTravelDetailFailure: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    createTravelDiaryRequest: (state) => {
      state.isLoading = true;
      state.user = {
        ...state.user,
      };
    },
    createTravelDiarySuccess: (state, action) => {
      const { updatedTravel } = action.payload;
      const { travels } = state.user;

      state.isLoading = false;

      for (let i = 0; i < travels.length; i++) {
        if (travels[i]._id === updatedTravel._id) {
          travels.splice(i, 1, updatedTravel);
        }
      }
    },
    createTravelDiaryFailure: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    deleteTravelRequest: (state) => {
      state.user = {
        ...state.user,
      };
    },
    deleteTravelSuccess: (state, action) => {
      const { deletedTravel } = action.payload;
      const { travels } = state.user;

      for (let i = 0; i < travels.length; i++) {
        if (travels[i]._id === deletedTravel._id) {
          travels.splice(i, 1);
        }
      }
    },
    deleteTravelFailure: (state, action) => {
      state.err = action.payload;
    },
    logout: (state) => {
      state.user = {
        ...state.user,
        _id: "",
        email: "",
        username: "",
        travels: [],
      };
      state.isLoading = false;
    },
  },
});

export const {
  fetchUserData,
  createTravelRequest,
  createTravelSuccess,
  createTravelFailure,
  createTravelDetailRequest,
  createTravelDetailSuccess,
  createTravelDetailFailure,
  createTravelDiaryRequest,
  createTravelDiarySuccess,
  createTravelDiaryFailure,
  deleteTravelRequest,
  deleteTravelSuccess,
  deleteTravelFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
