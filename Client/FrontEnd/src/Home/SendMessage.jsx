import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../store/slice/message/message.thunk";

function SendMessage() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(
      sendMessageThunk({
        receiverId: selectedUser?._id,
        message,
      }),
    );
    setMessage("");
  };
  return (
    <div>
      <div className="w-full p-3 flex gap-2">
        <input
          type="text"
          placeholder="Type here..."
          className="input w-full"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          onClick={handleClick}
          className="btn btn-square btn-outline btn-primary"
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
}

export default SendMessage;
