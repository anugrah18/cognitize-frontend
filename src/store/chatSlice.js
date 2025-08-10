// src/store/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  userName: '',   // Add userName here
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action) {
      // action.payload should be { text, type, timestamp }
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const { addMessage, clearMessages, setUserName } = chatSlice.actions;
export default chatSlice.reducer;
