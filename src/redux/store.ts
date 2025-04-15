import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { chatSlice } from "./slice/chatSlice";
import { filterSlice } from "./slice/filterSlice";

// Configuring the Redux store to ignore serializability checks for specific actions and paths
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chats: chatSlice.reducer,
    filter: filterSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/setUser",
          "auth/setUsers",
          "filter/setFilteredChats",
          "filter.chats",
          "filter/setOriginalChats",
          "chat/changeChats"
        ],
        ignoredPaths: [
          "auth.user.updatedAt", // Ignore the updatedAt fields in user objects
          "auth.users.updatedAt",
          "filter.chats.user.updatedAt",
          "filter.originalChats.0.user.updatedAt",
          "chats.chats.user.updatedAt",
          "meta.arg", // Ignore meta arguments for actions
          "payload.timestamp", // Ignore timestamp fields in payloads
          "payload.user.updatedAt" // Ignore user.updatedAt in payload
        ]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define AppThunk type for asynchronous actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Custom hooks to use dispatch and selector with TypeScript typings
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
