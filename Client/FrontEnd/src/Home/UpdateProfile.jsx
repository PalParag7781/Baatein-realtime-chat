import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileThunk } from "../store/slice/user/user.thunk";

function UpdateProfile({ open, setOpen }) {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);

  const [input, setInput] = useState({
    fullName: userProfile?.fullName || "",
    userName: userProfile?.userName || "",
    gender: userProfile?.gender || "",
    password: "",
  });
  if (!open) return null;

  const eventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const dataSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(updateProfileThunk(input));
    } catch (error) {
      console.log("error is ", error);
    }
    setOpen(false);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box ">
        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="font-bold text-lg   ">Edit Your Profile</h3>
          <p>Edit your information and save changes.</p>
        </div>

        <form onSubmit={dataSubmit}>
          <div className=" grid gap-4 p-2 my-4 ">
            <div className="grid grid-cols-3">
              <label htmlFor="fullName"> Fullname</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your Fullname... "
                className="col-span-2"
                name="fullName"
                onChange={eventHandler}
                value={input.fullName}
              />
            </div>

            <div className="grid grid-cols-3">
              <label htmlFor="userName"> Username</label>
              <input
                id="userName"
                type="text"
                placeholder="Enter your Username... "
                className="col-span-2"
                name="userName"
                onChange={eventHandler}
                value={input.userName}
              />
            </div>
            <div className="grid grid-cols-3">
              <label htmlFor="password"> password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password... "
                className="col-span-2"
                name="password"
                pattern="[a-zA-Z0-9@!#$&*%^_]{8,15}"
                onChange={eventHandler}
                value={input.password}
              />
            </div>
            <div className="grid grid-cols-3">
              <label>Gender</label>
              <div className="col-span-2 flex items-center gap-2">
                <label htmlFor="male"> Male</label>
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="male"
                  className="radio radio-primary"
                  checked={input.gender === "male"}
                  onChange={eventHandler}
                />

                <label htmlFor="female"> Female</label>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="female"
                  className="radio radio-primary"
                  checked={input.gender === "female"}
                  onChange={eventHandler}
                />
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setOpen(false)}
            >
              Close
            </button>

            <button className="btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
