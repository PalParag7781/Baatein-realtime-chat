import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import { useDispatch, useSelector } from "react-redux";

import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
} from "./store/slice/user/user.thunk.js";
import { Toaster } from "sonner";
import ProtectedRoutes from "./components/utilities/ProtectedRoutes.jsx";
import { io } from "socket.io-client";
import { socketConnect } from "./Socket/Socket.js";
import { setOnlineUsers } from "./store/slice/Socket/socket.slice.js";
import { setNewMessages } from "./store/slice/message/messageSlice.js";
import UpdateProfile from "./Home/UpdateProfile.jsx";
import Profile from "./Home/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Route>,
  ),
);

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, []);

  useEffect(() => {
    if (isAuthenticated) dispatch(getOtherUsersThunk());
  }, [isAuthenticated]);

  useEffect(() => {
    let socket;
    console.log("This is for socket");
    if (isAuthenticated && userProfile?._id) {
      socket = socketConnect(userProfile?._id);

      socket.on("connect", () => {
        console.log(`user with ${socket.id} Id connected successfully!`);
      });

      socket.on("onlineUsers", (users) => {
        console.log("online users are", users);
        dispatch(setOnlineUsers(users));
      });

      socket.on("messages", (newMessage) => {
        console.log("the message is ", newMessage);
        dispatch(setNewMessages(newMessage));
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, userProfile]);

  return (
    <>
      {" "}
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
}

export default App;
