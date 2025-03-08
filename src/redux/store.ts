import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import messagesReducer from './apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.createdAt', 'meta.arg.timestamp'],
        ignoredPaths: ['messages.messages.createdAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
