import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../store/slice/message/message.thunk";
import SendMessage from "./SendMessage.jsx";

function MessageContainer() {
  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.message);

  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className="flex items-center justify-center flex-col gap-5 ">
          <h1>Welcome to Baatein! </h1>
          <p className="text-xl">
            Chat with friends and loved ones—anytime, anywhere.❤️
          </p>
        </div>
      ) : (
        <div className=" w-full h-screen flex flex-col ">
          <div className=" w-full p-3 border-b border-b-whit/15 ">
            <User userDetail={selectedUser} />
          </div>
          <div className="h-full overflow-y-auto p-3">
            {messages?.map((messageDetail) => (
              <Message key={messageDetail?._id} messageDetail={messageDetail} />
            ))}
          </div>
          <SendMessage />
        </div>
      )}
    </>
  );
}

export default MessageContainer;
