import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import accountApi from './apis/accountApi';
import userApi from './apis/userApi';
import { rootReducer } from './persist';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(accountApi.middleware);
  },
});

setupListeners(store.dispatch);


export default store;

export * from './apis/accountApi';
export * from './apis/userApi';
export * from './slices/userSlice';

