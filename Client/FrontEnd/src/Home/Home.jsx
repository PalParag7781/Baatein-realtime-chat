import React from "react";
import MessageContainer from "./MessageContainer";
import UserSidebar from "./UserSidebar";
import { useSelector } from "react-redux";

function Home() {
  return (
    <div className="flex gap-15">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;
