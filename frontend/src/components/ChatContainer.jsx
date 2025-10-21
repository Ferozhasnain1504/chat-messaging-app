import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore.js';
import ChatHeader from './ChatHeader.jsx';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.jsx';
import MessageContainer from './MessageContainer.jsx';
import MessageInput from './MessageInput.jsx';

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
     <MessageContainer/>
     <MessageInput/>
    </>
  )
}

export default ChatContainer