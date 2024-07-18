import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStorageData } from "@/lib/utils";

export const Authentication = () => {
  const location = useLocation();

  let successOTP = getStorageData("isLogedIn");

  return successOTP ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};


