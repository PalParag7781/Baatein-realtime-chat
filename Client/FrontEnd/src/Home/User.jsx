import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slice/user/userSlice";

function User({ userDetail }) {
  const { selectedUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { onlineUsers } = useSelector((state) => state.socket);

  const isOnline = onlineUsers?.includes(userDetail?._id);

  const handleClick = () => {
    dispatch(setSelectedUser(userDetail));
  };

  return (
    <div
      onClick={handleClick}
      className={`flex gap-5 items-center  rounded-lg px-2 py-1 hover:bg-gray-500 cursor-pointer ${userDetail?._id === selectedUser?._id && `bg-white`}  `}
    >
      <div
        className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"} `}
      >
        <div className="w-12 rounded-full">
          <img src={userDetail?.avatar} />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{userDetail?.fullName}</h2>
        <p className="text-xs">{userDetail?.userName}</p>
      </div>
    </div>
  );
}

export default User;
