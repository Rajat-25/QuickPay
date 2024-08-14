import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialUserStateType = {
  token: '',
  isUserLoggedIn: false,
  currentUser: null,
  receiverUser: null,
};

const userSlice = createSlice({
  name: 'user_slice',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.isUserLoggedIn = true;
      state.currentUser = user;
      localStorage.setItem('token', token);
    },
    addReceiverUser: (state, action) => {
      state.receiverUser = action.payload;
    },
    logOut: (state) => {
      state.token = "";
      state.isUserLoggedIn = false;
      state.currentUser = null;
      state.receiverUser = null;
      localStorage.removeItem('token');
    },
  },

});

export const { logOut, logIn, addReceiverUser } = userSlice.actions;
export default userSlice;
