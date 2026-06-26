import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUserThunk } from "../store/slice/user/user.thunk";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, buttonLoading } = useSelector((state) => state.user);

  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }

    const response = await dispatch(registerUserThunk(input));
    if (response.payload.accessToken) {
      localStorage.setItem("accessToken", response.payload.accessToken);
    }
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className=" flex items-center justify-center py-4 mt-5">
        <div className=" relative w-full max-w-[40rem] border border-white/10 rounded-2xl shadow shadow-2xl shadow-black backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none"></div>

          <h1 className="font-bold text-white tracking-wide flex items-center justify-center text-3xl py-4">
            Signup
          </h1>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-4 p-4 items-center justify-center">
              <label className="input input-bordered flex items-center gap-2">
                <FaUser />
                <input
                  type="text"
                  name="fullName"
                  className="grow"
                  placeholder="Full Name"
                  onChange={changeEventHandler}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <FaUser />
                <input
                  type="text"
                  name="userName"
                  className="grow"
                  placeholder="Username"
                  onChange={changeEventHandler}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <IoKeySharp />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern="[a-zA-Z0-9@!#$&*%^_]{8,15}"
                  className="grow"
                  onChange={changeEventHandler}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <IoKeySharp />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  pattern="[a-zA-Z0-9@!#$&*%^_]{8,15}"
                  className="grow"
                  onChange={changeEventHandler}
                />
              </label>

              <div className="input input-bordered flex items-center gap-5">
                <label htmlFor="male" className="flex gap-3 items-center">
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio radio-primary"
                    onChange={changeEventHandler}
                  />
                  male
                </label>

                <label htmlFor="female" className="flex gap-3 items-center">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio radio-primary"
                    onChange={changeEventHandler}
                  />
                  female
                </label>
              </div>
              {buttonLoading ? (
                <button
                  onClick={handleSignup}
                  className="btn btn-primary w-full mt-4 rounded-xl shadow-lg shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
                  disabled={buttonLoading}
                >
                  <span className="loading loading-spinner loading-md"></span>
                  Please Wait
                </button>
              ) : (
                <button
                  onClick={handleSignup}
                  className="btn btn-primary w-full mt-4 rounded-xl shadow-lg shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
                >
                  Signup
                </button>
              )}

              <span className="flex gap-2">
                {" "}
                Already have an account?
                <Link to={"/Login"} className="font-bold underline">
                  login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
