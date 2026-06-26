import { differenceInDays, formatDistanceToNow } from "date-fns";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

function Message({ messageDetail }) {
  const messageRef = useRef(null);

  const { userProfile } = useSelector((state) => state.user);

  const isMyMessage = userProfile?._id === messageDetail?.senderId;

  //   const updatedDate=(createdAt)=>{
  // const now = new Date()
  // const created = new Date(createdAt)
  // const diff = now-created

  // const diffMinutes = Math.floor(diff/(1000*60))

  //   }

  const updatedDate = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const difference = differenceInDays(now, created);

    if (difference === 1) {
      return "Yesterday";
    }

    return formatDistanceToNow(created, {
      addSuffix: true,
    });
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${isMyMessage ? `chat-end` : `chat-start`}`}
      >
        <div className="chat-header">
          <time className="text-xs opacity-50">
            {updatedDate(messageDetail?.createdAt)}
          </time>
        </div>
        <div
          className={`chat-bubble ${
            isMyMessage ? "chat-bubble-success" : "chat-bubble-neutral"
          }`}
        >
          {messageDetail?.message}
        </div>
      </div>
    </>
  );
}

export default Message;
