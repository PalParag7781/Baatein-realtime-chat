import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUserThunk } from "../store/slice/user/user.thunk.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const { isAuthenticated, buttonLoading } = useSelector((state) => state.user);

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUserThunk(input));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center mt-5 py-4">
      <div className=" relative border rounded-2xl shadow-3xl shadow-2xl shadow-black/40 backdrop-blur-2xl max-w-[40rem] w-full border-white/10 bg-white/5">
        {/* Glow Effect */}

        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none "></div>

        <h1 className="text-gray-200 text-3xl font-bold flex items-center justify-center py-6 tracking-wide">
          Login Page
        </h1>

        <form>
          <div className="flex flex-col py-4 gap-4 px-6 items-center justify-center">
            <label className="input validator w-full bg-white/10 border border-white/10 backdrop-blur-md">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>

              <input
                type="text"
                name="userName"
                value={input.userName}
                placeholder="username"
                required
                onChange={changeEventHandler}
              />
            </label>

            <label className="input validator w-full bg-white/10 border border-white/10 backdrop-blur-md">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>

                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>

              <input
                type="password"
                name="password"
                value={input.password}
                required
                placeholder="Password"
                pattern="[a-zA-Z0-9@!#$&*%^_]{8,15}"
                onChange={changeEventHandler}
              />
            </label>

            {buttonLoading ? (
              <button
                onClick={handleLogin}
                className="btn btn-primary w-full mt-4 rounded-xl shadow-lg shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
                disabled={buttonLoading}
              >
                <span className="loading loading-spinner loading-md"></span>
                Please Wait
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="btn btn-primary w-full mt-4 rounded-xl shadow-lg shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
              >
                Login
              </button>
            )}

            <span className="flex gap-2">
              Don't have an account?
              <Link className="font-bold underline" to={"/SignUp"}>
                {" "}
                SignUp{" "}
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
