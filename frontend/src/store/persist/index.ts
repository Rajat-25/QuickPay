import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountApi from '../apis/accountApi';
import userApi from '../apis/userApi';
import userSlice from '../slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
});

export const rootReducer = persistReducer(persistConfig, reducer);
