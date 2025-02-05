import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticated: false,
};
export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    isAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { setUser, isAuthenticated } = userSlice.actions;
