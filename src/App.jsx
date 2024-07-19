import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastNotification } from "./components/shared/Alert";
import Login from "./screens/Auth/Login";
import OTPScreen from "./screens/Auth/Otp";
import Sidebar from "./components/shared/Section/Sidebar/Sidebar";
import Layout from "./container/Layout";
import { Screens } from "./config/routes";
import { getStorageData } from "./lib/utils";
import NotFound from "./container/NotFound";
import { Authentication } from "./container/PrivateRoute";
import Register from "./screens/Auth/Register";

function App() {
  // let isLogedIn = getStorageData("isLogedIn");

  return (
    <BrowserRouter>
      <ToastNotification />
      <Routes>
        {["/", "login"].map((path, index) => (
          <Route key={index} path={path} element={<Login />} />
          // <Route
          //   key={index}
          //   path={path}
          //   element={
          //      isLogedIn ? <Navigate to="/dashboard" replace /> :
          //     <Login />
          //   }
          // />
        ))}
        <Route path="/OTPVerification" element={<OTPScreen />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}

        <Route element={<Authentication />}>
          <Route element={<Layout />}>
            {Screens.map((item, i) => (
              <Route key={i} path={item.path} element={<item.element />} />
            ))}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
