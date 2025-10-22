import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect, useRef } from "react";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

const MessageContainer = () => {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    subscribeToMessages();

    // cleanup
    return () => unsubscribeFromMessages();
  },[subscribeToMessages, unsubscribeFromMessages])

  return (
    <div className="flex-1 px-6 overflow-y-auto py-8">
      {messages.length > 0 && !isMessagesLoading ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${
                msg.senderId === authUser._id ? "chat-end " : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble relative ${
                  msg.senderId === authUser._id
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-200"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Shared"
                    className="rounded-lg h-48 object-cover"
                  />
                )}
                {msg.text && <p className="mt-2">{msg.text}</p>}
                <p
                  className={`text-xs mt-1 opacity-75 flex items-center gap-1 ${
                    msg.senderId === authUser._id
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          <div ref={messageEndRef} />
        </div>
      ) : isMessagesLoading ? (
        <MessagesLoadingSkeleton />
      ) : (
        <NoChatHistoryPlaceholder name={selectedUser.fullName} />
      )}
    </div>
  );
};

export default MessageContainer;
