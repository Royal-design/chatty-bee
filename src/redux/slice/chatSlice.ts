import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./authSlice";

interface Chat {
  chatId: string;
  user: UserType | null;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  shouldFocus: boolean;
  updatedAt?: number;
}

interface ChatState {
  chats: Chat;
  loading: boolean;
  activeChatId: string;
}

const storedChats = localStorage.getItem("chats");
const initialChats: Chat = storedChats
  ? JSON.parse(storedChats)
  : {
      chatId: "",
      user: null,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
      shouldFocus: false
    };

const initialState: ChatState = {
  chats: initialChats,
  loading: false,
  activeChatId: localStorage.getItem("activeChatId") || ""
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChats: (
      state,
      action: PayloadAction<{
        currentUser: UserType;
        user: UserType;
        chatId: string;
      }>
    ) => {
      const { currentUser, user, chatId } = action.payload;

      if (user.blocked.includes(currentUser.id)) {
        state.chats = {
          chatId,
          user: null,
          isCurrentUserBlocked: true,
          isReceiverBlocked: false,
          shouldFocus: false
        };
      } else if (currentUser.blocked.includes(user.id)) {
        state.chats = {
          chatId,
          user: null,
          isCurrentUserBlocked: false,
          isReceiverBlocked: true,
          shouldFocus: false
        };
      } else {
        state.chats = {
          chatId,
          user,
          isCurrentUserBlocked: false,
          isReceiverBlocked: false,
          shouldFocus: true
        };
      }

      state.activeChatId = chatId;

      localStorage.setItem("chats", JSON.stringify(state.chats));
      localStorage.setItem("activeChatId", chatId);
    },

    changeBlock: (state) => {
      if (state.chats) {
        state.chats.isReceiverBlocked = !state.chats.isReceiverBlocked;
        localStorage.setItem("chats", JSON.stringify(state.chats));
      }
    },

    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
      localStorage.setItem("activeChatId", action.payload);
    },

    resetFocus: (state) => {
      state.chats.shouldFocus = false;
      localStorage.setItem("chats", JSON.stringify(state.chats));
    }
  }
});

export const { changeChats, changeBlock, resetFocus, setActiveChatId } =
  chatSlice.actions;
export default chatSlice.reducer;
