import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useStateContext } from "@/context/ContextProvider";
import { MenusList } from "@/config/constants";
import { motion } from "framer-motion";
import { Menu } from "./Menu";
import MainLogo from "@/assets/images/user.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const { activeMenu, screenSize, setActiveMenu, isTabletMid } =
    useStateContext();

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "18rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "18rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem", //6rem
          transition: {
            damping: 40,
          },
        },
      };

  const framerSidebarBackground = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
    transition: { duration: 0.3 },
  };

  return (
    <>
      <motion.div
        {...framerSidebarBackground}
        onClick={() => setActiveMenu(false)}
        className={`fixed inset-0 bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm md:hidden ${
          activeMenu ? "block" : "hidden"
        } `}
      ></motion.div>

      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={activeMenu ? "open" : "closed"}
        className={`bg-white dark:bg-gray-900 h-screen pt-3 px-2 duration-500 dark:text-white py-4 shadow-2xl themeSideBackground fixed bottom-0 left-0 top-0 z-50 w-full max-w-[16rem] md:relative`}
      >
        <div className={`flex h-full w-full flex-col justify-between `}>
          <div className="mx-0 flex flex-col items-center">
            <span className="mx-2 flex items-center justify-center">
              {/* {activeMenu || isTabletMid ? (
                <img
                  className={`shadow-xs rounded block ${
                    activeMenu || isTabletMid ? "h-[4.5rem]" : ""
                  } border-none object-cover align-middle duration-300 ease-in hover:scale-105 dark:block`}
                  src={activeMenu || isTabletMid ? MainLogo : MainLogo}
                  alt="Office"
                />
              ) : (
                <div
                  className={`p-2 mt-4 rounded-md border-green-500 border-2 text-green-500 text-md font-semibold`}
                >
                  S.O
                </div>
              )} */}
              {/* <motion.div
                variants={Nav_animation}
                animate={activeMenu || isTabletMid ? "open" : "closed"}
                className="flex items-center justify-center"
              > */}
              {activeMenu || isTabletMid ? (
                <Avatar className="rounded-none h-[150px] w-[150px]">
                  <AvatarImage
                    className={`shadow-xs block ${
                      activeMenu || isTabletMid ? "h-full" : ""
                    } border-none object-cover align-middle duration-300 ease-in hover:scale-105 dark:block`}
                    src="/avatars/01.png"
                    alt="Avatar"
                  />
                  <AvatarFallback
                    className={`text-green-500 text-[70px] items-center font-semibold px-4`}
                  >
                    R.P
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="mt-4 rounded-full flex h-12 w-12 items-center justify-center">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback
                    className={`text-green-500 text-md font-semibold px-4`}
                  >
                    R.P
                  </AvatarFallback>
                </Avatar>
              )}
              {/* </motion.div> */}
            </span>

            {activeMenu || isTabletMid ? (
              <div className={`flex flex-col items-center justify-center mt-6`}>
                <h4 className="themeText mx-2 items-center text-base font-medium duration-300 ease-in hover:scale-105">
                  John Doe
                </h4>
                <h6 className="mt-1 text-sm font-medium duration-300 ease-in hover:scale-105">
                  Admin
                </h6>
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center mt-[5.9rem]`}
              ></div>
            )}
          </div>

          <ul className="themeText -mt-4 flex h-full w-full flex-col overflow-auto py-0 pt-10 tracking-wide sm:overflow-auto sm:hover:overflow-auto md:overflow-hidden md:hover:overflow-auto">
            {MenusList.map((route, i) => (
              <li key={i} className="py-1">
                <Menu path={route.path} Icon={route.icon} menu={route?.title} />
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-2 mr-2"></div>
      </motion.div>
    </>
  );
};

export default Sidebar;
