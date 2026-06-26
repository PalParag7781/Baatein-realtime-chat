import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../store/slice/user/user.thunk";
import { Link, useNavigate } from "react-router";
import { AiOutlineCaretDown } from "react-icons/ai";

function UserSidebar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { allUsers, userProfile } = useSelector((state) => state.user);

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await dispatch(logoutUserThunk());

    if (response?.payload?.success) {
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="max-w-[20em] w-full flex flex-col border-r border-r-white/20 h-screen">
      <h1 className="bg-black mx-3 rounded-lg mt-3 px-2 py-1 text-xl font-semibold text-white">
        Baatein
      </h1>
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          {" "}
          <input
            type="text"
            className="grow"
            value={query}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <IoSearch />
        </label>
      </div>
      <div className="h-full  overflow-y-auto px-3 ">
        {(allUsers || [])
          .filter((user) =>
            user?.fullName.toLowerCase().includes(query.toLowerCase()),
          )
          ?.map((userDetail, index) => (
            <User key={userDetail?._id} userDetail={userDetail} />
          ))}
      </div>
      <div className="flex items-center justify-between p-3 ">
        <div className="avatar flex items-center gap-8">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
            <img src={userProfile?.avatar} />
          </div>
          <h2>{userProfile?.fullName}</h2>
        </div>
        <div className="dropdown dropdown-top">
          <div tabIndex={0} role="button">
            <AiOutlineCaretDown
              size={25}
              className={"text-[rgb(0,250,250)] cursor-pointer"}
            />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-lg"
          >
            <li>
              <button className="cursor-pointer">
                <Link to={"/Profile"}>View Profile</Link>
              </button>
            </li>

            <li>
              <button className="cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
