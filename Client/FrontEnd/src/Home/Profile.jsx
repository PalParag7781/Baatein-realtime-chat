import React, { useState } from "react";
import { FaAt, FaMars, FaVenus } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import UpdateProfile from "./UpdateProfile";

function Profile() {
  const { userProfile } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto rounded-2xl shadow shadow-2xl shadow   p-4 my-5 sm:p-8">
        <div className="flex items-center justify-center flex-col gap-4 ">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>

          <button onClick={() => setOpen(true)}>Edit</button>
        </div>
        {/* //details */}
        <div className="flex flex-col gap-5  my-3 mx-auto">
          <div className="flex items-center gap-3">
            <IoPerson />
            <div className="flex flex-col">
              <span className="text-white/30">Name</span>
              <span className="font-bold text-white">
                {userProfile?.fullName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaAt />
            <div className="flex flex-col">
              <span className="text-white/30">userName</span>
              <span className="font-bold text-white">
                {userProfile?.userName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {userProfile?.gender === "male" ? <FaMars /> : <FaVenus />}
            <div className="flex flex-col">
              <span className="text-white/30">Gender</span>
              <span className="font-bold text-white">
                {userProfile?.gender}
              </span>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
