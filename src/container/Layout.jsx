import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "@/context/ContextProvider";
import Sidebar from "@/components/shared/Section/Sidebar/Sidebar";
import Navbar from "@/components/shared/Section/Navbar";
import Footer from "@/components/shared/Section/Footer";
import { cn } from "@/lib/utils";
import { ThemedSuspense } from "@/components/shared/Loading";
import { AnimatePresence, motion } from "framer-motion";

const Layout = ({ defaultTheme, children, className }) => {
  const { config } = useStateContext();

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          `theme-${defaultTheme || config.theme}`,
          `flex h-full w-full flex-1 flex-col overflow-y-auto overflow-x-hidden`,
          className
        )}
        style={{
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        }}
      >
        <div className="flex fixed h-screen w-full">
          <Sidebar />

          <main
            className={`flex px-8 w-full flex-1 flex-col overflow-y-auto overflow-x-hidden`}
          >
            <Navbar />
            <Suspense fallback={<ThemedSuspense />}>
              <Outlet />
            </Suspense>
            <Footer />
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
