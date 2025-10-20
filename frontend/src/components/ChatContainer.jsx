import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore.js';
import ChatHeader from './ChatHeader.jsx';
import { useEffect } from 'react';

const ChatContainer = () => {

  const {selectedUser, isMessagesLoading, getMessageByUserId, messages } = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessageByUserId(selectedUser._id);
    }
  },[selectedUser, getMessageByUserId]);

  return (
    <>
     <ChatHeader />
    </>
  )
}

export default ChatContainer