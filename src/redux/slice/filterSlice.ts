import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./authSlice";
import { Timestamp } from "firebase/firestore";

export interface Chat {
  chatId: string;
  isSeen: boolean;
  lastMessage: string;
  receiverId: string;
  user: UserType;
  updatedAt: Timestamp;
}

interface FilterState {
  chats: Chat[];
  originalChats: Chat[];
  loading: boolean;
}

const initialState: FilterState = {
  chats: [],
  originalChats: [],
  loading: false
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setOriginalChats: (state, action: PayloadAction<Chat[]>) => {
      state.originalChats = action.payload;
      state.chats = action.payload;
    },
    setFilteredChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setOriginalChats, setFilteredChats, setLoading } =
  filterSlice.actions;

export const filterChats =
  (query: string) => (dispatch: any, getState: any) => {
    const { originalChats } = getState().filter;

    if (!query.trim()) {
      dispatch(setFilteredChats(originalChats));
      return;
    }

    dispatch(setLoading(true));

    setTimeout(() => {
      const filtered = originalChats.filter((chat: Chat) =>
        chat.user?.name?.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(setFilteredChats(filtered));
    }, 500);
  };
