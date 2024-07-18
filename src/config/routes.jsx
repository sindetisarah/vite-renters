import React, { Suspense, lazy } from "react";
import { ThemedSuspense } from "@/components/shared/Loading";
// import { DataTableDemo } from "screens/DataTableDemo";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<ThemedSuspense />}>
      <Component {...props} />
    </Suspense>
  );
};

const Dashboard = Loadable(lazy(() => import("@/screens/Dashboard/Dashboard")));

export const Screens = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    element: Dashboard,
    path: "/property",
  },
  {
    element: Dashboard,
    path: "/tenant",
  },
  {
    element: Dashboard,
    path: "/landlord",
  },
  {
    element: Dashboard,
    path: "/lease",
  },
  {
    element: Dashboard,
    path: "/invoice",
  },
  {
    element: Dashboard,
    path: "/payments",
  },{
    element: Dashboard,
    path: "/payments/test",
  },
];
