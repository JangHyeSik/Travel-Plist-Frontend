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
  },
});

export const { fetchUserData } = userSlice.actions;

export default userSlice.reducer;
