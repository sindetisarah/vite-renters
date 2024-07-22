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
const Lease = Loadable(lazy(() => import("@/screens/Lease/Lease")));

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
    element: Lease,
    path: "/lease",
  },
  {
    element: Dashboard,
    path: "/invoice",
  },
  {
    element: Dashboard,
    path: "/payments",
  },
  {
    element: Dashboard,
    path: "/payments/test",
  },
];
