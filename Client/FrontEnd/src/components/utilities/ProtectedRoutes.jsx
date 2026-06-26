import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

function ProtectedRoutes() {
  const { isAuthenticated, screenLoading } = useSelector((store) => store.user);

  const navigate = useNavigate();

  if (screenLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-3">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="text-lg font-medium">Please Wait...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
